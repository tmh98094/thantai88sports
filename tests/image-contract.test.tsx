import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ImagePlaceholder } from "@/components/image-placeholder";
import posts from "@/generated/posts.json";

describe("image asset contract", () => {
  it("assigns every post a unique WebP image matching its slug", () => {
    const images = posts.map((post) => post.image);

    expect(images).toEqual(posts.map((post) => `/images/posts/${post.slug}.webp`));
    expect(new Set(images).size).toBe(posts.length);
  });

  it("emits a crawlable image with descriptive alternative text", () => {
    const html = renderToStaticMarkup(
      <ImagePlaceholder
        alt="Nữ chuyên gia phân tích sơ đồ chiến thuật bóng đá"
        label="analysis-board-1200x1200.webp"
        src="/images/home/analysis-board-1200x1200.webp"
      />,
    );

    expect(html).toContain('<img');
    expect(html).toContain('src="/images/home/analysis-board-1200x1200.webp"');
    expect(html).toContain('alt="Nữ chuyên gia phân tích sơ đồ chiến thuật bóng đá"');
  });

  it("keeps the 17-file prompt catalog synchronized with the site manifest", () => {
    const catalog = readFileSync(resolve(process.cwd(), "docs/AI_IMAGE_PROMPTS.md"), "utf8");
    const documentedPaths = [...catalog.matchAll(/\*\*Output path:\*\* `public(\/images\/[^`]+)`/g)].map((match) => match[1]);
    const expectedPaths = [
      "/images/og-default.webp",
      "/images/home/hero-stadium-1600x2000.webp",
      "/images/home/analysis-board-1200x1200.webp",
      ...posts.map((post) => post.image),
    ];

    expect(documentedPaths.sort()).toEqual(expectedPaths.sort());
    for (const post of posts) {
      expect(catalog).toContain(`\`${post.imageAlt}\``);
    }
  });

  it("uses model-first adult glamour prompts without negative-constraint blocks", () => {
    const catalog = readFileSync(resolve(process.cwd(), "docs/AI_IMAGE_PROMPTS.md"), "utf8");
    const entries = catalog.split(/^### \d+\. /m).slice(1);

    expect(entries).toHaveLength(17);
    expect(catalog).not.toContain("Negative constraints");
    for (const entry of entries) {
      expect(entry).toContain("**Generation prompt:**");
      expect(entry).toMatch(/age 25[–-]35/i);
      expect(entry).toMatch(/non-nude/i);
      expect(entry).toMatch(/lingerie|corset|camisole|bodysuit|crop (?:top|shirt)/i);
      expect(entry).toMatch(/flirtatious|naughty|seductive|teasing|playful/i);
      expect(entry).toMatch(/attached Thantai88 Sports logo/i);
      expect(entry).toMatch(/top-left/i);
    }
  });
});
