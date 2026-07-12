import { describe, expect, it } from "vitest";
import { articleJsonLd, buildMetadata, breadcrumbJsonLd, editorialProfileJsonLd, serializeJsonLd, websiteJsonLd } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";

describe("SEO helpers", () => {
  it("builds absolute canonical metadata with Vietnamese social fields", () => {
    const metadata = buildMetadata({
      title: "Tin thể thao mới nhất",
      description: "Thông tin thể thao được chọn lọc dành cho độc giả Việt Nam.",
      path: "/tin-the-thao",
    });

    expect(metadata.alternates?.canonical?.toString()).toContain("/tin-the-thao");
    expect(metadata.openGraph && "locale" in metadata.openGraph ? metadata.openGraph.locale : null).toBe("vi_VN");
  });

  it("creates article and breadcrumb structured data without unsafe angle brackets", () => {
    const newsPost = getAllPosts().find((post) => post.contentType === "news");
    const evergreenPost = getAllPosts().find((post) => post.contentType !== "news");
    expect(newsPost).toBeDefined();
    expect(evergreenPost).toBeDefined();

    const article = articleJsonLd(newsPost!);
    const evergreenArticle = articleJsonLd(evergreenPost!);
    const breadcrumbs = breadcrumbJsonLd([
      { name: "Trang chủ", path: "/" },
      { name: newsPost!.title, path: `/tin-the-thao/${newsPost!.slug}` },
    ]);
    const serialized = serializeJsonLd({ article, breadcrumbs, injected: "</script><script>" });

    expect(article["@type"]).toBe("NewsArticle");
    expect(evergreenArticle["@type"]).toBe("BlogPosting");
    expect(article.author).toMatchObject({
      "@type": "Organization",
      url: expect.stringContaining("/tac-gia/ban-bien-tap"),
    });
    expect(breadcrumbs.itemListElement).toHaveLength(2);
    expect(serialized).not.toContain("</script>");
  });

  it("does not emit deprecated FAQ rich-result markup", async () => {
    const seo = await import("@/lib/seo");
    expect("faqJsonLd" in seo).toBe(false);
  });

  it("describes the Vietnamese publisher and website", () => {
    const graph = websiteJsonLd();
    expect(graph["@graph"].map((item) => item["@type"])).toEqual(["Organization", "WebSite"]);
    expect(graph["@graph"][1].inLanguage).toBe("vi-VN");
    expect(JSON.stringify(graph)).toContain("/images/logo.png");
  });

  it("describes the editorial-team URL as a profile page", () => {
    const profile = editorialProfileJsonLd();
    expect(profile["@type"]).toBe("ProfilePage");
    expect(profile.mainEntity).toMatchObject({
      "@type": "Organization",
      url: expect.stringContaining("/tac-gia/ban-bien-tap"),
    });
  });
});
