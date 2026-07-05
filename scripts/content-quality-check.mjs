import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import { buildPostQualityReport } from "./content-automation-lib.mjs";

const contentDirectory = path.join(process.cwd(), "content", "posts");

const filenames = (await readdir(contentDirectory)).filter((filename) => filename.endsWith(".md"));
const posts = await Promise.all(
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

const report = buildPostQualityReport(posts);
console.log(report.markdown);

if (report.failed > 0) {
  process.exitCode = 1;
}
