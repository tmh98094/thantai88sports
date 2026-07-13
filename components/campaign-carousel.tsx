"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PartnerLink } from "@/components/partner-link";

const campaigns = [
  ["Tân thủ: thưởng nạp đầu và thử thách Slots", "Hoàn thành thử thách Slots, nhận ngay 65K.", "tan-thu-slot-65k", "Máy slot và rương thưởng trong sảnh casino đỏ vàng"],
  ["Nạp xuyên ngày", "Nhận thưởng tích lũy đến 5.888K.", "nap-xuyen-ngay-5888k", "Ba rương thưởng theo nhịp sáng trong ngày"],
  ["Tân thủ nạp liên tiếp", "Nhận thưởng đến 3.888K.", "tan-thu-nap-lien-tiep-3888k", "Lối đi ánh vàng dẫn đến ba kho phần thưởng"],
  ["Ưu đãi độc quyền mỗi ngày", "Nạp tiền và nhận thêm đến 2.488.000 VND.", "uu-dai-moi-ngay-2488000", "Viên pha lê đỏ trong phòng thưởng riêng"],
  ["World Cup Mega Bonus", "Thưởng hàng tuần đến 38.888.000 VND.", "world-cup-mega-38888000", "Cúp vàng và bóng đá giữa sân vận động đêm"],
  ["Lễ hội nạp tiền cuối tuần", "Nạp linh hoạt cuối tuần và nhận thêm ưu đãi.", "le-hoi-cuoi-tuan", "Không gian lễ hội cuối tuần với đèn lồng và quà tặng"],
  ["Mưa lì xì may mắn", "Nhận lì xì ngẫu nhiên trong lúc chơi.", "mua-li-xi", "Lì xì đỏ rơi quanh bát vàng trong sảnh tối"],
] as const;

export function CampaignCarousel() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const modalRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    previousFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setActive((value) => (value + 1) % campaigns.length);
      if (event.key === "ArrowLeft") setActive((value) => (value - 1 + campaigns.length) % campaigns.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus();
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !modalRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(modalRef.current, { y: 28, scale: 0.975, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.72, ease: "power4.out" });
      gsap.fromTo(".campaign-copy > *", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.54, stagger: 0.06, delay: 0.18, ease: "power3.out" });
    }, modalRef);
    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (!open || paused) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % campaigns.length), 6500);
    return () => window.clearInterval(timer);
  }, [open, paused]);

  if (!open) return null;
  const [title, description, image, alt] = campaigns[active];
  const move = (direction: number) => setActive((value) => (value + direction + campaigns.length) % campaigns.length);

  return (
    <div className="campaign-overlay" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <section aria-describedby="campaign-description" aria-labelledby="campaign-title" aria-modal="true" className="campaign-modal" onFocus={() => setPaused(true)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} ref={modalRef} role="dialog">
        <button aria-label="Đóng ưu đãi" className="campaign-close" onClick={() => setOpen(false)} ref={closeRef} type="button">×</button>
        <div className="campaign-media" key={image}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={alt} src={`/images/promotions/${image}.webp`} />
          <div className="campaign-count">{String(active + 1).padStart(2, "0")} / {String(campaigns.length).padStart(2, "0")}</div>
        </div>
        <div className="campaign-copy" aria-live="polite">
          <div className="campaign-limited">Ưu đãi có thời hạn</div>
          <h2 id="campaign-title">{title}</h2>
          <p id="campaign-description">{description}</p>
          <PartnerLink className="campaign-primary">Xem ưu đãi</PartnerLink>
          <small>Kiểm tra điều kiện hiện hành trên nền tảng đối tác. Chỉ dành cho người từ 18 tuổi.</small>
          <div className="campaign-controls">
            <button aria-label="Ưu đãi trước" onClick={() => move(-1)} type="button">‹</button>
            <div className="campaign-dots" aria-label="Chọn ưu đãi">
              {campaigns.map((item, index) => <button aria-current={index === active ? "true" : undefined} aria-label={`Xem ${item[0]}`} key={item[0]} onClick={() => setActive(index)} type="button" />)}
            </div>
            <button aria-label="Ưu đãi tiếp theo" onClick={() => move(1)} type="button">›</button>
          </div>
        </div>
      </section>
    </div>
  );
}
