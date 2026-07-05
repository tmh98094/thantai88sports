import Link from "next/link";
import { ArrowRight, ClockIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { PartnerLink } from "@/components/partner-link";
import { getCategory } from "@/lib/categories";
import type { PostSummary } from "@/lib/content-schema";

export function PostCard({ post, featured = false, headingLevel = 3 }: { post: PostSummary; featured?: boolean; headingLevel?: 2 | 3 }) {
  const category = getCategory(post.category);
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className={`post-card${featured ? " post-card-featured" : ""}`}>
      <Link aria-label={`Đọc bài: ${post.title}`} className="post-card-media" href={`/tin-the-thao/${post.slug}`}>
        <ImagePlaceholder alt={post.imageAlt} label={`${post.slug}.webp`} ratio={featured ? "hero" : "landscape"} src={post.image} />
      </Link>
      <div className="post-card-body">
        <div className="post-meta">
          <Link href={`/chu-de/${post.category}`}>{category?.name}</Link>
          <span><ClockIcon /> {post.readingMinutes} phút đọc</span>
        </div>
        <Heading><Link href={`/tin-the-thao/${post.slug}`}>{post.title}</Link></Heading>
        <p>{post.description}</p>
        <div className="post-card-actions">
          <PartnerLink className="button button-small button-primary">Vào nền tảng</PartnerLink>
          <Link className="text-link" href={`/tin-the-thao/${post.slug}`}>Đọc bài <ArrowRight /></Link>
        </div>
      </div>
    </article>
  );
}
