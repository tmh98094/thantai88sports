import { describe, expect, it } from "vitest";
import { GET as getHealth } from "@/app/api/health/route";
import { POST as postContact } from "@/app/api/contact/route";
import { GET as getPartner } from "@/app/go/platform/route";

describe("backend route handlers", () => {
  it("returns health and no-store headers", async () => {
    const response = await getHealth();
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toContain("no-store");
    expect((await response.json()).status).toBe("ok");
  });

  it("rejects an invalid contact payload", async () => {
    const request = new Request("https://example.com/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "bad" }),
    });
    const response = await postContact(request);
    expect(response.status).toBe(400);
  });

  it("redirects partner traffic with noindex and no-referrer headers", async () => {
    const response = await getPartner();
    expect(response.status).toBe(307);
    expect(response.headers.get("x-robots-tag")).toContain("noindex");
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
  });
});
