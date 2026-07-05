import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClockIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { PostCard } from "@/components/post-card";
import { getCategory } from "@/lib/categories";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, serializeJsonLd } from "@/lib/seo";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.description, path: `/tin-the-thao/${post.slug}`, image: post.image, imageAlt: post.imageAlt, type: "article" });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const category = getCategory(post.category);
  const relatedPosts = getRelatedPosts(post);
  const isEditorialTeam = /ban biên tập/i.test(post.author);
  const schemas = [
    articleJsonLd(post),
    breadcrumbJsonLd([
      { name: "Trang chủ", path: "/" },
      { name: "Bài viết", path: "/tin-the-thao" },
      { name: post.title, path: `/tin-the-thao/${post.slug}` },
    ]),
  ].filter(Boolean);

  return (
    <>
      {schemas.map((schema, index) => <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} key={index} type="application/ld+json" />)}
      <article>
        <header className="article-header">
          <div className="container article-header-inner">
            <Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Bài viết", href: "/tin-the-thao" }, { label: post.title }]} />
            <Link className="article-category" href={`/chu-de/${post.category}`}>{category?.name}</Link>
            <h1>{post.title}</h1>
            <p className="article-dek">{post.description}</p>
            <div className="article-byline"><span>Bởi <strong>{isEditorialTeam ? <Link href="/tac-gia/ban-bien-tap">{post.author}</Link> : post.author}</strong></span><span>Xuất bản {formatDate(post.publishedAt)}</span>{post.updatedAt && post.updatedAt !== post.publishedAt ? <span>Cập nhật {formatDate(post.updatedAt)}</span> : null}<span><ClockIcon /> {post.readingMinutes} phút đọc</span></div>
          </div>
        </header>
        <div className="container article-image"><ImagePlaceholder alt={post.imageAlt} label={`${post.slug}.webp`} ratio="hero" src={post.image} /></div>
        <div className="container article-layout"><ArticleBody post={post} /></div>
      </article>
      {relatedPosts.length ? <section className="section related-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">Đọc tiếp</span><h2>Bài viết liên quan</h2></div></div><div className="posts-grid">{relatedPosts.map((item) => <PostCard key={item.slug} post={item} />)}</div></div></section> : null}
    </>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
