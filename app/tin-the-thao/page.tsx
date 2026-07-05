import type { Metadata } from "next";
import { ArticleSearch } from "@/components/article-search";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { breadcrumbJsonLd, buildMetadata, serializeJsonLd } from "@/lib/seo";
import { getPostSummaries } from "@/lib/posts";

export const metadata: Metadata = buildMetadata({
  title: "Cẩm nang thể thao & góc nhìn bóng đá",
  description: "Khám phá cẩm nang thể thao, bóng đá Việt Nam, quốc tế và phương pháp phân tích trận đấu được biên tập dành cho độc giả Việt.",
  path: "/tin-the-thao",
});

export default function NewsPage() {
  const jsonLd = breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, { name: "Bài viết", path: "/tin-the-thao" }]);
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} type="application/ld+json" />
      <section className="page-hero page-hero-editorial">
        <div className="container">
          <Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Bài viết" }]} />
          <span className="eyebrow eyebrow-light">Trung tâm nội dung</span>
          <h1>Cẩm nang thể thao &<br />góc nhìn bóng đá</h1>
          <p>Nội dung nền tảng được chọn lọc, đặt trong bối cảnh và trình bày dễ hiểu để bạn theo dõi thể thao chủ động hơn.</p>
        </div>
      </section>
      <section className="section index-section"><div className="container"><ArticleSearch posts={getPostSummaries()} /></div></section>
    </>
  );
}
