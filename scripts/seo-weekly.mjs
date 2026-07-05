import {
  buildReportMarkdown,
  listMissingEnv,
  listProjectFiles,
  makeOutputPath,
  parseCliArgs,
  printResult,
  summarizeFiles,
  writeSeoOpsFile,
} from "./seo-ops-lib.mjs";

const { dryRun, date } = parseCliArgs();
const files = await listProjectFiles();
const summary = summarizeFiles(files);
const missingEnv = listMissingEnv([
  { env: "GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL", label: "Google Search Console" },
  { env: "PAGESPEED_API_KEY", label: "PageSpeed Insights" },
  { env: "CLOUDFLARE_API_TOKEN", label: "Cloudflare Analytics GraphQL" },
]);

const markdown = buildReportMarkdown({
  title: "Báo cáo SEO tuần - Thantai88sports",
  siteName: "Thantai88sports",
  purpose: "Theo dõi health SEO, content gap và ưu tiên refresh cho site thể thao.",
  missingEnv,
  generatedAt: date,
  sections: [
    {
      heading: "Tổng quan repo",
      lines: [
        `Tổng file nội dung/code có thể quét: ${summary.total}.`,
        `Theo phần mở rộng: ${summary.byExtension.join(", ")}.`,
        `Theo thư mục chính: ${summary.byTopFolder.join(", ")}.`,
      ],
    },
    {
      heading: "Ưu tiên tuần này",
      lines: [
        "Kiểm tra bài guide đọc tỷ lệ, phân tích lịch thi đấu, quản lý ngân sách và chơi có trách nhiệm.",
        "Tạo internal link từ bài tin/nhận định mới về hub thể thao, chính sách biên tập và trang chơi có trách nhiệm.",
        "Không tạo bài “hôm nay” nếu không có lịch cập nhật dữ liệu thật.",
      ],
    },
    {
      heading: "Nguồn miễn phí nên dùng",
      lines: [
        "API-Football hoặc football-data.org cho fixtures/standings nếu có key miễn phí.",
        "TheSportsDB và ScoreBat chỉ dùng để gợi ý chủ đề/hình ảnh/highlight, không copy nội dung.",
        "OpenF1 chỉ dùng dữ liệu historical/free, không phụ thuộc real-time paid subscription.",
      ],
    },
  ],
});

printResult(await writeSeoOpsFile(makeOutputPath("reports", "sports-weekly-seo", date), markdown, { dryRun }));
