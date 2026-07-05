import { siteConfig } from "@/lib/site-config";

export function resolvePartnerUrl(configuredUrl?: string) {
  try {
    const url = new URL(configuredUrl || siteConfig.partnerUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Unsupported partner URL protocol");
    return url;
  } catch {
    return new URL(siteConfig.partnerUrl);
  }
}
