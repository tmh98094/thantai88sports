# Thantai88sport Design Specification

## Product goal

Thantai88sport is a standalone Vietnamese sports-media and iGaming affiliate website. It attracts organic search traffic through useful sports news and evergreen guides, then directs eligible adult users to the partner platform through clear calls to action.

The project must be independently deployable from the existing Thantai88 workspace. The final handoff should require only domain/hosting configuration, environment values, and replacement of supplied image placeholders.

## Audience and language

- Primary audience: Vietnamese-speaking adults interested in football, sports news, match analysis, and legal access to entertainment platforms.
- Site language: Vietnamese only (`vi-VN`).
- Editorial tone: energetic, trustworthy, concise, and general enough to avoid unverified claims.
- Primary partner URL: `https://www.thantai688.com/?f=55`.

## Product scope

The first release contains:

- A conversion-focused homepage.
- Sports category landing pages for football, international football, Vietnamese football, match analysis, and sports guides.
- A searchable/filterable news index.
- Prerendered article pages sourced from Markdown content.
- About, contact, editorial policy, privacy, terms, cookie policy, responsible play, and 18+ pages.
- SEO infrastructure: canonical URLs, metadata, Open Graph, Twitter cards, JSON-LD, breadcrumbs, sitemap, robots.txt, RSS, semantic HTML, internal links, and clean URLs.
- Cloudflare-compatible server endpoints for contact submissions, health checks, and outbound CTA redirect tracking.
- A handoff document listing all information and assets the owner may provide later.

No authentication, betting account handling, deposits, odds feeds, live scores, or editorial CMS are included. The site is an informational affiliate publisher, not a sportsbook.

## Technical architecture

Use Next.js with TypeScript and the App Router. Static generation and incremental-friendly route design produce crawlable HTML, while Server Components keep the client bundle small. Typed Markdown content stores articles in the repository and validates frontmatter at build time. Shared layouts and components centralize SEO metadata, navigation, calls to action, image placeholders, and legal notices.

Cloudflare Workers hosts the Next.js application through the supported OpenNext adapter. Next.js route handlers provide small backend endpoints without creating a separate server:

- `/api/contact`: validates a contact form, rejects honeypot spam, and returns a structured response. It is designed to bind to an email provider later through environment configuration.
- `/api/health`: reports deployment health.
- `/go/platform`: performs a safe server redirect to the configured partner URL and applies `noindex` headers. All promotional CTAs use this internal path so the destination can be changed centrally.

The public site remains usable if dynamic endpoints are unavailable; the primary navigation and editorial content are prerendered.

## Information architecture

Top navigation:

1. Trang chủ
2. Tin thể thao
3. Bóng đá Việt Nam
4. Bóng đá quốc tế
5. Nhận định
6. Cẩm nang

Supporting pages live in the footer. Each article belongs to one category and can define tags, an author, published/updated dates, a summary, and related article slugs.

## Homepage design

The visual direction uses deep stadium green, bright field green, warm off-white, charcoal, and a restrained gold accent. Typography is bold and editorial, with clear spacing and rounded card geometry. Image areas are explicit placeholders with recommended dimensions and filenames.

Homepage sequence:

1. Utility strip with an 18+ responsible-play message.
2. Sticky header and primary CTA.
3. Hero with Vietnamese SEO copy, image placeholder, trust points, and two CTAs.
4. Featured-news grid.
5. Sports-category cards.
6. Latest articles.
7. Match-analysis promotional band.
8. Evergreen guide section.
9. Responsible-play trust section.
10. Final conversion CTA and comprehensive footer.

## Conversion and compliance

Calls to action use specific Vietnamese labels such as “Khám phá nền tảng” and “Xem ưu đãi mới”. They never promise winnings, guaranteed results, or risk-free betting. Promotions are visibly marked, users are reminded that participation is 18+, and responsible-play pages are available from all layouts.

Affiliate links are marked with `rel="sponsored nofollow noopener"` where applicable. The redirect route prevents partner URLs from being duplicated throughout content and allows future destination updates.

## SEO strategy

- One descriptive `h1` per page and a logical heading hierarchy.
- Unique titles and descriptions with sensible Vietnamese keywords, not stuffing.
- Absolute canonical URLs derived from the production site URL.
- `WebSite`, `Organization`, `NewsArticle`, `BreadcrumbList`, and `FAQPage` schema where relevant.
- Static HTML for all editorial content; JavaScript is optional enhancement only.
- Category hubs, contextual related-content links, author/date data, and clear editorial/legal pages supporting trust.
- Sitemap and RSS generated at build time.
- Redirect and API paths excluded from indexing.
- Placeholder images include dimensions, lazy-loading policy, and descriptive alt text to prevent layout shift.

## Content seed

The release includes enough original Vietnamese copy to make every template and content path demonstrable: homepage sections, category intros, legal/editorial pages, and at least six representative sports articles. Articles remain general and evergreen where factual freshness cannot be guaranteed.

## Error handling and resilience

- A custom Vietnamese 404 page retains navigation and helpful links.
- Content schemas stop builds when required editorial metadata is missing.
- Contact input is length-limited and sanitized; malformed requests return JSON errors.
- Redirect destinations are read from a trusted environment variable with a hardcoded owner-supplied fallback.
- Forms show accessible pending, success, and failure states.

## Verification

Before handoff:

- Install dependencies from a clean lockfile.
- Run linting, TypeScript checks, tests, and the production Next.js build.
- Inspect generated routes, sitemap, robots, RSS, canonical tags, structured data, and legal pages.
- Start the production preview and test representative pages and API/function logic.
- Run responsive browser inspection for desktop and mobile layouts.
- Confirm all image references are intentional placeholders and all affiliate CTAs route through `/go/platform`.

## Owner handoff

`OWNER_INPUTS.md` will list the final domain, logo/favicon, image assets, business contact details, social profiles, analytics IDs, Cloudflare environment values, and any legal text requiring local counsel. Defaults and placeholders allow deployment before those details are supplied.
