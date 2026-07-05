import Link from "next/link";
import { PartnerLink } from "@/components/partner-link";
import type { Post } from "@/lib/content-schema";

export function ArticleBody({ post }: { post: Post }) {
  return (
    <div className="article-content">
      <div className="article-disclaimer">
        <strong>Lưu ý biên tập</strong>
        <p>Nội dung mang tính thông tin và tham khảo. Không có phân tích nào bảo đảm kết quả thể thao hoặc lợi nhuận.</p>
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      <aside className="article-inline-cta">
        <span>LIÊN KẾT ĐỐI TÁC DÀNH CHO NGƯỜI TRƯỞNG THÀNH</span>
        <h2>Muốn thao tác thật? Vào nền tảng Thantai688</h2>
        <p>Bài viết này giúp bạn nắm bối cảnh trước khi quyết định. Nếu muốn chuyển sang website đối tác, hãy dùng nút bên dưới và tự đặt giới hạn trước khi tham gia.</p>
        <PartnerLink>Vào nền tảng ngay (18+)</PartnerLink>
        <small>Liên kết tiếp thị liên kết · Chơi có trách nhiệm · Kiểm tra điều khoản và quy định áp dụng</small>
      </aside>
      {post.faq.length ? (
        <section className="article-faq">
          <h2>Câu hỏi thường gặp</h2>
          {post.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
        </section>
      ) : null}
      <div className="article-responsible-note">
        <p>Nếu hoạt động giải trí không còn vui hoặc ảnh hưởng tài chính, hãy dừng lại và tìm hỗ trợ.</p>
        <Link href="/choi-co-trach-nhiem">Xem hướng dẫn chơi có trách nhiệm</Link>
      </div>
    </div>
  );
}
