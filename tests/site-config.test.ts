import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site-config";

describe("siteConfig", () => {
  it("uses Vietnamese and routes CTAs through the internal redirect", () => {
    expect(siteConfig.locale).toBe("vi_VN");
    expect(siteConfig.language).toBe("vi");
    expect(siteConfig.partnerPath).toBe("/go/platform");
  });
});
