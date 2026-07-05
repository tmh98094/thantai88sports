import assert from "node:assert/strict";
import test from "node:test";

import {
  buildComplianceNotes,
  buildReportMarkdown,
  listMissingEnv,
  makeOutputPath,
  normalizeSlug,
} from "./seo-ops-lib.mjs";

test("listMissingEnv returns only unset required variables", () => {
  const missing = listMissingEnv(
    [
      { env: "GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL", label: "Google Search Console" },
      { env: "PAGESPEED_API_KEY", label: "PageSpeed Insights" },
    ],
    { PAGESPEED_API_KEY: "present" },
  );

  assert.deepEqual(missing, [
    { env: "GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL", label: "Google Search Console" },
  ]);
});

test("makeOutputPath uses the safe docs seo-ops folders", () => {
  assert.equal(
    makeOutputPath("reports", "weekly-seo", new Date("2026-07-05T00:00:00Z")),
    "docs/seo-ops/reports/2026-07-05-weekly-seo.md",
  );
  assert.equal(
    makeOutputPath("drafts", "sports-brief", new Date("2026-07-05T00:00:00Z")),
    "docs/seo-ops/drafts/2026-07-05-sports-brief.md",
  );
});

test("normalizeSlug creates stable Vietnamese-safe slugs", () => {
  assert.equal(normalizeSlug("Nổ hũ là gì? RTP & Volatility"), "no-hu-la-gi-rtp-volatility");
});

test("buildReportMarkdown includes human review and no auto-publish guardrails", () => {
  const report = buildReportMarkdown({
    title: "Báo cáo thử nghiệm",
    siteName: "Thantai88sports",
    purpose: "Kiểm tra lịch nội dung.",
    missingEnv: [{ env: "API_FOOTBALL_KEY", label: "API-Football" }],
    sections: [{ heading: "Việc nên làm", lines: ["Tạo brief tiếng Việt."] }],
    generatedAt: new Date("2026-07-05T00:00:00Z"),
  });

  assert.match(report, /Báo cáo thử nghiệm/);
  assert.match(report, /Cần duyệt thủ công trước khi xuất bản/);
  assert.match(report, /API_FOOTBALL_KEY/);
  assert.match(report, /Không tự động deploy/);
});

test("buildComplianceNotes keeps iGaming claims conservative", () => {
  const notes = buildComplianceNotes();

  assert.match(notes, /18\+/);
  assert.match(notes, /Không dùng các claim/);
  assert.match(notes, /không bịa giấy phép/i);
});
