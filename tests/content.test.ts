import { describe, expect, it } from "vitest";
import { categories, getAllPosts, getPostBySlug, getPostSummaries, getPostsByCategory } from "@/lib/posts";

describe("Vietnamese post index", () => {
  it("contains unique, resolvable posts sorted newest first", () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThanOrEqual(6);
    expect(new Set(posts.map((post) => post.slug)).size).toBe(posts.length);
    expect(posts.every((post) => getPostBySlug(post.slug)?.slug === post.slug)).toBe(true);
    expect(posts.map((post) => post.publishedAt)).toEqual(
      [...posts].map((post) => post.publishedAt).sort().reverse(),
    );
  });

  it("provides category hubs that only return matching posts", () => {
    for (const category of categories) {
      expect(getPostsByCategory(category.slug).every((post) => post.category === category.slug)).toBe(true);
    }
  });

  it("keeps full article bodies out of the client-side search payload", () => {
    const summaries = getPostSummaries();
    expect(summaries).toHaveLength(getAllPosts().length);
    expect(summaries.every((post) => !("html" in post) && !("faq" in post) && !("related" in post))).toBe(true);
  });

  it("gives every article at least two valid contextual internal links", () => {
    const posts = getAllPosts();
    const slugs = new Set(posts.map((post) => post.slug));

    for (const post of posts) {
      const internalLinks = [...post.html.matchAll(/href="(\/[^"#?]+)"/g)].map((match) => match[1]);
      expect(internalLinks.length, post.slug).toBeGreaterThanOrEqual(2);
      for (const href of internalLinks.filter((path) => path.startsWith("/tin-the-thao/"))) {
        expect(slugs.has(href.replace("/tin-the-thao/", "")), `${post.slug} -> ${href}`).toBe(true);
      }
    }
  });
});
