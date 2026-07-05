import { z } from "zod";
import { categories } from "@/lib/categories";

const categorySlugs = categories.map((category) => category.slug) as [string, ...string[]];

export const frontmatterSchema = z.object({
  title: z.string().min(20).max(90),
  description: z.string().min(70).max(180),
  category: z.enum(categorySlugs),
  tags: z.array(z.string().min(2)).min(2).max(8),
  publishedAt: z.iso.date(),
  updatedAt: z.iso.date().optional(),
  author: z.string().min(2).default("Ban biên tập Thantai88sport"),
  featured: z.boolean().default(false),
  contentType: z.enum(["news", "analysis", "guide"]).default("guide"),
  image: z.string().startsWith("/images/"),
  imageAlt: z.string().min(10).max(160),
  related: z.array(z.string()).max(4).default([]),
  faq: z
    .array(z.object({ question: z.string().min(10), answer: z.string().min(20) }))
    .max(5)
    .default([]),
});

export const postSchema = frontmatterSchema.extend({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  html: z.string().min(100),
  readingMinutes: z.number().int().positive(),
});

export type Post = z.infer<typeof postSchema>;
export type PostSummary = Pick<Post, "slug" | "title" | "description" | "category" | "tags" | "readingMinutes" | "image" | "imageAlt">;
