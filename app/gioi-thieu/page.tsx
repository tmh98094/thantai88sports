import { InfoPage } from "@/components/info-page";
import { infoPages } from "@/lib/info-pages";
import { buildMetadata } from "@/lib/seo";

const content = infoPages["gioi-thieu"];
export const metadata = buildMetadata({ title: "Giới thiệu", description: content.description, path: "/gioi-thieu" });
export default function AboutPage() { return <InfoPage content={content} path="/gioi-thieu" />; }
