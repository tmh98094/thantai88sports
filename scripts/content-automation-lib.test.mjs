import assert from "node:assert/strict";
import test from "node:test";

import {
  buildFallbackSportsWidgets,
  buildPostQualityReport,
  requiresSources,
  validatePostQuality,
} from "./content-automation-lib.mjs";

const safeNewsPost = {
  slug: "lich-thi-dau-world-cup-2026-hom-nay",
  title: "Lịch thi đấu World Cup 2026 hôm nay: cách theo dõi thông tin an toàn",
  description:
    "Cập nhật bối cảnh lịch thi đấu World Cup 2026 cho độc giả Việt Nam, kèm cách kiểm tra nguồn và lưu ý không xem thông tin như lời khuyên cá cược.",
  contentType: "news",
  image: "/images/posts/lich-thi-dau-world-cup-2026-hom-nay.webp",
  imageAlt: "Bảng lịch thi đấu bóng đá quốc tế với điểm nhấn World Cup 2026",
  sourceRefs: [
    {
      title: "FIFA World Cup 2026 schedule",
      url: "https://www.fifa.com/",
      accessedAt: "2026-07-06",
    },
  ],
  body:
    "Bài viết này tóm tắt thông tin thể thao cho độc giả trưởng thành. Nội dung chỉ dùng để tham khảo, không bảo đảm kết quả và không thay thế việc kiểm tra nguồn chính thức trước khi theo dõi trận đấu.",
};

test("requiresSources returns true only for news content", () => {
  assert.equal(requiresSources("news"), true);
  assert.equal(requiresSources("analysis"), false);
  assert.equal(requiresSources("guide"), false);
});

test("validatePostQuality accepts Vietnamese news with source references", () => {
  assert.deepEqual(validatePostQuality(safeNewsPost), []);
});

test("validatePostQuality rejects news posts without sources", () => {
  const errors = validatePostQuality({ ...safeNewsPost, sourceRefs: [] });

  assert.ok(errors.some((error) => error.includes("sourceRefs")));
});

test("validatePostQuality rejects banned guaranteed-win claims", () => {
  const errors = validatePostQuality({
    ...safeNewsPost,
    body: `${safeNewsPost.body} Đây là kèo chắc thắng và lợi nhuận đảm bảo.`,
  });

  assert.ok(errors.some((error) => error.includes("claim")));
});

test("buildPostQualityReport summarizes post failures for schedules", () => {
  const report = buildPostQualityReport([
    safeNewsPost,
    { ...safeNewsPost, slug: "tin-khong-nguon", sourceRefs: [] },
  ]);

  assert.equal(report.total, 2);
  assert.equal(report.failed, 1);
  assert.equal(report.passed, 1);
  assert.match(report.markdown, /tin-khong-nguon/);
});

test("buildFallbackSportsWidgets returns stable World Cup and fixture sections", () => {
  const widgets = buildFallbackSportsWidgets(new Date("2026-07-06T00:00:00Z"));

  assert.equal(widgets.generatedAt, "2026-07-06T00:00:00.000Z");
  assert.equal(widgets.sourceStatus, "fallback");
  assert.ok(widgets.sections.some((section) => section.id === "world-cup-2026"));
  assert.ok(widgets.sections.some((section) => section.id === "upcoming-football"));
});
