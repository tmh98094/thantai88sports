import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { frontmatterSchema, postSchema, type Post } from "../lib/content-schema";

const root = process.cwd();
const contentDirectory = path.join(root, "content", "posts");
const outputFile = path.join(root, "generated", "posts.json");

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
  console.log(`Built ${posts.length} Vietnamese posts.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
