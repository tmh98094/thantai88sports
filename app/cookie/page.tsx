import { InfoPage } from "@/components/info-page";
import { infoPages } from "@/lib/info-pages";
import { buildMetadata } from "@/lib/seo";

const content = infoPages.cookie;
export const metadata = buildMetadata({ title: "Chính sách cookie", description: content.description, path: "/cookie" });
export default function CookiePage() { return <InfoPage content={content} path="/cookie" />; }
