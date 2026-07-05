const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
  console.warn("NEXT_PUBLIC_SITE_URL is not set. Using the Cloudflare fallback URL for this build. Set NEXT_PUBLIC_SITE_URL before final production launch.");
  process.exit(0);
}

try {
  const parsed = new URL(siteUrl);
  if (parsed.protocol !== "https:" || parsed.pathname !== "/" || parsed.hostname.endsWith(".example")) {
    throw new Error("Use an HTTPS origin with no path, for example https://your-domain.com");
  }
  console.log(`Production URL validated: ${parsed.origin}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : "NEXT_PUBLIC_SITE_URL is invalid.");
  process.exit(1);
}
