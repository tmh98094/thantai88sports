import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerLink } from "@/components/partner-link";
import { ShieldIcon } from "@/components/icons";
import { breadcrumbJsonLd, buildMetadata, serializeJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nền tảng cá cược thể thao dành cho người trưởng thành",
  description: "Thông tin minh bạch trước khi truy cập nền tảng cá cược thể thao của đối tác: liên kết thương mại, rủi ro, giới hạn và điều khoản cần kiểm tra.",
  path: "/ca-cuoc-the-thao",
});

export default function SportsBettingPage() {
  const jsonLd = breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, { name: "Nền tảng cá cược thể thao", path: "/ca-cuoc-the-thao" }]);
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} type="application/ld+json" />
      <section className="page-hero betting-hero"><div className="container"><Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Nền tảng cá cược thể thao" }]} /><span className="eyebrow eyebrow-light">Liên kết đối tác · 18+</span><h1>Trước khi truy cập nền tảng cá cược thể thao</h1><p>Hiểu rõ bạn sẽ rời Thantai88sport, cách liên kết thương mại hoạt động và những giới hạn cần đặt trước khi tham gia.</p></div></section>
      <section className="section betting-section"><div className="container betting-grid">
        <div className="betting-main">
          <section><span className="eyebrow">Thông tin quan trọng</span><h2>Bạn sẽ chuyển đến website của bên thứ ba</h2><p>Nút bên dưới dẫn đến Thantai688, một nền tảng cá cược thể thao do bên thứ ba vận hành. Thantai88sport không xử lý tài khoản, tiền gửi, tiền rút, tỷ lệ cược hoặc kết quả giao dịch của bạn.</p><p>Đây là liên kết tiếp thị liên kết. Nếu người dùng thực hiện hành động đủ điều kiện, Thantai88sport có thể nhận hoa hồng. Việc này không tạo ra cam kết về kết quả hoặc lợi nhuận.</p></section>
          <section><h2>Kiểm tra trước khi đăng ký</h2><div className="check-grid"><article><strong>01</strong><h3>Điều kiện tham gia</h3><p>Xác nhận độ tuổi, khu vực được phép, quy trình xác minh danh tính và mọi hạn chế áp dụng.</p></article><article><strong>02</strong><h3>Điều khoản ưu đãi</h3><p>Đọc yêu cầu, giới hạn thời gian, điều kiện doanh thu và trường hợp ưu đãi không áp dụng.</p></article><article><strong>03</strong><h3>Kiểm soát rủi ro</h3><p>Tìm giới hạn nạp, giới hạn thời gian, thời gian nghỉ và công cụ tự loại trừ trước khi tham gia.</p></article><article><strong>04</strong><h3>Dữ liệu & hỗ trợ</h3><p>Đọc chính sách quyền riêng tư, kênh hỗ trợ và quy trình giải quyết khiếu nại của nền tảng.</p></article></div></section>
          <section><h2>Cá cược luôn có nguy cơ thua tiền</h2><p>Không sử dụng tiền dành cho sinh hoạt, tiết kiệm hoặc trả nợ. Không vay tiền, không theo đuổi khoản đã thua và không nâng giới hạn khi đang phấn khích hoặc căng thẳng.</p><Link className="text-link" href="/choi-co-trach-nhiem">Đọc hướng dẫn chơi có trách nhiệm →</Link></section>
        </div>
        <aside className="betting-conversion"><div className="betting-shield"><ShieldIcon /></div><span>CHỈ DÀNH CHO NGƯỜI ĐỦ TUỔI</span><h2>Truy cập Thantai688 (18+)</h2><p>Bạn sẽ rời Thantai88sport và chuyển đến nền tảng cá cược thể thao do bên thứ ba vận hành.</p><PartnerLink className="button button-primary" direct>Tiếp tục đến Thantai688</PartnerLink><small>Liên kết tiếp thị liên kết · Cá cược có nguy cơ thua tiền · Hãy kiểm tra điều khoản và quy định áp dụng.</small></aside>
      </div></section>
    </>
  );
}
