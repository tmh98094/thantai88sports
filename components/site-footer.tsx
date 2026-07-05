import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { categories } from "@/lib/categories";
import { navItems } from "@/lib/navigation";

const legalLinks = [
  ["Giới thiệu", "/gioi-thieu"],
  ["Liên hệ", "/lien-he"],
  ["Chính sách biên tập", "/chinh-sach-bien-tap"],
  ["Quyền riêng tư", "/quyen-rieng-tu"],
  ["Điều khoản sử dụng", "/dieu-khoan"],
  ["Chính sách cookie", "/cookie"],
  ["Nền tảng đối tác 18+", "/ca-cuoc-the-thao"],
  ["RSS", "/rss.xml"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <BrandLogo className="brand-logo-footer" />
          <p>Kênh nội dung thể thao và cẩm nang giải trí trực tuyến dành cho độc giả Việt Nam trưởng thành.</p>
          <div className="age-badge"><strong>18+</strong><span>Chơi có trách nhiệm<br />Không dành cho trẻ vị thành niên</span></div>
        </div>
        <div>
          <h2>Khám phá</h2>
          <ul>{navItems.slice(1).map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
        </div>
        <div>
          <h2>Chủ đề</h2>
          <ul>{categories.map((category) => <li key={category.slug}><Link href={`/chu-de/${category.slug}`}>{category.name}</Link></li>)}</ul>
        </div>
        <div>
          <h2>Thông tin</h2>
          <ul>{legalLinks.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
        </div>
      </div>
      <div className="container footer-disclosure">
        <p><strong>Công bố tiếp thị liên kết:</strong> Một số liên kết dẫn đến nền tảng của bên thứ ba. Nếu người dùng thực hiện hành động đủ điều kiện, Thantai88sport có thể nhận hoa hồng. Liên kết thương mại không bảo đảm kết quả hoặc lợi nhuận. Nội dung cá cược chỉ dành cho người đủ tuổi theo quy định áp dụng.</p>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Thantai88sport. Bảo lưu mọi quyền.</span>
        <div><Link href="/18-plus">18+</Link><Link href="/choi-co-trach-nhiem">Chơi có trách nhiệm</Link></div>
      </div>
    </footer>
  );
}
