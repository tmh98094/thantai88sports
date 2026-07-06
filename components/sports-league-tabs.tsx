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

function EmptyLeaguePanel() {
  return (
    <div className="league-empty">
      <strong>Đang chờ dữ liệu giải đấu</strong>
      <p>Thêm FOOTBALL_DATA_KEY và chạy cache để hiển thị lịch thi đấu, kết quả và bảng xếp hạng.</p>
    </div>
  );
}

function MatchList({ title, items, emptyText }: { title: string; items: LeagueItem[]; emptyText: string }) {
  return (
    <article className="league-panel-card">
      <span>{title}</span>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li key={`${title}-${item.label}-${item.value}`}>
              <strong>{item.label}</strong>
              <b>{item.value}</b>
              <small>{item.note}</small>
            </li>
          ))}
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
          {items.map((item) => (
            <div key={`${item.label}-${item.value}`}>
              <strong>{item.label.replace(/^.*?:\s*/, "")}</strong>
              <b>{item.value}</b>
              <small>{item.note}</small>
            </div>
          ))}
        </div>
      ) : (
        <p>Chưa có bảng xếp hạng phù hợp.</p>
      )}
    </article>
  );
}

export function SportsLeagueTabs() {
  const leagues = payload.leagues ?? emptyLeagues;
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
          <p>Chọn giải đấu để xem lịch thi đấu, kết quả gần đây và nhóm đầu bảng.</p>
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
                {league.shortName}
              </button>
            ))}
          </div>

          {activeLeague ? (
            <div className="league-tab-content" role="tabpanel">
              <div className="league-tab-title">
                <span>{activeLeague.name}</span>
                <strong>{activeLeague.upcomingFixtures.length} trận sắp tới · {activeLeague.recentResults.length} kết quả gần đây</strong>
              </div>
              <div className="league-panel-grid">
                <MatchList emptyText="Chưa có lịch thi đấu mới." items={activeLeague.upcomingFixtures.slice(0, 5)} title="Lịch sắp tới" />
                <MatchList emptyText="Chưa có kết quả gần đây." items={activeLeague.recentResults.slice(0, 5)} title="Kết quả gần đây" />
                <StandingsTable items={activeLeague.standings.slice(0, 8)} />
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
