import { ShieldIcon } from "@/components/icons";
import { PartnerLink } from "@/components/partner-link";

export function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-orbit cta-orbit-one" />
      <div className="cta-orbit cta-orbit-two" />
      <div className="cta-copy">
        <span className="eyebrow eyebrow-light"><ShieldIcon /> Nền tảng dành cho người trưởng thành</span>
        <h2>Sẵn sàng vào nền tảng Thantai688?</h2>
        <p>Đọc nhanh các lưu ý chính, kiểm tra điều khoản và tự đặt giới hạn trước khi chuyển sang nền tảng dành cho người từ 18 tuổi trở lên.</p>
      </div>
      <div className="cta-actions">
        <PartnerLink className="button button-light">Vào nền tảng ngay (18+)</PartnerLink>
        <small>18+ · Điều khoản áp dụng · Chơi có trách nhiệm</small>
      </div>
    </section>
  );
}
