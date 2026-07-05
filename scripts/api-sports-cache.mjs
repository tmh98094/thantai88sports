import {
  buildReportMarkdown,
  listMissingEnv,
  makeOutputPath,
  parseCliArgs,
  printResult,
  writeSeoOpsFile,
} from "./seo-ops-lib.mjs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildFallbackSportsWidgets } from "./content-automation-lib.mjs";

const { dryRun, date } = parseCliArgs();
const widgetOutputPath = path.join(process.cwd(), "public", "data", "sports-widgets.json");
const providers = [
  { env: "API_FOOTBALL_KEY", label: "API-Football" },
  { env: "FOOTBALL_DATA_KEY", label: "football-data.org" },
  { env: "THESPORTSDB_KEY", label: "TheSportsDB" },
  { env: "SCOREBAT_TOKEN", label: "ScoreBat" },
];

const missingEnv = listMissingEnv(providers);
const available = providers.filter((provider) => process.env[provider.env]).map((provider) => provider.label);
const providerErrors = [];

async function fetchJson(url, options) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeApiFootballFixture(fixture) {
  const home = fixture?.teams?.home?.name;
  const away = fixture?.teams?.away?.name;
  const startsAt = fixture?.fixture?.date;
  if (!home || !away || !startsAt) return undefined;
  return {
    label: `${home} - ${away}`,
    value: new Date(startsAt).toLocaleString("vi-VN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }),
    note: fixture?.league?.name ? `${fixture.league.name}${fixture.league.round ? ` · ${fixture.league.round}` : ""}` : "Nguồn: API-Football",
  };
}

async function buildWidgetsFromApiFootball() {
  if (!process.env.API_FOOTBALL_KEY || dryRun) return undefined;

  const headers = { "x-apisports-key": process.env.API_FOOTBALL_KEY };
  const nextFixtures = await fetchJson("https://v3.football.api-sports.io/fixtures?next=8", { headers });
  const upcomingItems = (nextFixtures.response ?? []).map(normalizeApiFootballFixture).filter(Boolean).slice(0, 8);
  const worldCupLeagueId = process.env.API_FOOTBALL_WORLD_CUP_LEAGUE_ID ?? "1";
  const worldCupSeason = process.env.API_FOOTBALL_WORLD_CUP_SEASON ?? "2026";
  const worldCupFixtures = await fetchJson(
    `https://v3.football.api-sports.io/fixtures?league=${worldCupLeagueId}&season=${worldCupSeason}&next=8`,
    { headers },
  );
  const worldCupItems = (worldCupFixtures.response ?? []).map(normalizeApiFootballFixture).filter(Boolean).slice(0, 8);

  return {
    generatedAt: date.toISOString(),
    sourceStatus: "api-football",
    sections: [
      {
        id: "world-cup-2026",
        title: "World Cup 2026",
        description: "Lịch World Cup lấy từ API-Football khi free quota còn khả dụng.",
        items: worldCupItems.length
          ? worldCupItems
          : [{ label: "World Cup 2026", value: "Chưa có lịch mới", note: "API trả về rỗng trong lần cập nhật này." }],
      },
      {
        id: "upcoming-football",
        title: "Trận đáng chú ý sắp tới",
        description: "Các trận sắp diễn ra từ nguồn API-Football, dùng làm tín hiệu chủ đề cho bài viết.",
        items: upcomingItems.length
          ? upcomingItems
          : [{ label: "Lịch sắp tới", value: "Chưa có dữ liệu", note: "API trả về rỗng trong lần cập nhật này." }],
      },
      {
        id: "recent-results",
        title: "Kết quả gần đây",
        description: "Kết quả mới nên được kiểm tra lại bằng nguồn chính thức trước khi viết bài news.",
        items: [{ label: "Trạng thái", value: "Chưa bật lấy kết quả", note: "V1 ưu tiên lịch sắp tới để tiết kiệm quota miễn phí." }],
      },
    ],
  };
}

let widgets = buildFallbackSportsWidgets(date);

try {
  widgets = (await buildWidgetsFromApiFootball()) ?? widgets;
} catch (error) {
  providerErrors.push(`API-Football: ${error instanceof Error ? error.message : String(error)}`);
  widgets = { ...widgets, sourceStatus: "fallback-error", providerErrors };
}

if (!dryRun) {
  await mkdir(path.dirname(widgetOutputPath), { recursive: true });
  await writeFile(widgetOutputPath, `${JSON.stringify(widgets, null, 2)}\n`, "utf8");
}

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
        dryRun ? "Đang chạy dry-run, không fetch API và không ghi cache." : "Lần chạy này tạo report và cập nhật public widget JSON để website có dữ liệu hiển thị.",
        dryRun ? "Widget JSON không đổi trong dry-run." : `Đã cập nhật widget JSON: ${path.relative(process.cwd(), widgetOutputPath)}`,
        providerErrors.length ? `Provider lỗi: ${providerErrors.join("; ")}` : `Trạng thái widget: ${widgets.sourceStatus}.`,
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
