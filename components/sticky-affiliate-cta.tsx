"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldIcon } from "@/components/icons";
import { PartnerLink } from "@/components/partner-link";

export function StickyAffiliateCta() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="sticky-affiliate-shell" data-collapsed={collapsed}>
      <aside aria-label="Truy cập nền tảng đối tác 18+" className="sticky-affiliate-cta">
        <button
          aria-label="Thu gọn bảng truy cập"
          className="sticky-affiliate-close"
          onClick={() => setCollapsed(true)}
          type="button"
        >
          ×
        </button>
        <div className="sticky-affiliate-copy">
          <span><ShieldIcon /> 18+ · Liên kết đối tác</span>
          <strong>Vào nền tảng Thantai688</strong>
          <small>Cập nhật nhanh, thao tác gọn, dành cho thành viên đủ tuổi.</small>
        </div>
        <div className="sticky-affiliate-actions">
          <PartnerLink className="button button-primary sticky-affiliate-main">Chơi ngay</PartnerLink>
          <Link className="sticky-affiliate-note" href="/ca-cuoc-the-thao">Lưu ý 18+</Link>
        </div>
      </aside>
      <button
        aria-label="Mở lại bảng truy cập Chơi ngay"
        className="sticky-affiliate-tab"
        onClick={() => setCollapsed(false)}
        type="button"
      >
        <span>Chơi ngay</span>
        <small>18+</small>
      </button>
    </div>
  );
}
