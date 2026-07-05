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
      heading: "CTA và internal link",
      lines: [
        "CTA chính nên dùng ngôn ngữ mềm: “Xem nền tảng thể thao” hoặc “Tìm hiểu thêm”.",
        "Mỗi brief nên liên kết về /ca-cuoc-the-thao, /choi-co-trach-nhiem và 1–2 bài guide liên quan.",
        "Nêu rõ link đối tác dẫn sang nền tảng ngoài, không phải trang vận hành trò chơi.",
      ],
    },
  ],
});

printResult(await writeSeoOpsFile(makeOutputPath("reports", "sports-content-briefs", date), markdown, { dryRun }));
