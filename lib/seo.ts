import type { Metadata } from "next";
import type { Post } from "@/lib/content-schema";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildMetadata({ title, description, path, image = "/images/og-default.webp", imageAlt = title, type = "website", noIndex = false }: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageDimensions = type === "article" ? { width: 1600, height: 900 } : { width: 1200, height: 630 };
  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: absoluteUrl(image), ...imageDimensions, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl(image)] },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": post.contentType === "news" ? "NewsArticle" : "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [absoluteUrl(post.image)],
    datePublished: `${post.publishedAt}T00:00:00+07:00`,
    dateModified: `${post.updatedAt ?? post.publishedAt}T00:00:00+07:00`,
    inLanguage: "vi-VN",
    mainEntityOfPage: absoluteUrl(`/tin-the-thao/${post.slug}`),
    author: /ban biên tập/i.test(post.author)
      ? { "@type": "Organization", name: post.author, url: absoluteUrl("/tac-gia/ban-bien-tap") }
      : { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logoPath), width: 2172, height: 724 },
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.logoPath),
          width: 2172,
          height: 724,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "vi-VN",
        publisher: { "@id": `${siteConfig.url}#organization` },
        about: ["tin thể thao", "bóng đá Việt Nam", "bóng đá quốc tế", "cá cược thể thao 18+"],
      },
    ],
  };
}

export function editorialProfileJsonLd() {
  const url = absoluteUrl("/tac-gia/ban-bien-tap");
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntityOfPage: url,
    inLanguage: "vi-VN",
    mainEntity: {
      "@type": "Organization",
      name: "Ban biên tập Thantai88sport",
      url,
      description: "Đội ngũ biên tập cẩm nang thể thao, phân tích bóng đá và nội dung giải trí trực tuyến có trách nhiệm.",
      parentOrganization: { "@id": `${siteConfig.url}#organization` },
    },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
