import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GsapScrollEffects } from "@/components/gsap-scroll-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyAffiliateCta } from "@/components/sticky-affiliate-cta";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Thantai88sport | Cẩm nang thể thao & bóng đá", template: "%s | Thantai88sport" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["Thantai88sport", "Thantai88 Sports", "tin thể thao", "bóng đá Việt Nam", "bóng đá quốc tế", "cá cược thể thao 18+", "nhận định bóng đá"],
  authors: [{ name: "Ban biên tập Thantai88sport", url: absoluteUrl("/tac-gia/ban-bien-tap") }],
  creator: "Thantai88sport",
  publisher: "Thantai88sport",
  robots: { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: "/", types: { "application/rss+xml": [{ url: "/rss.xml", title: "RSS Thantai88sport" }] } },
  icons: { icon: "/icon.svg", apple: siteConfig.logoPath },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Thantai88sport | Cẩm nang thể thao & bóng đá",
    description: siteConfig.description,
    images: [{ url: absoluteUrl("/images/og-default.webp"), width: 1200, height: 630, alt: "Nữ biên tập viên thể thao bên sân bóng trong không gian xanh của Thantai88sport" }],
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: [absoluteUrl("/images/og-default.webp")] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light", themeColor: "#073d2d" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <GsapScrollEffects />
        <a className="skip-link" href="#noi-dung">Chuyển đến nội dung</a>
        <SiteHeader />
        <main id="noi-dung">{children}</main>
        <StickyAffiliateCta />
        <SiteFooter />
      </body>
    </html>
  );
}
