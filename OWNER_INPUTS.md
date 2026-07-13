# Owner Inputs Required Before Launch

This file records information that is still unverified or missing. None of these items prevents local development, but every applicable launch item must be confirmed by the owner and, where appropriate, qualified legal or compliance counsel before the site is published.

Do not treat placeholder copy, development defaults, affiliate statements, legal text, author names, reviewer details, or source descriptions as verified facts.

## 1. Production domain and brand

- [ ] Confirm the canonical production origin for `NEXT_PUBLIC_SITE_URL`, for example `https://example.com`. It must use HTTPS and contain no path or trailing slash.
- [ ] Confirm the preferred brand spelling and capitalization for `Thantai88sport` and approve the final tagline.
- [ ] Supply or approve the official horizontal logo, square logo, and favicon.
- [ ] Decide whether the canonical hostname uses `www` or the apex domain, and configure a permanent redirect for the other version.
- [ ] Confirm ownership of the production domain and the Cloudflare account that will host it.

## 2. Business identity and operating responsibility

- [ ] Provide the full legal name of the person or entity responsible for publishing and operating the website.
- [ ] Provide the registered business name, registration number, jurisdiction, country, and business address where disclosure is required.
- [ ] Identify the party responsible for editorial decisions, privacy requests, legal notices, and user complaints.
- [ ] Confirm whether Thantai88sport is independent from, owned by, or otherwise commercially connected to Thantai688.
- [ ] Supply the exact legal wording required to describe that relationship without implying ownership, licensing, endorsement, or regulatory approval that has not been established.
- [ ] Confirm whether any ownership, conflict-of-interest, sponsorship, or compensation disclosure must appear on the About, editorial-policy, or affiliate pages.

## 3. Public contact details

- [ ] Replace `hello@thantai88sport.example` in `lib/site-config.ts` with a monitored public email address.
- [ ] Provide a dedicated editorial corrections email or confirm that the public contact address handles corrections.
- [ ] Provide a privacy or data-rights contact and the identity of the data controller where required.
- [ ] Provide a legal-notice contact and a service address where required.
- [ ] Confirm the expected response time for editorial corrections, privacy requests, and general contact messages.
- [ ] Configure `CONTACT_WEBHOOK_URL` if the contact form should submit to a webhook, and document who can access that service and how long submissions are retained.

## 4. Affiliate destination and commercial claims

- [x] Default partner destination supplied: `https://www.thantai688.com?f=54`.
- [ ] Confirm that this exact destination is authorized for the intended market, campaign, and traffic sources.
- [ ] Confirm the legal identity, operating jurisdiction, and current licensing or authorization status of the partner. Do not publish a licensing claim until evidence has been reviewed.
- [ ] Confirm the permitted brand name, trademarks, CTA wording, and any mandatory partner disclaimer.
- [ ] Confirm the compensation model and whether the affiliate disclosure must describe revenue share, CPA, tracking, cookies, or another arrangement in more detail.
- [ ] Provide evidence for every platform-specific claim involving safety, security, verification, payments, limits, support, promotions, or responsible-play tools.
- [ ] Confirm whether the site team has actually tested the platform. If not, all copy must avoid first-hand testing language.
- [ ] Confirm whether `PARTNER_URL` will remain the supplied default or be set as a Cloudflare variable.

## 5. Legal, market, and responsible-play review

- [ ] Obtain qualified review of the Terms, Privacy, Cookie, 18+, affiliate-disclosure, and Responsible Play pages for the actual owner, hosting setup, and target market.
- [ ] Confirm whether publishing or promoting the partner is permitted in each target jurisdiction. This includes organic search, paid traffic, social media, and affiliate activity.
- [ ] Confirm the applicable minimum age and whether "18+" is sufficient for every intended audience.
- [ ] Confirm required geo-restrictions, age gates, warning text, ad labels, and restrictions on imagery or targeting.
- [ ] Provide verified names and URLs for appropriate local responsible-gambling or mental-health support services. Do not add an unverified phone number.
- [ ] Verify the partner's age-verification, deposit-limit, loss-limit, time-limit, cooling-off, and self-exclusion processes before describing them.
- [ ] Confirm complaint, dispute, privacy, and self-exclusion escalation routes.
- [ ] Confirm the lawful basis, retention schedule, deletion process, and processor terms for contact-form and analytics data.

