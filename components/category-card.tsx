import Link from "next/link";
import { ArrowUpRight, BallIcon } from "@/components/icons";
import type { categories } from "@/lib/categories";

type Category = (typeof categories)[number];

export function CategoryCard({ category, index }: { category: Category; index: number }) {
  return (
    <Link className="category-card" href={`/chu-de/${category.slug}`}>
      <span className="category-number">0{index + 1}</span>
      <span className="category-icon"><BallIcon /></span>
      <strong>{category.name}</strong>
      <span>{category.description}</span>
      <ArrowUpRight className="category-arrow" />
    </Link>
  );
}
