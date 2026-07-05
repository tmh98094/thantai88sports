# SEO Authority and Image System Design

## Objective

Improve the current Vietnamese sports/iGaming website so that its technical SEO, topical structure, editorial trust signals, internal linking, and image implementation are ready for a production launch. Replace every owner-facing Vietnamese Markdown guide with English documentation. Provide a complete English prompt catalog for generating production images with exact filenames.

## Approved assumptions

- The website content remains Vietnamese; owner/developer documentation is English.
- All photographic assets feature a clearly adult woman aged 25 or older. Styling is glamorous and confident but tasteful, non-explicit, and suitable for mainstream advertising.
- The visual palette is deep stadium green (`#042B21`, `#073D2D`), field green (`#0AA85E`, `#11C66D`), lime (`#B7F26C`), gold (`#E8BC62`), and warm white (`#FBFCF7`).
- Generated assets use WebP. Article images are 16:9 at 1600×900; the home hero is 4:5 at 1600×2000; the analysis image is 1:1 at 1200×1200; the default social image is 1.91:1 at 1200×630.
- Logo and favicon remain graphic brand assets rather than photographic images.

## Chosen approach

Use an explicit image contract rather than manual code replacement or runtime filesystem discovery.

1. Every Markdown article points to `/images/posts/<slug>.webp` before the real file exists.
2. Homepage slots point to stable paths under `/images/home/`.
3. A client-side image component renders a normal crawlable `<img src>` when the asset loads and preserves the existing styled fallback when it does not.
4. The prompt catalog lists every expected path, filename, dimensions, ratio, prompt, negative constraints, and alt-text intent.
5. Once the owner places the generated files at those paths, the website updates without code changes.

This approach provides the best balance of zero-touch asset replacement, crawlable image markup, accessible alt text, and safe local development before assets exist.

## SEO audit and improvement scope

- Validate crawlability, robots rules, canonical URLs, metadata, sitemap, RSS, structured data, status codes, and redirect indexing behavior.
- Measure article depth, category balance, topical clusters, intent overlap, internal-link distribution, author/reviewer signals, sourcing, and freshness.
- Fix high-confidence structural problems found by the audit.
- Document gaps that require real-world information, editorial expertise, legal review, or ongoing publishing rather than fabricating evidence.
- Create an English `SEO_AUDIT.md` containing evidence, pass/fail status, priorities, and a content roadmap.

## Documentation deliverables

- `README.md`: English setup and deployment guide.
- `OWNER_INPUTS.md`: English launch checklist.
- `CONTENT_GUIDE.md`: English editorial workflow.
- `docs/IMAGE_ASSETS.md`: English implementation instructions.
- `docs/AI_IMAGE_PROMPTS.md`: complete prompt and filename catalog.
- `docs/SEO_AUDIT.md`: technical SEO and topical-authority audit.

## Safety and quality constraints for images

Every prompt must explicitly say “adult woman, age 25+” and “non-explicit, fully covered editorial wardrobe.” Images must not imply guaranteed gambling success, show minors, use school/youth styling, contain nudity, fetish content, intoxication, distress, piles of cash, winning claims, recognizable team trademarks, or legible betting odds. The woman should be secondary to the article topic when topic clarity would otherwise suffer.

## Verification

- Unit tests cover image-path contracts, fallbacks, metadata, and content relations.
- Content build validates image paths and related slugs.
- Production build emits every intended route.
- A local crawl checks titles, descriptions, canonicals, H1s, JSON-LD, image markup, sitemap coverage, and internal links.
- The final audit distinguishes completed technical work from ongoing authority-building work.
