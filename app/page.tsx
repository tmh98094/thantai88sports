import Link from "next/link";
import { ArrowRight, ArrowUpRight, BallIcon, ShieldIcon } from "@/components/icons";
import { CategoryCard } from "@/components/category-card";
import { CtaBanner } from "@/components/cta-banner";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { PartnerLink } from "@/components/partner-link";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { categories, getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { serializeJsonLd, websiteJsonLd } from "@/lib/seo";

export default function HomePage() {
  const featured = getFeaturedPosts();
  const latest = getAllPosts().slice(0, 6);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd()) }} type="application/ld+json" />
      <section className="hero-section">
        <div className="hero-lines" />
        <div className="container hero-grid">
          <div className="hero-copy" data-gsap="reveal">
            <span className="eyebrow"><span className="live-dot" /> Cửa vào thể thao & iGaming 18+</span>
            <h1>Vào <em>nền tảng,</em><br />đọc nhanh trước<br />khi chơi.</h1>
            <p className="hero-lead">
              Thantai88sport thuộc hệ sinh thái <a href="https://thantai88.online" rel="noopener noreferrer">Thantai88</a>, kết hợp tin thể thao tiếng Việt, lối tắt vào trang chơi và lưu ý 18+ trước khi tham gia.
            </p>
            <div className="hero-actions">
              <PartnerLink>Vào nền tảng Thantai688</PartnerLink>
              <Link className="button button-ghost" href="/ca-cuoc-the-thao">Lưu ý trước khi chơi <ArrowRight /></Link>
            </div>
            <div className="hero-trust">
              <span><ShieldIcon /> Nội dung minh bạch</span>
              <span><BallIcon /> Góc nhìn thể thao chọn lọc</span>
              <span className="trust-18">18+</span>
            </div>
          </div>
          <div className="hero-visual" data-gsap="reveal">
            <ImagePlaceholder alt="Nữ biên tập viên thể thao Việt Nam tại sân vận động" label="hero-stadium-1600x2000.webp" priority ratio="hero" src="/images/home/hero-stadium-1600x2000.webp" />
            <div className="hero-score-card" data-gsap="lift">
              <span className="score-label">LỐI TẮT 18+</span>
              <strong>Chuyển đến nền tảng đối tác chỉ với một nút bấm</strong>
              <PartnerLink className="text-link" showIcon={false}>Vào ngay <ArrowUpRight /></PartnerLink>
            </div>
          </div>
        </div>
        <div className="container hero-ticker">
          <span className="ticker-title">ĐANG ĐƯỢC QUAN TÂM</span>
          <div className="ticker-items">
            {latest.slice(0, 3).map((post, index) => <Link href={`/tin-the-thao/${post.slug}`} key={post.slug}><b>0{index + 1}</b>{post.title}</Link>)}
          </div>
        </div>
      </section>

      <section className="section section-featured" data-gsap="reveal">
        <div className="container">
          <SectionHeading eyebrow="Tiêu điểm" title="Câu chuyện đáng đọc" description="Bài phân tích và cẩm nang nổi bật do ban biên tập lựa chọn." href="/tin-the-thao" />
          <div className="featured-grid">
            {featured[0] ? <PostCard featured post={featured[0]} /> : null}
            <div className="featured-stack">{featured.slice(1, 3).map((post) => <PostCard key={post.slug} post={post} />)}</div>
          </div>
        </div>
      </section>

      <section className="section section-categories" data-gsap="reveal">
        <div className="container">
          <SectionHeading eyebrow="Khám phá theo chủ đề" title="Mỗi góc nhìn, một nhịp thể thao" description="Từ sân cỏ trong nước đến những xu hướng chiến thuật quốc tế." />
          <div className="category-grid">{categories.map((category, index) => <CategoryCard category={category} index={index} key={category.slug} />)}</div>
        </div>
      </section>

      <section className="section section-latest" data-gsap="reveal">
        <div className="container">
          <SectionHeading eyebrow="Thư viện nội dung" title="Cẩm nang & bài phân tích" href="/tin-the-thao" />
          <div className="posts-grid">{latest.map((post) => <PostCard key={post.slug} post={post} />)}</div>
        </div>
      </section>

      <section className="section section-analysis">
        <div className="container analysis-panel" data-gsap="reveal">
          <div className="analysis-copy">
            <span className="eyebrow eyebrow-light">Phân tích trước trận</span>
            <h2>Không chỉ nhìn tỷ số.<br />Hãy đọc cả thế trận.</h2>
            <p>Phong độ, lực lượng, lịch thi đấu và cách vận hành—mọi yếu tố đều cần được đặt trong đúng bối cảnh.</p>
            <Link className="button button-light" href="/chu-de/nhan-dinh">Xem chuyên mục nhận định <ArrowRight /></Link>
          </div>
          <div className="analysis-visual"><ImagePlaceholder alt="Nữ chuyên gia phân tích sơ đồ chiến thuật bóng đá" label="analysis-board-1200x1200.webp" ratio="square" src="/images/home/analysis-board-1200x1200.webp" /></div>
        </div>
      </section>

      <section className="section responsible-section">
        <div className="container responsible-panel" data-gsap="reveal">
          <div className="responsible-icon"><ShieldIcon /></div>
          <div>
            <span className="eyebrow">Giải trí an toàn</span>
            <h2>Thể thao để tận hưởng.<br />Giới hạn để an tâm.</h2>
          </div>
          <div className="responsible-copy">
            <p>Chỉ sử dụng số tiền bạn có thể chấp nhận mất mà không ảnh hưởng đến chi tiêu thiết yếu; không theo đuổi khoản đã thua.</p>
            <Link className="text-link" href="/choi-co-trach-nhiem">Tìm hiểu chơi có trách nhiệm <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="section section-final-cta"><div className="container" data-gsap="reveal"><CtaBanner /></div></section>
    </>
  );
}
