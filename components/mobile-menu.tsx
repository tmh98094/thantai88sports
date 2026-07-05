"use client";

import Link from "next/link";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { navItems } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu-wrap">
      <button aria-expanded={open} aria-label={open ? "Đóng menu" : "Mở menu"} className="menu-toggle" onClick={() => setOpen((value) => !value)} type="button">
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      {open ? (
        <nav aria-label="Điều hướng di động" className="mobile-menu">
          {navItems.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link className="mobile-partner-link" href={siteConfig.partnerPath} onClick={() => setOpen(false)} rel="nofollow sponsored">Vào nền tảng · 18+</Link>
        </nav>
      ) : null}
    </div>
  );
}
