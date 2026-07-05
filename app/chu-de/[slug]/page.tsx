import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { PostCard } from "@/components/post-card";
import { categories, getCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { breadcrumbJsonLd, buildMetadata, serializeJsonLd } from "@/lib/seo";

type CategoryPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildMetadata({ title: category.name, description: category.description, path: `/chu-de/${slug}` });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const posts = getPostsByCategory(slug);
  const jsonLd = breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, { name: category.name, path: `/chu-de/${slug}` }]);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} type="application/ld+json" />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: category.name }]} />
          <span className="eyebrow eyebrow-light">Chuyên mục thể thao</span>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      </section>
      <section className="section category-index"><div className="container">
        <div className="category-index-head"><strong>{posts.length} bài viết</strong><span>Cập nhật theo thời gian xuất bản</span></div>
        {posts.length ? <div className="posts-grid">{posts.map((post) => <PostCard headingLevel={2} key={post.slug} post={post} />)}</div> : <div className="empty-state">Nội dung đang được chuẩn bị.</div>}
      </div></section>
      <section className="section section-final-cta"><div className="container"><CtaBanner /></div></section>
    </>
  );
}
