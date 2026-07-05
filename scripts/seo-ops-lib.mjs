import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ignoredDirectoryNames = new Set([
  ".git",
  ".next",
  ".open-next",
  ".wrangler",
  ".worktrees",
  "coverage",
  "node_modules",
  "out",
]);

const scannableExtensions = new Set([".md", ".mdx", ".ts", ".tsx"]);

export function formatDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function makeOutputPath(bucket, name, date = new Date()) {
  if (!["reports", "drafts"].includes(bucket)) {
    throw new Error(`Unsupported seo-ops bucket: ${bucket}`);
  }

  return path.posix.join("docs", "seo-ops", bucket, `${formatDate(date)}-${normalizeSlug(name)}.md`);
}

export function normalizeSlug(value) {
  const withoutAccents = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d");

  return (
    withoutAccents
      .toLowerCase()
      .replace(/&/g, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 90) || "draft"
  );
}

export function listMissingEnv(requiredEnv, env = process.env) {
  return requiredEnv.filter((entry) => !env[entry.env]);
}

export function parseCliArgs(argv = process.argv.slice(2)) {
  const dateArg = argv.find((arg) => arg.startsWith("--date="));

  return {
    dryRun: argv.includes("--dry-run"),
    date: dateArg ? new Date(dateArg.slice("--date=".length)) : new Date(),
  };
}

export function buildComplianceNotes() {
  return [
    "Nội dung chỉ dành cho độc giả 18+ và phải nhắc người đọc tự đặt giới hạn ngân sách.",
    "Không dùng các claim như “chắc thắng”, “lợi nhuận đảm bảo”, “không rủi ro” hoặc lời hứa hoàn tiền không có bằng chứng.",
    "Không bịa giấy phép, RTP, tỷ lệ trả thưởng, khuyến mãi, tốc độ rút tiền, đánh giá người dùng hoặc trạng thái pháp lý.",
    "Tin tức/thống kê/lich thi đấu cần có nguồn và ngày kiểm tra; nội dung evergreen không nên đổi ngày chỉ để trông mới hơn.",
    "Cần duyệt thủ công trước khi xuất bản; các script này chỉ tạo report hoặc bản nháp nội bộ.",
  ].join("\n");
}

export function buildReportMarkdown({
  title,
  siteName,
  purpose,
  missingEnv = [],
  sections = [],
  generatedAt = new Date(),
}) {
  const missingEnvBlock = missingEnv.length
    ? missingEnv.map((entry) => `- ${entry.label}: thiếu \`${entry.env}\``).join("\n")
    : "- Không phát hiện biến môi trường bắt buộc bị thiếu cho lần chạy này.";

  const body = sections
    .map((section) => {
      const lines = section.lines?.length ? section.lines.map((line) => `- ${line}`).join("\n") : "- Không có ghi chú.";
      return `## ${section.heading}\n\n${lines}`;
    })
    .join("\n\n");

  return `# ${title}

- Site: ${siteName}
- Mục đích: ${purpose}
- Thời điểm tạo: ${generatedAt.toISOString()}
- Trạng thái xuất bản: Cần duyệt thủ công trước khi xuất bản

## Guardrails

- Không tự động deploy.
- Không tự động commit/push.
- Không tự động xuất bản nội dung iGaming hoặc betting.
- Chỉ dùng API miễn phí; nếu thiếu key hoặc hết quota thì ghi nhận trong report thay vì dừng hỏng.

## Biến môi trường/API

${missingEnvBlock}

## Ghi chú compliance

${buildComplianceNotes()
  .split("\n")
  .map((line) => `- ${line}`)
  .join("\n")}

${body}
`;
}

