import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] ?? character);
}

export function GET() {
  const items = getAllPosts().map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${absoluteUrl(`/tin-the-thao/${post.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/tin-the-thao/${post.slug}`)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.publishedAt}T00:00:00+07:00`).toUTCString()}</pubDate>
    </item>`).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${siteConfig.name}</title><link>${siteConfig.url}</link><description>${escapeXml(siteConfig.description)}</description><language>vi-VN</language>${items}</channel></rss>`;

  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
