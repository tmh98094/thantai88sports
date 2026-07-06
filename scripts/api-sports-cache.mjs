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
import {
  buildFootballDataMatchWindow,
  buildFallbackSportsWidgets,
  buildFootballDataWidgets,
  isFootballDataMatchFinished,
  isFootballDataMatchUpcoming,
  normalizeFootballDataMatch,
  normalizeFootballDataStanding,
} from "./content-automation-lib.mjs";

const { dryRun, date } = parseCliArgs();
const widgetOutputPath = path.join(process.cwd(), "public", "data", "sports-widgets.json");
const leaguesOutputPath = path.join(process.cwd(), "public", "data", "sports-leagues.json");
const providers = [
  { env: "FOOTBALL_DATA_KEY", label: "football-data.org" },
  { env: "API_FOOTBALL_KEY", label: "API-Football" },
  { env: "THESPORTSDB_KEY", label: "TheSportsDB" },
  { env: "SCOREBAT_TOKEN", label: "ScoreBat" },
];

const footballDataCompetitions = [
  { code: "PL", name: "Premier League", shortName: "Premier League" },
  { code: "CL", name: "Champions League", shortName: "Champions League" },
  { code: "PD", name: "La Liga", shortName: "La Liga" },
  { code: "SA", name: "Serie A", shortName: "Serie A" },
  { code: "WC", name: "World Cup", shortName: "World Cup" },
];

const missingEnv = listMissingEnv(providers);
const available = providers.filter((provider) => process.env[provider.env]).map((provider) => provider.label);
const providerErrors = [];
const rateLimits = [];
let leaguePayload;

async function fetchJson(url, options) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const contentType = response.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json") ? await response.json() : await response.text();
    if (!response.ok) {
      const message = typeof body === "object" && body?.message ? body.message : `${response.status} ${response.statusText}`;
      throw new Error(message);
    }
    return { body, response };
  } finally {
    clearTimeout(timeout);
  }
}

function hasApiFootballErrors(body) {
  if (!body?.errors) return false;
  if (Array.isArray(body.errors)) return body.errors.length > 0;
  return Object.keys(body.errors).length > 0;
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

async function fetchFootballData(pathname) {
  const { body, response } = await fetchJson(`https://api.football-data.org/v4${pathname}`, {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_KEY },
  });
  const remainingMinute = response.headers.get("x-requests-available-minute");
  rateLimits.push({
    provider: "football-data.org",
    path: pathname,
    remainingMinute,
  });
  return body;
}

