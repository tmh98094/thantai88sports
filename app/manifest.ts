import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Thantai88sport",
    short_name: "T88 Sport",
    description: "Cẩm nang thể thao và góc nhìn bóng đá dành cho độc giả Việt Nam.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfcf7",
    theme_color: "#073d2d",
    lang: "vi",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
