# SEO Authority and Image System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver an evidence-based SEO/topical-authority audit, English owner documentation, and a zero-code image replacement workflow with a complete AI prompt catalog.

**Architecture:** Article frontmatter and stable homepage paths form the image manifest. A reusable client component emits a crawlable image with accurate alt text when the file is present and retains a styled fallback on load failure. SEO improvements remain in focused metadata, author, content, and route modules; documentation records remaining authority work that requires ongoing publishing or verified owner information.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Markdown/YAML frontmatter, Zod, Vitest, OpenNext/Cloudflare Workers.

---

### Task 1: English owner documentation

**Files:**
- Modify: `README.md`
- Modify: `OWNER_INPUTS.md`
- Modify: `CONTENT_GUIDE.md`
- Modify: `docs/IMAGE_ASSETS.md`

- [ ] Rewrite every owner-facing section in natural English while preserving commands, variables, paths, and launch warnings.
- [ ] Run `rg -n '[À-ỹ]' README.md OWNER_INPUTS.md CONTENT_GUIDE.md docs/IMAGE_ASSETS.md` and confirm no Vietnamese prose remains.
- [ ] Verify every referenced local file exists with a PowerShell path check.

### Task 2: Tested image asset contract

**Files:**
- Modify: `components/image-placeholder.tsx`
- Modify: `components/post-card.tsx`
- Modify: `app/page.tsx`
- Modify: `app/tin-the-thao/[slug]/page.tsx`
- Modify: `app/globals.css`
- Create: `tests/image-contract.test.ts`

- [ ] Write a failing contract test:

```ts
import posts from "@/generated/posts.json";

it("assigns every post a unique WebP image matching its slug", () => {
  expect(posts.map((post) => post.image)).toEqual(
    posts.map((post) => `/images/posts/${post.slug}.webp`),
  );
});
```

- [ ] Run `npm test -- image-contract` and confirm it fails against `post-placeholder.svg`.
- [ ] Extend `ImagePlaceholder` with `src` and `alt` props, render a normal `<img src alt>` that fills the slot, and hide only that element after an `onError` event so the existing fallback remains visible.
- [ ] Pass exact homepage and article image paths into every image slot; keep the priority hint for the home hero.
- [ ] Run `npm test -- image-contract homepage` and confirm both tests pass.

### Task 3: Article and social image manifest

**Files:**
- Modify: `content/posts/*.md`
- Modify: `app/layout.tsx`
- Modify: `lib/seo.ts`
- Modify: `generated/posts.json` through `npm run content:build`

- [ ] Set every article image to `/images/posts/<slug>.webp`; retain its topic-specific Vietnamese `imageAlt`.
- [ ] Set home/social metadata to `/images/og-default.webp` and keep logo/favicon as existing vector assets.
- [ ] Build content and run the image contract test.
- [ ] Check that sitemap and Article JSON-LD expose the exact WebP URLs.

### Task 4: Technical SEO and editorial trust fixes

**Files:**
- Create: `app/tac-gia/ban-bien-tap/page.tsx`
- Modify: `app/tin-the-thao/[slug]/page.tsx`
- Modify: `lib/seo.ts`
- Modify: `app/sitemap.ts`
- Modify: `tests/seo.test.ts`
- Modify: `tests/routes.test.ts`

- [ ] Add failing tests requiring a crawlable editorial-team profile route and `author.url` to point to it.
- [ ] Implement a Vietnamese editorial-team profile with scope, review standards, correction process, and explicit placeholders only in `OWNER_INPUTS.md`, not on the indexable page.
- [ ] Link the visible article byline to that profile and align Article JSON-LD with the same URL.
- [ ] Include the profile in sitemap and breadcrumbs.
- [ ] Run SEO and route tests.

### Task 5: SEO and topical-authority audit document

**Files:**
- Create: `docs/SEO_AUDIT.md`

- [ ] Record the measured corpus: 14 posts, word ranges, category distribution, related-link graph, route count, and image state.
- [ ] Separate findings into Passed, Fixed in this change, Launch blockers, and 90-day authority roadmap.
- [ ] Cite current Google Search Central guidance for people-first content, crawlable links, article markup, and image SEO.
- [ ] Provide Vietnamese working titles for missing content while explaining strategy in English.
- [ ] Avoid claiming “SEO is guaranteed”; state what can only be validated after domain launch through Search Console and real user data.

### Task 6: Complete AI image prompt catalog

**Files:**
- Create: `docs/AI_IMAGE_PROMPTS.md`
- Modify: `docs/IMAGE_ASSETS.md`

- [ ] Document the global color palette, photorealistic style, adult age requirement, non-explicit constraints, WebP export settings, and crop-safe rules.
- [ ] Add 17 numbered prompts: one default social image, two homepage images, and fourteen article images.
- [ ] For every prompt include exact output path, filename, ratio, dimensions, prompt text, negative constraints, and Vietnamese alt text.
- [ ] Verify the catalog filenames exactly match source paths using an automated extraction comparison.

### Task 7: Final verification

**Files:**
- Modify only files proven faulty by verification.

- [ ] Run `npm run content:build`, `npm test`, `npm run lint`, and `npm run typecheck`.
- [ ] Run production `npm run build` with `NEXT_PUBLIC_SITE_URL` set to an HTTPS test origin.
- [ ] Crawl sitemap pages locally and verify status, unique title/description, one H1, canonical, JSON-LD, crawlable `<img>` markup, and expected image paths.
- [ ] Run `git diff --check` and scan all owner-facing Markdown for Vietnamese prose or unresolved drafting markers.
