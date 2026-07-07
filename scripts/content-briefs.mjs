import {
  buildReportMarkdown,
  listMissingEnv,
  makeOutputPath,
  parseCliArgs,
  printResult,
  writeSeoOpsFile,
} from "./seo-ops-lib.mjs";

const { dryRun, date } = parseCliArgs();
const missingEnv = listMissingEnv([
  { env: "API_FOOTBALL_KEY", label: "API-Football" },
  { env: "FOOTBALL_DATA_KEY", label: "football-data.org" },
  { env: "THESPORTSDB_KEY", label: "TheSportsDB" },
  { env: "SCOREBAT_TOKEN", label: "ScoreBat" },
]);

const topics = [
  "Cách đọc lịch thi đấu để đánh giá thể lực đội bóng",
  "Những chỉ số bóng đá người mới nên hiểu trước khi xem tỷ lệ",
  "Cách theo dõi phong độ sân nhà/sân khách mà không phóng đại kết quả",
  "Checklist quản lý ngân sách khi xem kèo thể thao",
];

const internalLinkPack = [
  "/ca-cuoc-the-thao",
  "/tin-the-thao/nhan-dinh-truoc-tran-can-xem-gi",
  "/tin-the-thao/phan-tich-lich-thi-dau-va-the-luc",
  "/choi-co-trach-nhiem",
];

const markdown = buildReportMarkdown({
  title: "Brief nội dung thể thao",
  siteName: "Thantai88sports",
  purpose: "Gợi ý brief tiếng Việt cho tin thể thao, guide bóng đá và nội dung betting có trách nhiệm.",
  missingEnv,
  generatedAt: date,
  sections: [
    {
      heading: "Chủ đề ưu tiên",
      lines: topics.map((topic) => `${topic} — dùng nguồn dữ liệu miễn phí nếu có, tránh claim chắc thắng.`),
    },
    {
      heading: "CTA và internal link bắt buộc",
      lines: [
        "Mỗi brief/bài mới phải có ít nhất 3 internal links trong body.",
        "Bắt buộc có /ca-cuoc-the-thao như CTA mềm trong nội dung; nút trực tiếp vẫn dùng /go/platform.",
        "Thêm 1–2 link bài viết hoặc chủ đề liên quan để tạo cụm nội dung SEO.",
        "Nếu bài có ngữ cảnh cá cược, thêm /choi-co-trach-nhiem hoặc một bài guide quản lý ngân sách.",
        `Link pack mặc định: ${internalLinkPack.join(", ")}.`,
      ],
    },
  ],
});

printResult(await writeSeoOpsFile(makeOutputPath("reports", "sports-content-briefs", date), markdown, { dryRun }));
