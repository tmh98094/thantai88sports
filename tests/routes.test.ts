import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { getAllPosts } from "@/lib/posts";

describe("crawl routes", () => {
  it("includes every article and trust hub in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const post of getAllPosts()) expect(urls.some((url) => url.endsWith(`/tin-the-thao/${post.slug}`))).toBe(true);
    for (const path of ["/tin-the-thao", "/ca-cuoc-the-thao", "/gioi-thieu", "/choi-co-trach-nhiem", "/chinh-sach-bien-tap", "/tac-gia/ban-bien-tap"]) {
      expect(urls.some((url) => url.endsWith(path))).toBe(true);
    }
  });

  it("blocks backend APIs and affiliate redirect paths from crawling", () => {
    const rules = robots().rules;
    const serialized = JSON.stringify(rules);
    expect(serialized).toContain("/api/");
    expect(serialized).toContain("/go/");
  });
});
