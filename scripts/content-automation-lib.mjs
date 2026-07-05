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
