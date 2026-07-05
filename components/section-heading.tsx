import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export function SectionHeading({ eyebrow, title, description, href }: { eyebrow: string; title: string; description?: string; href?: string }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {href ? <Link className="text-link" href={href}>Xem tất cả <ArrowRight /></Link> : null}
    </div>
  );
}
