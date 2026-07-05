import { InfoPage } from "@/components/info-page";
import { infoPages } from "@/lib/info-pages";
import { buildMetadata } from "@/lib/seo";

const content = infoPages["18-plus"];
export const metadata = buildMetadata({ title: "Nội dung 18+", description: content.description, path: "/18-plus" });
export default function AgePage() { return <InfoPage content={content} path="/18-plus" />; }
