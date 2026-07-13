import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyAffiliateCta } from "@/components/sticky-affiliate-cta";

function visibleText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

describe("homepage structure", () => {
  it("renders one Vietnamese H1, sports categories, an 18+ notice, and direct platform CTAs", () => {
    const html = renderToStaticMarkup(<HomePage />);
    const text = visibleText(html);

    expect((html.match(/<h1/g) ?? []).length).toBe(1);
    expect(html).toContain("Cẩm nang thể thao");
    expect(html).toContain("Bóng đá Việt Nam");
    expect(html).toContain("Nền tảng đối tác có khu thể thao");
    expect(html).toContain("Thể thao, live casino, game, bắn cá và xổ số");
    expect(html).toContain("đọc bối cảnh trước khi chuyển sang nền tảng 18+");
    expect(html).toContain("18+");
    expect(html).toContain("https://thantai88.online");
    expect(html).toContain('href="/ca-cuoc-the-thao"');
    expect((html.match(/href="\/go\/platform"/g) ?? []).length).toBeGreaterThanOrEqual(3);
    expect(html).not.toContain("https://www.thantai688.com");
    expect(text).not.toMatch(/\bSEO\b|Google|CTA|người dùng|dự án/i);
    expect(text).not.toMatch(/chắc thắng|đảm bảo thắng|risk-free|guaranteed/i);
  });

  it("uses the supplied image logo in chrome and keeps a sticky affiliate pane available", () => {
    const html = renderToStaticMarkup(
      <>
        <SiteHeader />
        <StickyAffiliateCta />
        <SiteFooter />
      </>,
    );

    expect(html).toContain('src="/images/thantai88-logo-official.webp"');
    expect(html).toContain('class="sticky-affiliate-cta"');
    expect(html).toContain("Thu gọn CTA");
    expect(html).toContain("Chơi ngay");
    expect(html).not.toContain("Play Now");
    expect(html).toContain("sticky-affiliate-tab");
    expect((html.match(/href="\/go\/platform"/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect(html).not.toContain("THANTAI88<strong>SPORT</strong>");
  });

  it("keeps the Sports header on a green surface so the transparent logo stays readable", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

    expect(css).toContain(".site-header { backdrop-filter: blur(14px); background: rgba(4,43,33,.96);");
    expect(css).toContain(".desktop-nav a { color: rgba(255,255,255,.82);");
    expect(css).toContain(".menu-toggle { align-items: center; background: rgba(255,255,255,.08);");
    expect(css).not.toContain(".site-header { backdrop-filter: blur(14px); background: rgba(251,252,247,.94);");
  });
});
