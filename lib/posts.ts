import rawPosts from "@/generated/posts.json";
import { categories, type CategorySlug } from "@/lib/categories";
import { postSchema, type Post, type PostSummary } from "@/lib/content-schema";

const posts = postSchema.array().parse(rawPosts).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export { categories };

export function getAllPosts(): Post[] {
  return posts;
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((post) => post.featured);
}

export function getPostSummaries(): PostSummary[] {
  return posts.map(({ slug, title, description, category, tags, readingMinutes, image, imageAlt, contentType, publishedAt }) => ({
    slug,
    title,
    description,
    category,
    tags,
    readingMinutes,
    image,
    imageAlt,
    contentType,
    publishedAt,
  }));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: CategorySlug | string): Post[] {
  return posts.filter((post) => post.category === category);
}

export function getPostsByContentType(contentTypes: Post["contentType"][]): Post[] {
  const allowed = new Set(contentTypes);
  return posts.filter((post) => allowed.has(post.contentType));
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const handPicked = post.related
    .map((slug) => getPostBySlug(slug))
    .filter((candidate): candidate is Post => Boolean(candidate));
  const sameCategory = posts.filter(
    (candidate) => candidate.slug !== post.slug && candidate.category === post.category,
  );

  return [...new Map([...handPicked, ...sameCategory].map((candidate) => [candidate.slug, candidate])).values()].slice(
    0,
    limit,
  );
}
