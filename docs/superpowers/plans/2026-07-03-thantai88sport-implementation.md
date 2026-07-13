# Thantai88sport Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Vietnamese Next.js sports-media and iGaming affiliate site with prerendered editorial content, trustworthy conversion pages, backend route handlers, and a verified Cloudflare Workers deployment bundle.

**Architecture:** Next.js App Router pages consume a build-generated, typed JSON index compiled from Markdown posts. Server Components render all important content to HTML. Route handlers validate contact requests, provide health status, generate RSS, and centralize partner redirects; OpenNext adapts the application to Cloudflare Workers.

**Tech Stack:** Next.js 16, React 19, TypeScript, Markdown, Zod, Vitest, ESLint, `@opennextjs/cloudflare`, Wrangler 4.

---

## File map

- `app/`: layouts, pages, metadata routes, API handlers, RSS, and partner redirect.
- `components/`: focused visual and interactive units (header, footer, cards, forms, placeholders, CTA).
- `content/posts/`: owner-editable Vietnamese Markdown articles.
- `lib/`: site configuration, generated-content access, metadata/schema helpers, and input validation.
- `scripts/build-content.ts`: validates Markdown frontmatter and emits `generated/posts.json` before builds.
- `tests/`: unit tests for content, SEO, validation, and route behavior.
- `public/`: favicon/manifest defaults and explicit image placeholder instructions.
- `wrangler.jsonc` and `open-next.config.ts`: Cloudflare Workers deployment.
- `OWNER_INPUTS.md`: all owner-provided values/assets that can be supplied later.

### Task 1: Project foundation

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `vitest.config.ts`, `.gitignore`, `.env.example`
- Create: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`

- [ ] **Step 1: Add a failing smoke test**

```ts
// tests/site-config.test.ts
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site-config";

