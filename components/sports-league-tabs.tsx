"use client";

import { useMemo, useState } from "react";
import rawLeagues from "@/public/data/sports-leagues.json";

type LeagueItem = {
  label: string;
  value: string;
  note: string;
};

type LeagueData = {
  code: string;
  name: string;
  shortName: string;
  upcomingFixtures: LeagueItem[];
  recentResults: LeagueItem[];
  standings: LeagueItem[];
};

type LeaguePayload = {
  generatedAt: string;
  sourceStatus: string;
  leagues: LeagueData[];
  providerErrors?: string[];
};

const payload = rawLeagues as LeaguePayload;
const emptyLeagues: LeagueData[] = [];
const leagueOrder = ["WC", "PL", "CL", "PD", "SA"];

const teamMarks: Record<string, string> = {
  Argentina: "🇦🇷",
  Belgium: "🇧🇪",
  Brazil: "🇧🇷",
  Canada: "🇨🇦",
  Colombia: "🇨🇴",
  "Cape Verde": "🇨🇻",
  Czechia: "🇨🇿",
  Ecuador: "🇪🇨",
  Egypt: "🇪🇬",
  England: "🏴",
  France: "🇫🇷",
  Ghana: "🇬🇭",
  Japan: "🇯🇵",
  "Korea Republic": "🇰🇷",
  Mexico: "🇲🇽",
  Morocco: "🇲🇦",
  Norway: "🇳🇴",
  Paraguay: "🇵🇾",
  Portugal: "🇵🇹",
  Spain: "🇪🇸",
  "South Africa": "🇿🇦",
  Switzerland: "🇨🇭",
  USA: "🇺🇸",
};

function sortLeagues(leagues: LeagueData[]) {
  return [...leagues].sort((a, b) => {
    const aIndex = leagueOrder.indexOf(a.code);
    const bIndex = leagueOrder.indexOf(b.code);
    return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
  });
}

function leagueTabName(league: LeagueData) {
  if (league.code === "PL") return "Premier";
  if (league.code === "CL") return "Cúp C1";
  return league.shortName;
}

function splitTeams(label: string) {
  const [home, away] = label.split(/\s+-\s+/);
  return { home: home || label, away };
}

function fallbackInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function TeamMark({ name }: { name: string }) {
  const mark = teamMarks[name];
  return <span className={mark ? "team-mark team-mark-flag" : "team-mark"}>{mark ?? fallbackInitials(name)}</span>;
}

function CompactTeam({ name }: { name: string }) {
  return (
    <span className="league-team">
      <TeamMark name={name} />
      <span>{name}</span>
    </span>
  );
}

function EmptyLeaguePanel() {
  return (
    <div className="league-empty">
      <strong>Đang chờ dữ liệu giải đấu</strong>
      <p>Thêm FOOTBALL_DATA_KEY và chạy cache để hiển thị lịch thi đấu, kết quả và bảng xếp hạng.</p>
    </div>
  );
}

function MatchList({
  title,
  items,
  emptyText,
  result = false,
}: {
  title: string;
  items: LeagueItem[];
  emptyText: string;
  result?: boolean;
}) {
  return (
    <article className="league-panel-card">
      <span>{title}</span>
      {items.length ? (
        <ul className="league-match-list">
          {items.map((item) => {
            const teams = splitTeams(item.label);

            return (
              <li className="league-match-item" key={`${title}-${item.label}-${item.value}`}>
                <div className="league-match-teams">
                  <CompactTeam name={teams.home} />
                  <b className={result ? "league-score is-result" : "league-score"}>{result ? item.value : "vs"}</b>
                  {teams.away ? <CompactTeam name={teams.away} /> : null}
                </div>
                <small>{result ? item.note : item.value}</small>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>{emptyText}</p>
      )}
    </article>
  );
}

function StandingsTable({ items }: { items: LeagueItem[] }) {
  return (
    <article className="league-panel-card league-standings-card">
      <span>Bảng xếp hạng</span>
      {items.length ? (
        <div className="league-standings-table">
          {items.map((item) => {
            const team = item.label.replace(/^.*?:\s*/, "");

            return (
              <div key={`${item.label}-${item.value}`}>
                <strong>
                  <TeamMark name={team} />
                  {team}
                </strong>
                <b>{item.value}</b>
                <small>{item.note}</small>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Chưa có bảng xếp hạng phù hợp.</p>
      )}
    </article>
  );
}

export function SportsLeagueTabs() {
  const leagues = useMemo(() => sortLeagues(payload.leagues ?? emptyLeagues), []);
  const defaultLeagueCode = leagues.find((league) => league.code === "WC")?.code ?? leagues[0]?.code ?? "";
  const [activeCode, setActiveCode] = useState(defaultLeagueCode);
  const activeLeague = useMemo(() => leagues.find((league) => league.code === activeCode) ?? leagues[0], [activeCode, leagues]);
  const updatedAt = new Date(payload.generatedAt).toLocaleString("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  });

  return (
    <section className="league-tabs-panel" aria-label="Trung tâm bóng đá tự động">
      <div className="league-tabs-head">
        <div>
          <span className="eyebrow eyebrow-light">Dữ liệu bóng đá cập nhật</span>
          <h2>Trung tâm bóng đá hôm nay</h2>
          <p>Chọn giải đấu để xem nhanh lịch, kết quả và nhóm đầu bảng.</p>
        </div>
        <small>
          Cập nhật: {updatedAt} · Nguồn: {payload.sourceStatus}
        </small>
      </div>

      {leagues.length ? (
        <>
          <div className="league-tab-list" role="tablist" aria-label="Chọn giải đấu">
            {leagues.map((league) => (
              <button
                aria-selected={activeLeague?.code === league.code}
                className={activeLeague?.code === league.code ? "is-active" : undefined}
                key={league.code}
                onClick={() => setActiveCode(league.code)}
                role="tab"
                type="button"
              >
                {leagueTabName(league)}
              </button>
            ))}
          </div>

          {activeLeague ? (
            <div className="league-tab-content" role="tabpanel">
              <div className="league-tab-title">
                <span>{activeLeague.name}</span>
                <strong>
                  {activeLeague.upcomingFixtures.length} trận sắp tới · {activeLeague.recentResults.length} kết quả gần đây
                </strong>
              </div>
              <div className="league-panel-grid">
                <MatchList emptyText="Chưa có lịch thi đấu mới." items={activeLeague.upcomingFixtures.slice(0, 4)} title="Lịch sắp tới" />
                <MatchList emptyText="Chưa có kết quả gần đây." items={activeLeague.recentResults.slice(0, 4)} result title="Kết quả gần đây" />
                <StandingsTable items={activeLeague.standings.slice(0, 4)} />
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <EmptyLeaguePanel />
      )}
    </section>
  );
}
