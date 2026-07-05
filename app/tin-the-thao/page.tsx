import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSearch } from "@/components/article-search";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SportsWidgets } from "@/components/sports-widgets";
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
      <section className="section index-section">
        <div className="container">
          <div className="content-type-grid">
            <Link href="/tin-the-thao/tin-moi">
              <span>Tin mới</span>
              <strong>News thể thao có nguồn</strong>
              <p>Lịch đấu, kết quả và chủ đề đang được quan tâm, luôn cần nguồn và ngày kiểm tra.</p>
            </Link>
            <Link href="/tin-the-thao/bai-viet">
              <span>Bài viết</span>
              <strong>Cẩm nang & phân tích</strong>
              <p>Nội dung evergreen giúp đọc trận, đọc tỷ lệ và quản lý rủi ro tỉnh táo hơn.</p>
            </Link>
          </div>
          <SportsWidgets />
          <ArticleSearch posts={getPostSummaries()} />
        </div>
      </section>
    </>
  );
}
