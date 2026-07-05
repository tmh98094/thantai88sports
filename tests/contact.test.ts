import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/contact";
import { resolvePartnerUrl } from "@/lib/partner";

describe("contact validation", () => {
  const valid = { name: "Nguyễn An", email: "an@example.com", message: "Tôi muốn trao đổi về nội dung hợp tác.", consent: true, website: "" };

  it("accepts a valid Vietnamese contact request", () => {
    expect(validateContact(valid).success).toBe(true);
  });

  it("rejects bots, invalid email, missing consent, and oversized messages", () => {
    expect(validateContact({ ...valid, website: "https://spam.example" }).success).toBe(false);
    expect(validateContact({ ...valid, email: "khong-hop-le" }).success).toBe(false);
    expect(validateContact({ ...valid, consent: false }).success).toBe(false);
    expect(validateContact({ ...valid, message: "x".repeat(2001) }).success).toBe(false);
  });
});

describe("partner redirect", () => {
  it("accepts HTTPS configuration and rejects unsafe protocols", () => {
    expect(resolvePartnerUrl("https://example.com/path").toString()).toBe("https://example.com/path");
    expect(resolvePartnerUrl("javascript:alert(1)").hostname).toBe("www.thantai688.com");
  });
});