## 6. Authors, reviewers, and editorial accountability

- [ ] Provide the real name or approved professional byline for each author.
- [ ] Provide a biography, role, relevant experience, subject areas, and profile image for each author.
- [ ] Name the accountable editor and supply their biography and contact route.
- [ ] Name the reviewer for football analysis, platform-related claims, responsible-play guidance, and legal/compliance statements as applicable.
- [ ] Provide reviewer credentials and define which article types require review before publication.
- [ ] Confirm whether the current generic Thantai88sport editorial-team byline identifies a genuine accountable team or is only a temporary placeholder.
- [ ] Approve an AI-assistance disclosure and explain where human research, fact-checking, editing, and review occur.
- [ ] Define the correction policy, correction log, correction response time, and retraction process.

## 7. Source policy and article evidence

- [ ] Approve a primary-source list for fixtures, results, team announcements, regulations, and football data.
- [ ] Approve authoritative sources for responsible-gambling, financial-risk, privacy, and security guidance.
- [ ] Provide access dates and archived evidence for claims that may change.
- [ ] Identify articles that contain current, factual, legal, medical, financial, licensing, or platform-specific claims requiring source review before launch.
- [ ] Confirm citation style and whether external links should open in the same tab.
- [ ] Establish a review schedule for time-sensitive articles and a rule for updating or removing stale content.
- [ ] Approve the target topic and keyword plan only after the production domain and Search Console property exist.

## 8. Images and visual claims

- [ ] Generate and approve all 17 WebP files in [docs/IMAGE_ASSETS.md](./docs/IMAGE_ASSETS.md) using [docs/AI_IMAGE_PROMPTS.md](./docs/AI_IMAGE_PROMPTS.md).
- [ ] Verify exact filenames, dimensions, crop safety, compression, and output paths.
- [ ] Confirm that every depicted person is unmistakably an adult and that all imagery remains fully covered, tasteful, non-explicit, and relevant to the article topic.
- [ ] Confirm that images contain no public figure likeness, real club branding, official kit, trademark, readable odds, unverified certification, or misleading platform interface.
- [ ] Approve each final `imageAlt` description against the actual generated image.
- [ ] Confirm rights to all final logos, icons, photographs, and generated assets.

## 9. Analytics, cookies, and social profiles

- [ ] Choose Cloudflare Web Analytics, GA4, or another analytics service.
- [ ] Implement analytics only after approving the privacy disclosure and any required consent mechanism.
- [ ] Document every cookie, tracking parameter, affiliate identifier, processor, retention period, and opt-out method.
- [ ] Supply verified social profile URLs for the Organization schema and footer, if they exist.
- [ ] Confirm Search Console and Bing Webmaster Tools owners.

## 10. Cloudflare launch checklist

- [ ] Create the Worker or Workers Builds project from the repository.
- [ ] Add `NEXT_PUBLIC_SITE_URL` to Build Variables and Secrets.
- [ ] Add `CONTACT_WEBHOOK_URL` as a secret if the contact form is enabled.
- [ ] Add `PARTNER_URL` as a variable if the destination must differ from the source default.
- [ ] Connect the custom domain, verify SSL, and configure the `www`/non-`www` redirect.
- [ ] Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run cf:build`, and `npm run cf:dry-run` with production variables.
- [ ] Verify `/robots.txt`, `/sitemap.xml`, `/rss.xml`, canonical tags, Open Graph images, structured data, redirects, contact delivery, and all 17 image URLs on the deployed origin.
- [ ] Submit `/sitemap.xml` to Google Search Console and Bing Webmaster Tools after deployment.
