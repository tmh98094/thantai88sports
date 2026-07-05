const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
  console.error("NEXT_PUBLIC_SITE_URL is required for production builds so canonical and sitemap URLs are correct.");
  process.exit(1);
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
