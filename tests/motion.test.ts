import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("GSAP scroll animation", () => {
  it("has a ScrollTrigger-based client animation layer", () => {
    const packageJson = JSON.parse(readFileSync(resolve(process.cwd(), "package.json"), "utf8"));
    const componentPath = resolve(process.cwd(), "components/gsap-scroll-effects.tsx");

    expect(packageJson.dependencies.gsap).toBeTruthy();
    expect(existsSync(componentPath)).toBe(true);

    const source = readFileSync(componentPath, "utf8");
    expect(source).toContain("ScrollTrigger");
    expect(source).toContain("scrollTrigger");
    expect(source).toContain("data-gsap");
  });
});