async function buildWidgetsFromFootballData() {
  if (!process.env.FOOTBALL_DATA_KEY || dryRun) return undefined;

  const leagues = [];
  const publicLeagues = [];
  const matchWindow = buildFootballDataMatchWindow(date);
  for (const competition of footballDataCompetitions) {
    try {
      const matches = await fetchFootballData(
        `/competitions/${competition.code}/matches?dateFrom=${matchWindow.dateFrom}&dateTo=${matchWindow.dateTo}`,
      );
      const standings = await fetchFootballData(`/competitions/${competition.code}/standings`);
      const matchList = matches.matches ?? [];
      const standingList = standings.standings ?? [];
      leagues.push({
        ...competition,
        matches: matchList,
        standings: standingList,
      });
      const totalStanding = standingList.find((standing) => standing.type === "TOTAL") ?? standingList[0];
      const upcomingFixtures = matchList
        .filter((match) => isFootballDataMatchUpcoming(match, date))
        .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime())
        .slice(0, 8)
        .map((match) => normalizeFootballDataMatch(match, competition));
      const recentResults = matchList
        .filter((match) => isFootballDataMatchFinished(match))
        .sort((a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime())
        .slice(0, 8)
        .map((match) => normalizeFootballDataMatch(match, competition));
      const meaningfulTableRows = (totalStanding?.table ?? []).filter(
        (row) => (row.playedGames ?? 0) > 0 || (row.points ?? 0) > 0,
      );
      publicLeagues.push({
        ...competition,
        upcomingFixtures,
        recentResults,
        standings: meaningfulTableRows.slice(0, 12).map((row) => normalizeFootballDataStanding(row, competition)),
      });
    } catch (error) {
      providerErrors.push(`football-data.org ${competition.code}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (!leagues.length) return undefined;
  leaguePayload = {
    generatedAt: date.toISOString(),
    sourceStatus: "football-data.org",
    leagues: publicLeagues,
    providerErrors,
    rateLimits,
  };
  return buildFootballDataWidgets({ generatedAt: date, leagues, providerErrors, rateLimits });
}

async function buildWidgetsFromApiFootball() {
  if (!process.env.API_FOOTBALL_KEY || dryRun) return undefined;

  const headers = { "x-apisports-key": process.env.API_FOOTBALL_KEY };
  const nextFixtures = await fetchJson("https://v3.football.api-sports.io/fixtures?next=8", { headers });
  if (hasApiFootballErrors(nextFixtures.body)) {
    throw new Error(`API-Football fixtures: ${JSON.stringify(nextFixtures.body.errors)}`);
  }
  const upcomingItems = (nextFixtures.body.response ?? []).map(normalizeApiFootballFixture).filter(Boolean).slice(0, 8);
  const worldCupLeagueId = process.env.API_FOOTBALL_WORLD_CUP_LEAGUE_ID ?? "1";
  const worldCupSeason = process.env.API_FOOTBALL_WORLD_CUP_SEASON ?? "2026";
  const worldCupFixtures = await fetchJson(
    `https://v3.football.api-sports.io/fixtures?league=${worldCupLeagueId}&season=${worldCupSeason}&next=8`,
    { headers },
  );
  if (hasApiFootballErrors(worldCupFixtures.body)) {
    throw new Error(`API-Football World Cup: ${JSON.stringify(worldCupFixtures.body.errors)}`);
  }
  const worldCupItems = (worldCupFixtures.body.response ?? []).map(normalizeApiFootballFixture).filter(Boolean).slice(0, 8);

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
  widgets = (await buildWidgetsFromFootballData()) ?? (await buildWidgetsFromApiFootball()) ?? widgets;
} catch (error) {
  providerErrors.push(error instanceof Error ? error.message : String(error));
  widgets = { ...widgets, sourceStatus: "fallback-error", providerErrors };
}

if (!dryRun) {
  await mkdir(path.dirname(widgetOutputPath), { recursive: true });
  await writeFile(widgetOutputPath, `${JSON.stringify(widgets, null, 2)}\n`, "utf8");
  await writeFile(
    leaguesOutputPath,
    `${JSON.stringify(
      leaguePayload ?? {
        generatedAt: date.toISOString(),
        sourceStatus: widgets.sourceStatus,
        leagues: [],
        providerErrors,
        rateLimits,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

const markdown = buildReportMarkdown({
  title: "Sports API cache dry-run/report",
  siteName: "Thantai88sports",
  purpose: "Cập nhật dữ liệu bóng đá miễn phí để hiển thị widget và làm tín hiệu chọn chủ đề bài viết.",
  missingEnv,
  generatedAt: date,
  sections: [
    {
      heading: "Trạng thái provider",
      lines: [
        available.length ? `Có key cho: ${available.join(", ")}.` : "Chưa có API key miễn phí nào, script ghi report thay vì gọi API.",
        dryRun ? "Đang chạy dry-run, không fetch API và không ghi cache." : "Lần chạy này tạo report và cập nhật public widget JSON để website có dữ liệu hiển thị.",
        dryRun
          ? "Widget JSON không đổi trong dry-run."
          : `Đã cập nhật widget JSON: ${path.relative(process.cwd(), widgetOutputPath)} và ${path.relative(process.cwd(), leaguesOutputPath)}`,
        providerErrors.length ? `Provider lỗi: ${providerErrors.join("; ")}` : `Trạng thái widget: ${widgets.sourceStatus}.`,
      ],
    },
    {
      heading: "Rate limit",
      lines: rateLimits.length
        ? rateLimits.map((limit) => `${limit.provider} ${limit.path}: còn ${limit.remainingMinute ?? "không rõ"} request/phút.`)
        : ["Không có header rate limit vì đang dry-run hoặc chưa gọi provider."],
    },
    {
      heading: "Thiết kế cache đề xuất",
      lines: [
        "football-data.org là nguồn chính cho lịch, kết quả và bảng xếp hạng hiện tại.",
        "API-Football giữ vai trò dự phòng hoặc dữ liệu lịch sử vì free plan hạn chế season hiện tại và tham số next/last.",
        "Không hiển thị odds/prediction như lời khuyên đặt cược; chỉ dùng dữ liệu làm tham khảo có nguồn.",
      ],
    },
  ],
});

printResult(await writeSeoOpsFile(makeOutputPath("reports", "sports-api-cache", date), markdown, { dryRun }));
