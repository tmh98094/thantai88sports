import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { MobileMenu } from "@/components/mobile-menu";
import { PartnerLink } from "@/components/partner-link";
import { navItems } from "@/lib/navigation";

export function SiteHeader() {
  return (
    <>
      <div className="responsible-strip">
        <div className="container responsible-strip-inner">
          <span><strong>18+</strong> Chỉ dành cho người trưởng thành</span>
          <Link href="/choi-co-trach-nhiem">Giải trí có trách nhiệm · Biết giới hạn của bạn</Link>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <BrandLogo />
          <nav aria-label="Điều hướng chính" className="desktop-nav">
            {navItems.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </nav>
          <div className="header-actions">
            <PartnerLink className="button button-small button-primary">Vào nền tảng · 18+</PartnerLink>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
