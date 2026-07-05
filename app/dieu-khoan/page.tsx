import { InfoPage } from "@/components/info-page";
import { infoPages } from "@/lib/info-pages";
import { buildMetadata } from "@/lib/seo";

const content = infoPages["dieu-khoan"];
export const metadata = buildMetadata({ title: "Điều khoản sử dụng", description: content.description, path: "/dieu-khoan" });
export default function TermsPage() { return <InfoPage content={content} path="/dieu-khoan" />; }
