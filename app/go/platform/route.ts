import { resolvePartnerUrl } from "@/lib/partner";

export const dynamic = "force-dynamic";

export function GET() {
  return new Response(null, {
    status: 307,
    headers: {
      Location: resolvePartnerUrl(process.env.PARTNER_URL).toString(),
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
