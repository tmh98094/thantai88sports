import { describe, expect, it } from "vitest";
import { infoPages } from "@/lib/info-pages";

describe("trust and legal page content", () => {
  it("defines unique Vietnamese metadata and nonempty sections for every trust route", () => {
    const paths = Object.keys(infoPages);
    expect(paths).toEqual(expect.arrayContaining(["gioi-thieu", "lien-he", "chinh-sach-bien-tap", "quyen-rieng-tu", "dieu-khoan", "cookie", "choi-co-trach-nhiem", "18-plus"]));
    expect(new Set(Object.values(infoPages).map((page) => page.title)).size).toBe(paths.length);
    expect(Object.values(infoPages).every((page) => page.description.length >= 70 && page.sections.length >= 2)).toBe(true);
  });
});
