import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="not-found"><div className="container"><span>404</span><h1>Trang này đã rời sân.</h1><p>Đường dẫn có thể đã thay đổi. Hãy quay về trang chủ hoặc tiếp tục khám phá thư viện nội dung thể thao.</p><div><Link className="button button-primary" href="/">Về trang chủ</Link><Link className="button button-ghost" href="/tin-the-thao">Xem bài viết <ArrowRight /></Link></div></div></section>
  );
}
