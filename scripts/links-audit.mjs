import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import {
  buildKnownInternalPaths,
  extractMarkdownInternalLinks,
  validatePostQuality,
} from "./content-automation-lib.mjs";
import {
  buildReportMarkdown,
  extractProjectLinks,
  listProjectFiles,
  makeOutputPath,
  parseCliArgs,
  printResult,
  summarizeLinks,
  writeSeoOpsFile,
} from "./seo-ops-lib.mjs";

const { dryRun, date } = parseCliArgs();
const files = await listProjectFiles();
const links = await extractProjectLinks(process.cwd(), files);
const summary = summarizeLinks(links);
const posts = await readPosts();
const validInternalPaths = buildKnownInternalPaths(posts);
const postLinkRows = posts.map((post) => {
  const internalLinks = [...new Set(extractMarkdownInternalLinks(post.body))];
  const linkErrors = validatePostQuality(post, { validInternalPaths }).filter((error) =>
    error.startsWith("article body"),
  );
  const status = linkErrors.length ? "Cần sửa" : "Đạt";
  return `${status}: ${post.slug} — ${internalLinks.length} internal body links${
    linkErrors.length ? ` — ${linkErrors.join("; ")}` : ""
  }`;
});

const markdown = buildReportMarkdown({
  title: "Audit internal link - Thantai88sports",
  siteName: "Thantai88sports",
  purpose: "Tìm cơ hội internal link và kiểm tra disclosure/CTA trước khi publish.",
  generatedAt: date,
  sections: [
    {
      heading: "Tổng quan link",
      lines: [
        `Tổng link tìm thấy: ${summary.total}.`,
        `Internal link: ${summary.internal}.`,
        `External link: ${summary.external}.`,
        `Link affiliate/CTA phát hiện: ${summary.affiliate}.`,
      ],
    },
    {
      heading: "Kiểm tra body link theo từng bài",
      lines: postLinkRows.length ? postLinkRows : ["Không tìm thấy bài viết Markdown để kiểm tra."],
    },
    {
      heading: "Mẫu link cần kiểm tra",
      lines: summary.samples.length ? summary.samples : ["Không tìm thấy link trong lần quét này."],
    },
    {
      heading: "Việc nên làm",
      lines: [
        "Mỗi bài mới phải có ít nhất 3 internal links trong body, gồm /ca-cuoc-the-thao và 1–2 bài hoặc chủ đề liên quan.",
        "CTA trong body nên dẫn về /ca-cuoc-the-thao; nút CTA trực tiếp vẫn dùng /go/platform với rel sponsored/nofollow.",
        "Không để sports site cạnh tranh trực tiếp với main hub cho cùng một intent tổng quát.",
      ],
    },
  ],
});

printResult(await writeSeoOpsFile(makeOutputPath("reports", "sports-links-audit", date), markdown, { dryRun }));

async function readPosts() {
  const contentDirectory = path.join(process.cwd(), "content", "posts");
  const filenames = (await readdir(contentDirectory)).filter((filename) => filename.endsWith(".md"));

  return Promise.all(
    filenames.map(async (filename) => {
      const source = await readFile(path.join(contentDirectory, filename), "utf8");
      const { data, content } = matter(source);
      return {
        ...data,
        slug: filename.replace(/\.md$/, ""),
        body: content,
      };
    }),
  );
}
