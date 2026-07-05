"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import { categories } from "@/lib/categories";
import type { PostSummary } from "@/lib/content-schema";

export function ArticleSearch({ posts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    return posts.filter((post) => {
      const matchesCategory = category === "all" || post.category === category;
      const haystack = `${post.title} ${post.description} ${post.tags.join(" ")}`.toLocaleLowerCase("vi");
      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, posts, query]);

  return (
    <div>
      <div className="filter-bar">
        <label>
          <span>Tìm bài viết</span>
          <input onChange={(event) => setQuery(event.target.value)} placeholder="Nhập chủ đề, đội bóng..." type="search" value={query} />
        </label>
        <label>
          <span>Chuyên mục</span>
          <select onChange={(event) => setCategory(event.target.value)} value={category}>
            <option value="all">Tất cả chuyên mục</option>
            {categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
          </select>
        </label>
        <strong>{filteredPosts.length} bài viết</strong>
      </div>
      {filteredPosts.length ? (
        <div className="posts-grid posts-grid-index">{filteredPosts.map((post) => <PostCard headingLevel={2} key={post.slug} post={post} />)}</div>
      ) : (
        <div className="empty-state"><strong>Chưa tìm thấy bài phù hợp</strong><p>Hãy thử một từ khóa hoặc chuyên mục khác.</p></div>
      )}
    </div>
  );
}
