import { renderToStaticMarkup } from "react-dom/server";
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
    expect(html).toContain("18+");
    expect(html).toContain("https://thantai88.online");
    expect(html).toContain('href="/ca-cuoc-the-thao"');
    expect((html.match(/href="\/go\/platform"/g) ?? []).length).toBeGreaterThanOrEqual(3);
    expect(html).not.toContain("https://www.thantai688.com");
    expect(text).not.toMatch(/\bSEO\b|Google|CTA|người dùng|dự án/i);
  });

  it("uses the supplied image logo in chrome and keeps a sticky affiliate pane available", () => {
    const html = renderToStaticMarkup(
      <>
        <SiteHeader />
        <StickyAffiliateCta />
        <SiteFooter />
      </>,
    );

    expect(html).toContain('src="/images/logo.png"');
    expect(html).toContain('class="sticky-affiliate-cta"');
    expect(html).toContain("Thu gọn CTA");
    expect(html).toContain("Play Now");
    expect(html).toContain("sticky-affiliate-tab");
    expect((html.match(/href="\/go\/platform"/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect(html).not.toContain("THANTAI88<strong>SPORT</strong>");
  });
});