describe("siteConfig", () => {
  it("uses Vietnamese and routes CTAs through the internal redirect", () => {
    expect(siteConfig.locale).toBe("vi_VN");
    expect(siteConfig.partnerPath).toBe("/go/platform");
  });
});
```

- [ ] **Step 2: Run `npm test -- site-config` and confirm it fails because `lib/site-config.ts` does not exist.**

- [ ] **Step 3: Create the package/config foundation and minimal site config.**

```ts
// lib/site-config.ts
export const siteConfig = {
  name: "Thantai88sport",
  locale: "vi_VN",
  language: "vi",
  partnerPath: "/go/platform",
  partnerUrl: "https://www.thantai688.com?f=54",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thantai88sport.example",
} as const;
```

- [ ] **Step 4: Install dependencies and run the smoke test until it passes.**
- [ ] **Step 5: Commit with `chore: scaffold Next.js sports site`.**

### Task 2: Typed Markdown content pipeline

**Files:**
- Create: `lib/content-schema.ts`, `lib/posts.ts`, `scripts/build-content.ts`, `generated/posts.json`
- Create: `content/posts/*.md` (at least six Vietnamese seed articles)
- Test: `tests/content.test.ts`

- [ ] **Step 1: Write tests that require unique slugs, valid ISO dates, nonempty Vietnamese summaries, known categories, and descending publication order.**

```ts
import { describe, expect, it } from "vitest";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

describe("post index", () => {
  it("contains unique resolvable posts sorted newest first", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(6);
    expect(new Set(posts.map((post) => post.slug)).size).toBe(posts.length);
    expect(posts.every((post) => getPostBySlug(post.slug))).toBe(true);
    expect(posts.map((post) => post.publishedAt)).toEqual(
      [...posts].map((post) => post.publishedAt).sort().reverse(),
    );
  });
});
```

- [ ] **Step 2: Run the test and confirm failure due to missing post helpers.**
- [ ] **Step 3: Implement Zod frontmatter validation and a build script that turns controlled Markdown into JSON containing metadata and sanitized HTML.**
- [ ] **Step 4: Add six original Vietnamese posts across football, Vietnam football, analysis, and guide categories; generate the index.**
- [ ] **Step 5: Run tests and inspect `generated/posts.json` for complete metadata and HTML.**
- [ ] **Step 6: Commit with `feat: add typed Vietnamese editorial content`.**

### Task 3: Design system and conversion components

**Files:**
- Create: `components/site-header.tsx`, `components/site-footer.tsx`, `components/hero.tsx`, `components/post-card.tsx`, `components/category-card.tsx`, `components/cta-banner.tsx`, `components/image-placeholder.tsx`, `components/breadcrumbs.tsx`, `components/mobile-menu.tsx`
- Modify: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Add a render test asserting the homepage has one H1, an 18+ notice, visible sports categories, and internal `/go/platform` CTAs.**
- [ ] **Step 2: Run the test and confirm it fails against the minimal homepage.**
- [ ] **Step 3: Build the dark stadium-green visual system, sticky navigation, responsive hero, card grids, placeholder media blocks, trust strip, responsible-play panel, and footer.**
- [ ] **Step 4: Ensure interactive navigation is keyboard-accessible and client JavaScript is limited to menu/form/search enhancements.**
- [ ] **Step 5: Run tests, linting, and a mobile/desktop visual pass.**
- [ ] **Step 6: Commit with `feat: build sports conversion homepage`.**

### Task 4: Editorial routes and technical SEO

**Files:**
- Create: `app/tin-the-thao/page.tsx`, `app/tin-the-thao/[slug]/page.tsx`, `app/chu-de/[slug]/page.tsx`
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/rss.xml/route.ts`, `app/not-found.tsx`
- Create: `components/article-search.tsx`, `components/article-body.tsx`, `lib/seo.ts`, `lib/categories.ts`
- Test: `tests/seo.test.ts`, `tests/routes.test.ts`

- [ ] **Step 1: Add tests for canonical URL construction, unique metadata, Article/Breadcrumb schema, sitemap coverage, RSS XML, and unknown-slug 404 behavior.**
- [ ] **Step 2: Run the tests and confirm expected failures.**
- [ ] **Step 3: Implement the news index, category hubs, prerendered article routes, contextual related links, author/date blocks, and accessible client-side filtering.**
- [ ] **Step 4: Implement Next.js metadata APIs plus `Organization`, `WebSite`, `NewsArticle`, `BreadcrumbList`, and applicable FAQ schema.**
- [ ] **Step 5: Add sitemap, robots, manifest, RSS, and custom 404 routes; exclude APIs and partner redirects from indexing.**
- [ ] **Step 6: Run unit tests and a production build, then inspect generated HTML for canonical, description, H1, JSON-LD, and internal links.**
- [ ] **Step 7: Commit with `feat: add editorial routes and SEO infrastructure`.**

### Task 5: Backend endpoints

**Files:**
- Create: `lib/contact.ts`, `app/api/contact/route.ts`, `app/api/health/route.ts`, `app/go/platform/route.ts`, `components/contact-form.tsx`
- Test: `tests/contact.test.ts`, `tests/api-routes.test.ts`

- [ ] **Step 1: Test that contact input rejects honeypots, malformed emails, oversized payloads, and missing consent while accepting a minimal valid Vietnamese request.**

```ts
expect(validateContact({ name: "An", email: "an@example.com", message: "Xin chào", consent: true, website: "" }).success).toBe(true);
expect(validateContact({ name: "Bot", email: "bad", message: "x", consent: false, website: "spam" }).success).toBe(false);
```

- [ ] **Step 2: Run the validation tests and confirm failure because the validator is absent.**
- [ ] **Step 3: Implement strict Zod validation, request content-length guards, structured JSON responses, optional webhook delivery, and a cryptographically secure request ID.**
- [ ] **Step 4: Implement `/api/health` and `/go/platform` with `no-store`, `noindex`, safe configured destinations, and the supplied URL as fallback.**
- [ ] **Step 5: Test route status codes, headers, fallback behavior, and redirects.**
- [ ] **Step 6: Commit with `feat: add Cloudflare-ready backend routes`.**

### Task 6: Trust, legal, and owner handoff pages

**Files:**
- Create: `app/gioi-thieu/page.tsx`, `app/lien-he/page.tsx`, `app/chinh-sach-bien-tap/page.tsx`, `app/quyen-rieng-tu/page.tsx`, `app/dieu-khoan/page.tsx`, `app/cookie/page.tsx`, `app/choi-co-trach-nhiem/page.tsx`, `app/18-plus/page.tsx`
- Create: `OWNER_INPUTS.md`, `CONTENT_GUIDE.md`, `public/images/README.md`

- [ ] **Step 1: Add route coverage tests requiring every trust/legal page to export unique metadata and render a Vietnamese H1.**
- [ ] **Step 2: Implement concise, non-deceptive Vietnamese copy for every page, with affiliate disclosure and 18+ responsible-play language in global navigation.**
- [ ] **Step 3: Document exact image filenames/dimensions, domain and contact placeholders, analytics, webhook, legal review, and Cloudflare variables in `OWNER_INPUTS.md`.**
- [ ] **Step 4: Add an editorial workflow in `CONTENT_GUIDE.md` with frontmatter schema and commands for adding a post.**
- [ ] **Step 5: Run route and copy scans for prohibited guarantees or missing affiliate disclosures.**
- [ ] **Step 6: Commit with `feat: add trust pages and deployment handoff`.**

### Task 7: Cloudflare Workers packaging

**Files:**
- Create: `open-next.config.ts`, `wrangler.jsonc`, `cloudflare-env.d.ts`
- Modify: `package.json`, `README.md`

- [ ] **Step 1: Install current `@opennextjs/cloudflare` and Wrangler 4, using the compatibility date `2026-07-03` and `nodejs_compat`.**
- [ ] **Step 2: Configure `.open-next/worker.js`, `.open-next/assets`, observability, and generated bindings according to the current Cloudflare Next.js guide.**

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "thantai88sport",
  "main": ".open-next/worker.js",
  "compatibility_date": "2026-07-03",
  "compatibility_flags": ["nodejs_compat"],
  "assets": { "directory": ".open-next/assets", "binding": "ASSETS" },
  "observability": { "enabled": true, "head_sampling_rate": 1 }
}
```

- [ ] **Step 3: Run Wrangler type generation and verify generated bindings compile without hand-written `Env` casts.**
- [ ] **Step 4: Run the OpenNext build and `wrangler deploy --dry-run`; confirm Worker and static assets are emitted successfully.**
- [ ] **Step 5: Document Workers Builds commands, custom-domain steps, secrets, and environment variables without deploying or requiring account credentials.**
- [ ] **Step 6: Commit with `build: add Cloudflare Workers deployment`.**

### Task 8: Completion audit and visual verification

**Files:**
- Modify only files proven faulty by verification.

- [ ] **Step 1: Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run cf:build`, and `npm run cf:dry-run`.**
- [ ] **Step 2: Start the local application and inspect homepage, index, category, article, contact, responsible-play, and 404 pages at mobile and desktop widths.**
- [ ] **Step 3: Crawl local HTML to verify status codes, canonical URLs, unique titles/descriptions/H1s, JSON-LD validity, internal links, sitemap, robots, RSS, and CTA redirect headers.**
- [ ] **Step 4: Scan the repository for missing owner placeholders, accidental secrets, broken image references, English user-facing copy, and direct partner URLs outside configuration/docs.**
- [ ] **Step 5: Fix discovered defects and rerun every affected verification command.**
- [ ] **Step 6: Commit with `test: verify production website handoff`.**
