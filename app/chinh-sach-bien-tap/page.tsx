import { InfoPage } from "@/components/info-page";
import { infoPages } from "@/lib/info-pages";
import { buildMetadata } from "@/lib/seo";

const content = infoPages["chinh-sach-bien-tap"];
export const metadata = buildMetadata({ title: "Chính sách biên tập", description: content.description, path: "/chinh-sach-bien-tap" });
export default function EditorialPolicyPage() { return <InfoPage content={content} path="/chinh-sach-bien-tap" />; }