export function buildDraftMarkdown({ siteName, topic, angle, internalLinks = [], generatedAt = new Date() }) {
  const slug = normalizeSlug(topic);
  const links = internalLinks.length
    ? internalLinks.map((link) => `- ${link}`).join("\n")
    : "- Thêm 2–4 internal links sau khi biên tập kiểm tra intent.";

  return `# Bản nháp nội bộ: ${topic}

- Site: ${siteName}
- Slug gợi ý: ${slug}
- Ngày tạo: ${formatDate(generatedAt)}
- Trạng thái: Bản nháp cần duyệt thủ công, không tự động xuất bản

## Góc triển khai

${angle}

## Dàn ý tiếng Việt

1. Mở bài: nêu vấn đề người đọc đang tìm hiểu và nhắc nội dung dành cho 18+ nếu có yếu tố cá cược.
2. Giải thích chính: định nghĩa thuật ngữ, bối cảnh thể thao/iGaming, và điểm người mới hay hiểu sai.
3. Checklist thực tế: 5–7 điểm người đọc có thể tự kiểm tra trước khi bấm CTA.
4. Rủi ro và giới hạn: nhắc quản lý ngân sách, không chạy theo thua lỗ, không xem nội dung là lời khuyên tài chính.
5. CTA mềm: mời đọc thêm hoặc truy cập nền tảng qua link đối tác, kèm disclosure.

## Internal links nên cân nhắc

${links}

## Ghi chú compliance

${buildComplianceNotes()}
`;
}

export async function listProjectFiles(cwd = process.cwd()) {
  const results = [];

  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (entry.isDirectory() && ignoredDirectoryNames.has(entry.name)) continue;

      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }

      if (!scannableExtensions.has(path.extname(entry.name))) continue;
      results.push(toPosix(path.relative(cwd, absolutePath)));
    }
  }

  await walk(cwd);
  return results.sort();
}

export function summarizeFiles(files) {
  const byExtension = new Map();
  const byTopFolder = new Map();

  for (const file of files) {
    const extension = path.posix.extname(file) || "(none)";
    const topFolder = file.includes("/") ? file.split("/")[0] : "(root)";
    byExtension.set(extension, (byExtension.get(extension) ?? 0) + 1);
    byTopFolder.set(topFolder, (byTopFolder.get(topFolder) ?? 0) + 1);
  }

  return {
    total: files.length,
    byExtension: [...byExtension.entries()].map(([key, value]) => `${key}: ${value}`),
    byTopFolder: [...byTopFolder.entries()].map(([key, value]) => `${key}: ${value}`),
  };
}

export async function extractProjectLinks(cwd = process.cwd(), files = []) {
  const links = [];

  for (const file of files) {
    const text = await readFile(path.join(cwd, file), "utf8");
    for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      links.push({ file, href: match[1] });
    }
    for (const match of text.matchAll(/href=["']([^"']+)["']/g)) {
      links.push({ file, href: match[1] });
    }
  }

  return links;
}

export function summarizeLinks(links) {
  const internal = links.filter((link) => link.href.startsWith("/") && !link.href.startsWith("//"));
  const external = links.filter((link) => /^https?:\/\//.test(link.href));
  const affiliate = external.filter((link) => /thantai688\.com|\/go\/platform/.test(link.href));

  return {
    total: links.length,
    internal: internal.length,
    external: external.length,
    affiliate: affiliate.length,
    samples: links.slice(0, 12).map((link) => `${link.file} → ${link.href}`),
  };
}

export async function writeSeoOpsFile(relativePath, markdown, { cwd = process.cwd(), dryRun = false } = {}) {
  if (dryRun) {
    return { path: relativePath, dryRun: true };
  }

  const absolutePath = path.join(cwd, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, markdown, "utf8");
  return { path: relativePath, dryRun: false };
}

export function printResult(result) {
  const suffix = result.dryRun ? "DRY RUN, không ghi file" : "Đã ghi file";
  console.log(`${suffix}: ${result.path}`);
}

export function pathExists(cwd, relativePath) {
  return existsSync(path.join(cwd, relativePath));
}

function toPosix(value) {
  return value.split(path.sep).join(path.posix.sep);
}
