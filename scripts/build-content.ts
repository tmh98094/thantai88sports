import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { frontmatterSchema, postSchema, type Post } from "../lib/content-schema";

const root = process.cwd();
const contentDirectory = path.join(root, "content", "posts");
const outputFile = path.join(root, "generated", "posts.json");
const imagePromptCatalogFile = path.join(root, "docs", "AI_IMAGE_PROMPTS.md");

function assertSafeMarkdown(markdown: string, filename: string) {
  if (/<script\b|\son\w+\s*=|javascript:/i.test(markdown)) {
    throw new Error(`Unsafe HTML or URL found in ${filename}`);
  }
}

async function compilePost(filename: string): Promise<Post> {
  const source = fs.readFileSync(path.join(contentDirectory, filename), "utf8");
  const { data, content } = matter(source);
  assertSafeMarkdown(content, filename);
  const metadata = frontmatterSchema.parse(data);
  const slug = filename.replace(/\.md$/, "");
  const expectedImage = `/images/posts/${slug}.webp`;
  if (metadata.image !== expectedImage) {
    throw new Error(`Article image in ${filename} must be ${expectedImage}`);
  }
  if (metadata.contentType === "news" && metadata.sourceRefs.length === 0) {
    throw new Error(`News article ${filename} must include at least one sourceRefs item`);
  }
  const wordCount = content.trim().split(/\s+/u).length;
  const html = await marked.parse(content, { gfm: true, breaks: false });

  return postSchema.parse({
    ...metadata,
    slug,
    html,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 220)),
  });
}

function buildImagePromptEntry(post: Post, index: number) {
  return `### ${index}. ${post.title}

- **Output path:** \`public${post.image}\`
- **Filename:** \`${post.slug}.webp\`
- **Aspect ratio:** 16:9
- **Dimensions:** 1600 x 900 px
- **Generation prompt:** Create a wide photorealistic Vietnamese sports editorial image for the article "${post.title}". Feature an unmistakably adult Vietnamese or Southeast Asian sports journalist or analyst age 25-35, non-nude, wearing a tailored emerald sports jacket over a neutral athletic top. Show the article topic in a credible stadium, broadcast, or analysis-desk setting without inventing a score, badge, sponsor, quote, or result. Use deep forest, emerald, and restrained gold accents, make the editorial moment immediately clear at thumbnail size, and leave the top-left calm for the brand logo.
- **Attached logo instruction:** Use the attached Thantai88 Sports logo reference and place its exact original appearance in the top-left at approximately 24% image width with 3% outer margin.
- **Vietnamese alt text:** \`${post.imageAlt}\``;
}

function synchronizeImagePromptCatalog(posts: Post[]) {
  if (!fs.existsSync(imagePromptCatalogFile)) {
    throw new Error("Missing docs/AI_IMAGE_PROMPTS.md image prompt catalog");
  }

  const currentCatalog = fs.readFileSync(imagePromptCatalogFile, "utf8");
  const existingEntries = currentCatalog.split(/^### \d+\. /m).slice(1);
  const existingPaths = new Set(
    existingEntries
      .map((entry) => entry.match(/\*\*Output path:\*\* `public(\/images\/[^`]+)`/)?.[1])
      .filter((imagePath): imagePath is string => Boolean(imagePath)),
  );
  const missingPosts = posts.filter((post) => !existingPaths.has(post.image));

  if (missingPosts.length === 0) {
    return;
  }

  const additions = missingPosts
    .map((post, index) => buildImagePromptEntry(post, existingEntries.length + index + 1))
    .join("\n\n");
  fs.writeFileSync(imagePromptCatalogFile, `${currentCatalog.trimEnd()}\n\n${additions}\n`, "utf8");
  console.log(`Added ${missingPosts.length} image prompt catalog entries.`);
}

async function main() {
  const filenames = fs.readdirSync(contentDirectory).filter((filename) => filename.endsWith(".md"));
  const posts = await Promise.all(filenames.map(compilePost));
  const slugs = posts.map((post) => post.slug);

  if (new Set(slugs).size !== slugs.length) {
    throw new Error("Article slugs must be unique");
  }

  for (const post of posts) {
    const missingRelated = post.related.filter((slug) => !slugs.includes(slug));
    if (missingRelated.length) {
      throw new Error(`Article ${post.slug} references missing related posts: ${missingRelated.join(", ")}`);
    }
  }

  posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
  synchronizeImagePromptCatalog(posts);
  console.log(`Built ${posts.length} Vietnamese posts.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
