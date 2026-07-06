const bannedClaimPatterns = [
  /chắc\s*thắng/i,
  /đảm\s*bảo\s*(thắng|lợi\s*nhuận|kiếm\s*tiền)/i,
  /không\s*rủi\s*ro/i,
  /risk[-\s]*free/i,
  /guaranteed\s*(win|profit|income)/i,
  /sure\s*win/i,
];

const vietnameseSignalPattern = /[ăâđêôơưáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;

export function requiresSources(contentType) {
  return contentType === "news";
}

export function validatePostQuality(post) {
  const errors = [];
  const searchable = [
    post.title,
    post.description,
    post.imageAlt,
    post.body,
    ...(Array.isArray(post.tags) ? post.tags : []),
  ]
    .filter(Boolean)
    .join(" ");

  if (!post.slug || !/^[a-z0-9-]+$/.test(post.slug)) {
    errors.push("slug must be lowercase kebab-case");
  }

  if (post.image && post.slug && post.image !== `/images/posts/${post.slug}.webp`) {
    errors.push(`image must be /images/posts/${post.slug}.webp`);
  }

  if (!vietnameseSignalPattern.test(searchable)) {
    errors.push("content must be Vietnamese");
  }

  if (bannedClaimPatterns.some((pattern) => pattern.test(searchable))) {
    errors.push("content contains a banned iGaming/betting claim");
  }

  if (requiresSources(post.contentType)) {
    const refs = Array.isArray(post.sourceRefs) ? post.sourceRefs : [];
    if (!refs.length) {
      errors.push("news contentType requires sourceRefs");
    }
    for (const ref of refs) {
      if (!ref?.title || !ref?.url || !ref?.accessedAt) {
        errors.push("each sourceRefs item requires title, url, and accessedAt");
        break;
      }
    }
  }

  return errors;
}

export function buildPostQualityReport(posts) {
  const results = posts.map((post) => ({
    slug: post.slug,
    errors: validatePostQuality(post),
  }));
  const failed = results.filter((result) => result.errors.length).length;
  const passed = results.length - failed;
  const markdown = [
    "# Báo cáo kiểm tra nội dung tự động",
    "",
    `- Tổng số bài: ${results.length}`,
    `- Đạt: ${passed}`,
    `- Cần sửa: ${failed}`,
    "",
    ...results.map((result) =>
      result.errors.length
        ? `## ${result.slug}\n\n${result.errors.map((error) => `- ${error}`).join("\n")}`
        : `## ${result.slug}\n\n- Đạt kiểm tra tự động.`,
    ),
  ].join("\n");

  return { total: results.length, passed, failed, results, markdown };
}

export function buildFallbackSportsWidgets(date = new Date()) {
  return {
    generatedAt: date.toISOString(),
    sourceStatus: "fallback",
    sections: [
      {
        id: "world-cup-2026",
        title: "World Cup 2026",
        description:
          "Khu vực lịch thi đấu và kết quả World Cup 2026 sẽ được cập nhật khi API miễn phí có dữ liệu phù hợp.",
        items: [
          {
            label: "Theo dõi lịch chính thức",
            value: "Đang chờ dữ liệu",
            note: "Kiểm tra nguồn FIFA hoặc API thể thao trước khi xuất bản tin tức.",
          },
        ],
      },
      {
        id: "upcoming-football",
        title: "Trận đáng chú ý sắp tới",
        description: "Dữ liệu hiển thị ở chế độ dự phòng khi chưa có API key hoặc đã hết quota miễn phí.",
        items: [
          {
            label: "Nguồn dữ liệu",
            value: "Chưa kết nối API",
            note: "Thêm API_FOOTBALL_KEY hoặc FOOTBALL_DATA_KEY để tự động cập nhật.",
          },
        ],
      },
      {
        id: "recent-results",
        title: "Kết quả gần đây",
        description: "Kết quả chỉ nên dùng để tham khảo và cần ghi rõ nguồn dữ liệu khi được cập nhật.",
        items: [
          {
            label: "Trạng thái",
            value: "Chưa có dữ liệu mới",
            note: "Widget vẫn hiển thị an toàn để không làm vỡ giao diện.",
          },
        ],
      },
    ],
  };
}

function readFootballDataTeamName(team) {
  return team?.shortName || team?.name || "Đội bóng";
}

function formatIsoDateOnly(value) {
  return value.toISOString().slice(0, 10);
}

function addUtcDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

export function buildFootballDataMatchWindow(date = new Date(), { pastDays = 14, futureDays = 21 } = {}) {
  const base = new Date(date);

  return {
    dateFrom: formatIsoDateOnly(addUtcDays(base, -pastDays)),
    dateTo: formatIsoDateOnly(addUtcDays(base, futureDays)),
  };
}

function formatVietnamTime(value) {
  return new Date(value).toLocaleString("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  });
}

function formatGoalDifference(value) {
  if (typeof value !== "number") return "HS 0";
  return `HS ${value > 0 ? "+" : ""}${value}`;
}

const footballDataStatusLabels = {
  SCHEDULED: "Sắp diễn ra",
  TIMED: "Đã có giờ",
  IN_PLAY: "Đang diễn ra",
  PAUSED: "Tạm nghỉ",
  FINISHED: "Đã kết thúc",
  POSTPONED: "Hoãn",
  SUSPENDED: "Tạm dừng",
  CANCELLED: "Hủy",
};

function hasFootballDataFullTimeScore(match) {
  const fullTime = match?.score?.fullTime;
  return typeof fullTime?.home === "number" && typeof fullTime?.away === "number";
}

export function isFootballDataMatchFinished(match) {
  return ["FINISHED", "AWARDED"].includes(match?.status) || hasFootballDataFullTimeScore(match);
}

export function isFootballDataMatchUpcoming(match, referenceDate = new Date()) {
  if (["POSTPONED", "SUSPENDED", "CANCELLED", "FINISHED", "AWARDED"].includes(match?.status)) return false;
  if (hasFootballDataFullTimeScore(match)) return false;

  const startsAt = new Date(match?.utcDate).getTime();
  const reference = new Date(referenceDate).getTime();
  if (!Number.isFinite(startsAt) || !Number.isFinite(reference)) return false;

  return startsAt >= reference;
}

export function normalizeFootballDataMatch(match, competition) {
  const home = readFootballDataTeamName(match?.homeTeam);
  const away = readFootballDataTeamName(match?.awayTeam);
  const fullTime = match?.score?.fullTime;
  const hasScore = hasFootballDataFullTimeScore(match);
  const status = footballDataStatusLabels[match?.status] ?? match?.status ?? "Cập nhật";
  const round = match?.matchday ? `Vòng ${match.matchday}` : "Lịch thi đấu";

  return {
    label: `${home} - ${away}`,
    value: hasScore ? `${fullTime.home} - ${fullTime.away}` : formatVietnamTime(match?.utcDate),
    note: `${competition?.name ?? "Bóng đá"} · ${round} · ${status}`,
    startsAt: match?.utcDate,
    status: match?.status,
  };
}

export function normalizeFootballDataStanding(row, competition) {
  const team = readFootballDataTeamName(row?.team);
  const played = typeof row?.playedGames === "number" ? `${row.playedGames} trận` : "Chưa rõ số trận";
  const form = row?.form ? `Phong độ ${row.form}` : "Phong độ đang cập nhật";

  return {
    label: `${competition?.shortName ?? competition?.name ?? "Bảng xếp hạng"}: ${team}`,
    value: `#${row?.position ?? "-"} · ${row?.points ?? 0} điểm`,
    note: `${played} · ${formatGoalDifference(row?.goalDifference)} · ${form}`,
  };
}

export function buildFootballDataWidgets({ generatedAt = new Date(), leagues = [], providerErrors = [], rateLimits = [] } = {}) {
  const upcoming = [];
  const recent = [];
  const standings = [];

  for (const league of leagues) {
    const competition = {
      name: league.shortName ?? league.name,
      shortName: league.shortName ?? league.name,
    };

    for (const match of league.matches ?? []) {
      const item = normalizeFootballDataMatch(match, competition);
      if (isFootballDataMatchUpcoming(match, generatedAt)) {
        upcoming.push(item);
      }
      if (isFootballDataMatchFinished(match)) {
        recent.push(item);
      }
    }

    const totalStanding = (league.standings ?? []).find((standing) => standing.type === "TOTAL") ?? league.standings?.[0];
    const meaningfulTableRows = (totalStanding?.table ?? []).filter(
      (row) => (row.playedGames ?? 0) > 0 || (row.points ?? 0) > 0,
    );
    for (const row of meaningfulTableRows.slice(0, 3)) {
      standings.push(normalizeFootballDataStanding(row, competition));
    }
  }

  upcoming.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
  recent.sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());

  return {
    generatedAt: generatedAt.toISOString(),
    sourceStatus: "football-data.org",
    providerErrors,
    rateLimits,
    sections: [
      {
        id: "upcoming-football",
        title: "Trận bóng đá sắp tới",
        description: "Lịch thi đấu lấy từ football-data.org, phù hợp để theo dõi chủ đề Premier League, Champions League, La Liga, Serie A và World Cup.",
        items: upcoming.slice(0, 8).length
          ? upcoming.slice(0, 8)
          : [{ label: "Lịch sắp tới", value: "Chưa có dữ liệu", note: "API chưa trả về trận sắp diễn ra trong lần cập nhật này." }],
      },
      {
        id: "recent-results",
        title: "Kết quả gần đây",
        description: "Kết quả trận đấu được dùng làm tín hiệu viết tin thể thao, không dùng như lời khuyên cá cược.",
        items: recent.slice(0, 8).length
          ? recent.slice(0, 8)
          : [{ label: "Kết quả", value: "Chưa có dữ liệu", note: "API chưa trả về kết quả phù hợp trong lần cập nhật này." }],
      },
      {
        id: "standings-snapshot",
        title: "Bảng xếp hạng nổi bật",
        description: "Tóm tắt nhóm đầu bảng để hỗ trợ bài phân tích phong độ và bối cảnh trước trận.",
        items: standings.slice(0, 8).length
          ? standings.slice(0, 8)
          : [{ label: "Bảng xếp hạng", value: "Chưa có dữ liệu", note: "API chưa trả về bảng xếp hạng trong lần cập nhật này." }],
      },
    ],
  };
}
