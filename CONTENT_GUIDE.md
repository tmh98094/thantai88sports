# Article Publishing Guide

## Create an article

Create a Markdown file in `content/posts/`. Use a lowercase, unaccented, hyphen-separated slug, for example `cach-xem-phong-do-doi-bong.md`.

Published article copy must be written in Vietnamese even though this operational guide is in English.

```yaml
---
title: "A clear, natural article title between 20 and 90 characters"
description: "A specific summary between 70 and 180 characters that explains what the reader will learn."
category: "cam-nang"
tags: ["football", "guide"]
publishedAt: "2026-07-03"
updatedAt: "2026-07-03"
author: "Author name"
featured: false
contentType: "guide"
image: "/images/posts/article-image-name.webp"
imageAlt: "A concrete description of the image for a reader who cannot see it"
related: ["related-article-slug"]
faq:
  - question: "A genuinely useful question from the intended reader?"
    answer: "A short, direct answer that does not simply repeat the article."
---
```

Valid categories are `tin-the-thao`, `bong-da-viet-nam`, `bong-da-quoc-te`, `nhan-dinh`, and `cam-nang`.

Valid `contentType` values are `news`, `analysis`, and `guide`. Use the value that accurately describes the article; do not label evergreen guidance as news.

## SEO and editorial rules

- Write for one clear search intent. Do not stuff keywords.
- Use only one H1. The page creates it from `title`, so Markdown content must begin at H2.
- Keep the title and description accurate, distinct, useful, and consistent with the visible article.
- Cite a source and date whenever the article uses statistics, current events, rules, schedules, licensing details, health information, financial-risk guidance, or other verifiable claims.
- Prefer primary sources. Add enough context for the reader to understand what the source proves and when it was accessed.
- Add useful contextual internal links to relevant articles, category hubs, the editorial policy, or responsible-play guidance. Use descriptive anchor text.
- Clearly separate facts, analysis, opinion, and promotional content.
- Never use claims such as "guaranteed win," "guaranteed profit," or "risk free."
- iGaming content must be intended for adults aged 18 or older, explain financial risk, encourage limits, and never encourage chasing losses.
- Do not claim that a platform is licensed, legal, safe, tested, or approved unless the owner has supplied current evidence and an accountable reviewer has verified the statement.
- Identify the real author or editorial team accurately. Link to an author profile when one exists.
- Add an `updatedAt` date only after a significant, documented content update. Do not change dates merely to appear fresh.
- Keep image filenames descriptive and set `imageAlt` to a concise description of the actual image, not a list of keywords.
- Do not add raw HTML, JavaScript, event handlers, or a `javascript:` URL to Markdown.
- Add FAQ content only when it genuinely helps readers. Google no longer displays FAQ rich results, so FAQs must not be created for markup alone.

## Image contract

Every article image path must use this pattern:

```text
/images/posts/<article-slug>.webp
```

The physical file belongs at:

```text
public/images/posts/<article-slug>.webp
```

Use the exact filename listed in [docs/IMAGE_ASSETS.md](./docs/IMAGE_ASSETS.md). Generation prompts and negative constraints are documented in [docs/AI_IMAGE_PROMPTS.md](./docs/AI_IMAGE_PROMPTS.md).

## Verify content

```bash
npm run content:build
npm test
npm run build
```

The build stops when frontmatter is missing or invalid, a category or content type is unsupported, a date is malformed, an image path violates the contract, or unsafe HTML or JavaScript is found.
