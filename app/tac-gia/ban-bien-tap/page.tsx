import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { breadcrumbJsonLd, buildMetadata, editorialProfileJsonLd, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ban biên tập Thantai88sport",
  description: "Tìm hiểu phạm vi chuyên môn, quy trình kiểm chứng, tiêu chuẩn cập nhật và cách liên hệ Ban biên tập Thantai88sport.",
  path: "/tac-gia/ban-bien-tap",
});

export default function EditorialTeamPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Trang chủ", path: "/" },
    { name: "Ban biên tập", path: "/tac-gia/ban-bien-tap" },
  ]);
  const schemas = [breadcrumbs, editorialProfileJsonLd()];

  return (
    <>
      {schemas.map((schema, index) => <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} key={index} type="application/ld+json" />)}
      <section className="page-hero info-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Ban biên tập" }]} />
          <span className="eyebrow eyebrow-light">Đội ngũ nội dung</span>
          <h1>Ban biên tập Thantai88sport</h1>
          <p>Nhóm phụ trách cẩm nang thể thao, phân tích bóng đá và nội dung giải trí trực tuyến có trách nhiệm dành cho độc giả Việt Nam.</p>
        </div>
      </section>
      <section className="section info-section">
        <div className="container info-layout">
          <aside><span>Cập nhật gần nhất</span><strong>03/07/2026</strong><a href="#pham-vi">Đọc nội dung</a></aside>
          <div className="info-content" id="pham-vi">
            <section>
              <h2>Phạm vi biên tập</h2>
              <p>Ban biên tập xây dựng nội dung nền tảng về bóng đá Việt Nam, bóng đá quốc tế, phương pháp đọc trận đấu và các nguyên tắc quản lý rủi ro khi tiếp cận cá cược thể thao. Chúng tôi không trình bày nhận định như kết quả chắc chắn hoặc lời khuyên tài chính.</p>
            </section>
            <section>
              <h2>Cách bài viết được chuẩn bị</h2>
              <p>Mỗi bài cần có mục đích tìm kiếm rõ ràng, cấu trúc dễ kiểm tra và ngôn ngữ phân biệt giữa dữ kiện, diễn giải và quan điểm. Thông tin thay đổi theo thời gian phải được đối chiếu với nguồn chính thức hoặc nguồn chuyên môn phù hợp trước khi cập nhật.</p>
              <ul><li>Kiểm tra tiêu đề, mô tả và nội dung có cùng mục đích.</li><li>Ghi ngày xuất bản và ngày cập nhật khi có thay đổi đáng kể.</li><li>Không đưa ra tuyên bố bảo đảm thắng, lợi nhuận hoặc an toàn tuyệt đối.</li></ul>
            </section>
            <section>
              <h2>Rà soát nội dung nhạy cảm</h2>
              <p>Nội dung liên quan đến tiền bạc, hành vi cá cược và sức khỏe tinh thần cần ưu tiên nguồn có thẩm quyền. Những bài này chỉ mang tính giáo dục chung; độc giả nên tìm chuyên gia đủ năng lực khi cần tư vấn cá nhân.</p>
            </section>
            <section>
              <h2>Sửa lỗi và liên hệ</h2>
              <p>Khi một sai sót làm thay đổi ý nghĩa bài viết, chúng tôi sẽ sửa nội dung và cập nhật ngày chỉnh sửa. Độc giả có thể gửi đường dẫn, nội dung cần xem lại và nguồn đối chiếu qua <Link href="/lien-he">trang liên hệ</Link>. Xem thêm <Link href="/chinh-sach-bien-tap">chính sách biên tập</Link> để biết tiêu chuẩn áp dụng.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
