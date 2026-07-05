import type { Metadata } from "next";
import { ArticleSearch } from "@/components/article-search";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { breadcrumbJsonLd, buildMetadata, serializeJsonLd } from "@/lib/seo";
import { getPostSummaries } from "@/lib/posts";

export const metadata: Metadata = buildMetadata({
  title: "Tin thể thao mới cập nhật",
  description:
    "Tin thể thao tiếng Việt được chọn lọc theo nguồn, ngày kiểm tra và bối cảnh rõ ràng cho độc giả trưởng thành.",
  path: "/tin-the-thao/tin-moi",
});

export default function SportsNewsIndexPage() {
  const posts = getPostSummaries().filter((post) => post.contentType === "news");
  const jsonLd = breadcrumbJsonLd([
    { name: "Trang chủ", path: "/" },
    { name: "Bài viết", path: "/tin-the-thao" },
    { name: "Tin mới", path: "/tin-the-thao/tin-moi" },
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
              { label: "Tin mới" },
            ]}
          />
          <span className="eyebrow eyebrow-light">Tin thể thao</span>
          <h1>Tin mới có nguồn, có ngày kiểm tra</h1>
          <p>
            Khu vực dành cho bài viết theo lịch đấu, kết quả và sự kiện hiện tại. Mỗi bài news cần nguồn rõ ràng và không
            biến thông tin thể thao thành lời khuyên cá cược.
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
