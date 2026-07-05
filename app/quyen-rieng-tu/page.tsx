import { InfoPage } from "@/components/info-page";
import { infoPages } from "@/lib/info-pages";
import { buildMetadata } from "@/lib/seo";

const content = infoPages["quyen-rieng-tu"];
export const metadata = buildMetadata({ title: "Chính sách quyền riêng tư", description: content.description, path: "/quyen-rieng-tu" });
export default function PrivacyPage() { return <InfoPage content={content} path="/quyen-rieng-tu" />; }
