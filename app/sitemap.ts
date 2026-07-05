import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site-config";

const staticPaths = [
  "/",
  "/tin-the-thao",
  "/tin-the-thao/tin-moi",
  "/tin-the-thao/bai-viet",
  "/ca-cuoc-the-thao",
  "/gioi-thieu",
  "/lien-he",
  "/chinh-sach-bien-tap",
  "/tac-gia/ban-bien-tap",
  "/quyen-rieng-tu",
  "/dieu-khoan",
  "/cookie",
  "/choi-co-trach-nhiem",
  "/18-plus",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: path === "/" ? ("daily" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/tin-the-thao" ? 0.9 : 0.5,
    })),
    ...categories.map((category) => ({
      url: absoluteUrl(`/chu-de/${category.slug}`),
      lastModified: getLatestDate(posts.filter((post) => post.category === category.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/tin-the-thao/${post.slug}`),
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.8 : 0.7,
      images: [absoluteUrl(post.image)],
    })),
  ];
}

function getLatestDate(posts: ReturnType<typeof getAllPosts>) {
  return posts.map((post) => post.updatedAt ?? post.publishedAt).sort().reverse()[0] ?? "2026-07-03";
}
