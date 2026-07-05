import { validateContact } from "@/lib/contact";

export const dynamic = "force-dynamic";

const jsonHeaders = { "Cache-Control": "no-store", "Content-Type": "application/json; charset=utf-8" };
const maxBodyBytes = 12_000;

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxBodyBytes) return json({ ok: false, message: "Yêu cầu quá lớn.", requestId }, 413);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ ok: false, message: "Định dạng yêu cầu không được hỗ trợ.", requestId }, 415);

  let payload: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > maxBodyBytes) return json({ ok: false, message: "Yêu cầu quá lớn.", requestId }, 413);
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "Dữ liệu gửi lên không hợp lệ.", requestId }, 400);
  }

  const parsed = validateContact(payload);
  if (!parsed.success) {
    return json({ ok: false, message: "Vui lòng kiểm tra lại thông tin.", fields: parsed.error.flatten().fieldErrors, requestId }, 400);
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn(JSON.stringify({ event: "contact_unconfigured", requestId }));
    return json({ ok: false, message: "Kênh liên hệ đang được cấu hình. Vui lòng thử lại sau.", requestId }, 503);
  }

  try {
    const delivery = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, website: undefined, requestId, source: "thantai88sport" }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!delivery.ok) throw new Error(`Webhook returned ${delivery.status}`);
    console.log(JSON.stringify({ event: "contact_delivered", requestId }));
    return json({ ok: true, message: "Cảm ơn bạn. Chúng tôi đã nhận được lời nhắn.", requestId }, 200);
  } catch (error) {
    console.error(JSON.stringify({ event: "contact_delivery_failed", requestId, error: error instanceof Error ? error.message : "unknown" }));
    return json({ ok: false, message: "Chưa thể gửi lời nhắn. Vui lòng thử lại sau.", requestId }, 502);
  }
}

function json(body: object, status: number) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}
