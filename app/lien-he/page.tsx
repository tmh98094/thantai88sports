import { ContactForm } from "@/components/contact-form";
import { InfoPage } from "@/components/info-page";
import { infoPages } from "@/lib/info-pages";
import { buildMetadata } from "@/lib/seo";

const content = infoPages["lien-he"];
export const metadata = buildMetadata({ title: "Liên hệ", description: content.description, path: "/lien-he" });
export default function ContactPage() { return <InfoPage content={content} path="/lien-he"><ContactForm /></InfoPage>; }
