import { InfoPage } from "@/components/info-page";
import { infoPages } from "@/lib/info-pages";
import { buildMetadata } from "@/lib/seo";

const content = infoPages["choi-co-trach-nhiem"];
export const metadata = buildMetadata({ title: "Chơi có trách nhiệm", description: content.description, path: "/choi-co-trach-nhiem" });
export default function ResponsiblePlayPage() { return <InfoPage content={content} path="/choi-co-trach-nhiem" />; }
