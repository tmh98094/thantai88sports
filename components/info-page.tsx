import { Breadcrumbs } from "@/components/breadcrumbs";
import type { InfoPageContent } from "@/lib/info-pages";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";

export function InfoPage({ content, path, children }: { content: InfoPageContent; path: string; children?: React.ReactNode }) {
  const breadcrumbs = breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, { name: content.title, path }]);
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }} type="application/ld+json" />
      <section className="page-hero info-hero"><div className="container"><Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: content.title }]} /><span className="eyebrow eyebrow-light">{content.eyebrow}</span><h1>{content.title}</h1><p>{content.description}</p></div></section>
      <section className="section info-section"><div className="container info-layout"><aside><span>Cập nhật gần nhất</span><strong>{content.updated}</strong><a href="#noi-dung-trang">Đọc nội dung</a></aside><div className="info-content" id="noi-dung-trang">{content.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</section>)}{children}</div></div></section>
    </>
  );
}
