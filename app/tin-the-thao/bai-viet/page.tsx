import type { Metadata } from "next";
import { ArticleSearch } from "@/components/article-search";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { breadcrumbJsonLd, buildMetadata, serializeJsonLd } from "@/lib/seo";
import { getPostSummaries } from "@/lib/posts";

export const metadata: Metadata = buildMetadata({
  title: "Bài viết thể thao & cẩm nang phân tích",
  description:
    "Bài viết evergreen về bóng đá, lịch thi đấu, phân tích trận và nguyên tắc theo dõi thể thao có trách nhiệm.",
  path: "/tin-the-thao/bai-viet",
});

export default function SportsArticlesIndexPage() {
  const posts = getPostSummaries().filter((post) => post.contentType === "analysis" || post.contentType === "guide");
  const jsonLd = breadcrumbJsonLd([
    { name: "Trang chủ", path: "/" },
    { name: "Bài viết", path: "/tin-the-thao" },
    { name: "Bài viết thể thao", path: "/tin-the-thao/bai-viet" },
  ]);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} type="application/ld+json" />
      <section className="page-hero page-hero-editorial">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Bài viết", href: "/tin-the-thao" },
              { label: "Cẩm nang & phân tích" },
            ]}
          />
          <span className="eyebrow eyebrow-light">Cẩm nang & phân tích</span>
          <h1>Bài viết giúp đọc trận tỉnh táo hơn</h1>
          <p>
            Nội dung evergreen giải thích bối cảnh thể thao, cách đọc dữ liệu và nguyên tắc 18+ mà không hứa hẹn kết quả
            hay lợi nhuận.
          </p>
        </div>
      </section>
      <section className="section index-section">
        <div className="container">
          <ArticleSearch posts={posts} />
        </div>
      </section>
    </>
  );
}
