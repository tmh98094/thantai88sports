import {
  buildReportMarkdown,
  listMissingEnv,
  makeOutputPath,
  parseCliArgs,
  printResult,
  writeSeoOpsFile,
} from "./seo-ops-lib.mjs";

const { dryRun, date } = parseCliArgs();
const providers = [
  { env: "API_FOOTBALL_KEY", label: "API-Football" },
  { env: "FOOTBALL_DATA_KEY", label: "football-data.org" },
  { env: "THESPORTSDB_KEY", label: "TheSportsDB" },
  { env: "SCOREBAT_TOKEN", label: "ScoreBat" },
];

const missingEnv = listMissingEnv(providers);
const available = providers.filter((provider) => process.env[provider.env]).map((provider) => provider.label);

const markdown = buildReportMarkdown({
  title: "Sports API cache dry-run/report",
  siteName: "Thantai88sports",
  purpose: "Chuẩn bị cache dữ liệu thể thao miễn phí mà không phụ thuộc paid API.",
  missingEnv,
  generatedAt: date,
  sections: [
    {
      heading: "Trạng thái provider",
      lines: [
        available.length ? `Có key cho: ${available.join(", ")}.` : "Chưa có API key miễn phí nào, script ghi report thay vì gọi API.",
        dryRun ? "Đang chạy dry-run, không fetch API và không ghi cache." : "Lần chạy này chỉ tạo report; fetch/cache production sẽ được bật sau khi chốt schema hiển thị.",
      ],
    },
    {
      heading: "Thiết kế cache đề xuất",
      lines: [
        "Cache public-facing nên đặt ở Cloudflare KV hoặc generated JSON sau khi client duyệt widget.",
        "Mỗi provider cần giới hạn request/ngày để không vượt free tier.",
        "Không hiển thị odds/prediction như lời khuyên đặt cược; chỉ dùng làm dữ liệu tham khảo có nguồn.",
      ],
    },
  ],
});

printResult(await writeSeoOpsFile(makeOutputPath("reports", "sports-api-cache", date), markdown, { dryRun }));
