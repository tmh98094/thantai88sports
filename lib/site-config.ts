const deploymentUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thantai88sports.com";

export const siteConfig = {
  name: "Thantai88sport",
  shortName: "T88 Sport",
  description:
    "Cẩm nang thể thao, góc nhìn bóng đá và nội dung giải trí trực tuyến có trách nhiệm dành cho độc giả Việt Nam.",
  locale: "vi_VN",
  language: "vi",
  partnerPath: "/go/platform",
  partnerInfoPath: "/ca-cuoc-the-thao",
  partnerUrl: "https://www.thantai688.com/?f=55",
  logoPath: "/images/logo.png",
  url: deploymentUrl,
  contactEmail: "hello@thantai88sport.example",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
