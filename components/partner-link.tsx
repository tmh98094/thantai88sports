import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

type PartnerLinkProps = {
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
  direct?: boolean;
};

export function PartnerLink({ children, className = "button button-primary", showIcon = true, direct = true }: PartnerLinkProps) {
  return (
    <Link className={className} href={direct ? siteConfig.partnerPath : siteConfig.partnerInfoPath} rel={direct ? "nofollow sponsored" : undefined}>
      <span>{children}</span>
      {showIcon ? <ArrowUpRight /> : null}
    </Link>
  );
}
