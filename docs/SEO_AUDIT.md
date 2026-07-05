# SEO and Topical Authority Audit

Audit date: 3 July 2026  
Scope: the 14 Vietnamese articles in `content/posts`, their editorial signals, image contract, and the indexable route structure.

This document separates measured facts, implementation changes in this branch, launch blockers, and future recommendations. It does not promise rankings, traffic, rich results, or inclusion in Google News.

## Executive verdict

Thantai88sport has a sound technical and editorial foundation for an evergreen Vietnamese sports-analysis and responsible-gambling website. The current corpus is readable, consistently structured, cautious about betting risk, and focused enough to form the start of several useful content clusters.

It is not yet a sports newsroom and should not be described as one. None of the current posts is a current match report, result, transfer update, injury update, or other time-sensitive news report. The strongest accurate launch position is therefore **evergreen sports guides, football analysis, and responsible adult betting education**.

Topical authority is also incomplete. The site has only 14 articles, most search intent is informational, there are no citations inside article bodies, and the highest-risk gambling and behavioral-safety pages do not yet show named specialist review or verified Vietnam-specific support sources. Google recommends original, substantial, well-sourced, people-first content with clear evidence of who created it, how it was created, and why. Trust is especially important for topics that can affect financial stability or safety. See [Google's people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

The launch objective should be accuracy and usefulness, not publishing volume. Google explicitly warns that generating many pages without adding value may violate its scaled-content policies; AI assistance is not itself a substitute for reporting, expert review, or original analysis. See [Google's guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).

## Measured baseline

### Corpus

- 14 Markdown posts.
- 13,358 body words in total.
- Average body length: 954 words.
- Range: 838 to 991 words.
- Publication-date range: 8 June to 3 July 2026.
- 14 posts use the same organizational byline: `Ban biên tập Thantai88sport`.
- 0 posts currently declare an `updatedAt` value.
- 0 contextual Markdown links occur inside article bodies.
- 23 frontmatter `related` relationships, an average of 1.64 per article.
- 19 FAQ questions across 12 articles.
- Baseline sitemap: 30 indexable URLs: 11 static pages, 5 topic archives, and 14 articles. The editorial-team profile added in this change increases the intended sitemap count by one.

### Category distribution

| Category | Articles | Share |
| --- | ---: | ---: |
| `cam-nang` | 6 | 42.9% |
| `nhan-dinh` | 3 | 21.4% |
| `bong-da-viet-nam` | 2 | 14.3% |
| `bong-da-quoc-te` | 2 | 14.3% |
| `tin-the-thao` | 1 | 7.1% |

### Search-intent distribution

- 13 informational guides or explanatory articles.
- 1 commercial-investigation guide about evaluating a betting platform.
- 0 current news reports.
- 0 current match previews, live reports, or result reports.
- 0 transactional articles.

### Related-link graph

Five articles receive no incoming frontmatter `related` reference:

- `cach-chon-nguon-tin-the-thao-dang-tin-cay.md`
- `cach-theo-doi-chien-thuat-bong-da-quoc-te.md`
- `loi-the-san-nha-bong-da-viet-nam.md`
- `phan-tich-lich-thi-dau-va-the-luc.md`
- `tieu-chi-chon-nen-tang-ca-cuoc-the-thao.md`

`bong-da-viet-nam-xay-nen-tang.md` has no outgoing related-article declaration. Category and listing pages may still make these URLs crawlable, but the corpus lacks in-context editorial links. Google recommends normal crawlable `<a href>` links with concise, descriptive anchor text and says every important page should be linked from at least one other page. See [Google's crawlable link and anchor-text guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

### Content-type baseline

All 14 posts currently resolve to the guide content type unless explicitly changed. The one article categorized as `tin-the-thao`, `cach-chon-nguon-tin-the-thao-dang-tin-cay.md`, teaches readers how to evaluate sources; it is not a news story. No current page should be presented as fresh reporting or marked up as `NewsArticle` merely because it appears under a news-sounding route.

## Passed

The following are genuine strengths already present in the baseline:

- Titles are descriptive and generally match the body content.
- Heading structure is clear and scannable.
- The Vietnamese prose is readable, restrained, and avoids guaranteed-win language.
- Betting-related pages consistently acknowledge uncertainty and the possibility of losing money.
- Affiliate and third-party-platform disclosures are visible.
- Publication dates, canonical metadata, Open Graph metadata, breadcrumbs, an editorial policy, and article structured data already exist.
- Article frontmatter contains topic-specific Vietnamese image alt text.
- The content stays within a coherent broad purpose: sports, football analysis, and adult betting education.
- The site has responsible-gambling, age-limit, privacy, terms, contact, and editorial-policy pages.

These are useful signals, not ranking guarantees. Valid structured data helps Google understand a page but does not guarantee a rich result. Follow [Google's Article structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/article).

## Fixed in this change

The items in this section are implementation work in this branch, not recommendations for the 90-day publishing program. They should be treated as complete only after the final automated checks and rendered-page crawl pass.

### Deterministic image manifest and graceful fallback

- Each article is assigned the stable path `/images/posts/<slug>.webp`.
- Homepage and social-image slots use documented fixed filenames.
- Image slots render a normal crawlable image when the asset exists and retain the designed fallback when it does not.
- Existing topic-specific Vietnamese alt text is retained.
- Owner documentation provides an exact asset manifest, so uploading correctly named files updates the website without editing every component.

This improves maintainability and makes image discovery possible, but image performance still depends on uploading relevant, high-quality, crawlable files. Follow [Google's image SEO guidance](https://developers.google.com/search/docs/appearance/google-images).

### Editorial-team profile, visible byline, and aligned schema

- A crawlable editorial-team profile is added at `/tac-gia/ban-bien-tap`.
- Visible organizational bylines link to that profile.
- `author.url` in Article/BlogPosting JSON-LD points to the same profile.
- The profile explains editorial scope, review standards, and correction handling.
- The author route is included in sitemap and breadcrumb coverage.

This correctly aligns the visible author and structured author identity with Google's author-markup recommendations. It does not replace named subject-matter review on financial-risk, behavioral-safety, legal, or platform-evaluation content.

### Accurate evergreen positioning

- Site-facing language is corrected to describe the existing corpus as evergreen guides and analysis rather than claiming a functioning current-news operation.
- The change does not fabricate news, current scores, team developments, or reporting activity.
- A future newsroom remains a recommendation contingent on a real sourcing, timestamp, update, and correction workflow.

### Additional technical cleanup

- The article-search client payload now receives compact post summaries instead of every full HTML article body, FAQ array, and related-post list.
- Article and archive card headings use the correct level for their surrounding page structure.
- Visible FAQs remain available to readers, while obsolete FAQ rich-result JSON-LD is no longer emitted.
- The affiliate redirect is crawlable so its `X-Robots-Tag: noindex, nofollow` response can be read; API routes remain disallowed.
- Static sitemap entries no longer claim a hard-coded modification date. Article dates still come from publication or meaningful update data.
- Trust and policy pages now pair visible breadcrumbs with matching `BreadcrumbList` JSON-LD.
- Indexable metadata permits a large image preview, and article Open Graph dimensions match the 1600 x 900 image contract.
- The content build now rejects article image paths that do not match `/images/posts/<slug>.webp` and rejects missing related-post targets.

### Budget-content cannibalization reduced

- `thiet-lap-gioi-han-ngan-sach-ca-cuoc.md` remains the principal explanatory guide to setting betting limits.
- `quan-ly-ngan-sach-giai-tri.md` is retargeted as **“Mẫu bảng theo dõi ngân sách và thời gian giải trí trực tuyến”**, with copyable planning, session-log, and review tables plus a worked process example.
- The two pages now serve distinct intents and link to each other where the reader needs the complementary resource.

### Contextual internal-link network added

- Every article now contains at least two descriptive, in-body internal links to a relevant guide or trust resource.
- Automated tests verify that linked article slugs exist and prevent the network from silently regressing.
- Related-article cards remain as secondary discovery rather than the only link relationship between posts.

### English owner documentation

- Owner-facing setup, launch-input, content, and image instructions are rewritten in English.
- Vietnamese remains the public website language.
- Commands, paths, environment variables, and Vietnamese public-content requirements remain explicit.

## Launch blockers

These items are not solved merely by technical SEO changes and should be completed or consciously accepted before connecting the production domain.

1. **Provide owner identity and contact details.** Replace all owner-input placeholders for the production domain, business/editorial contact, privacy contact, and any legally required operator information.
2. **Upload the exact image assets.** The fallback prevents broken layouts, but launch-quality pages still need the WebP files listed in the image manifest and prompt catalog. Verify that each image accurately represents its article.
3. **Review adult imagery against platform and advertising policies.** Use clearly adult, non-explicit people only. Avoid school-like styling, youth-coded appearance, misleading winnings, currency piles, gambling chips where the article is purely sports editorial, and any suggestion that a model endorses guaranteed profit.
4. **Add authoritative sources to high-risk pages.** Responsible-gambling, financial-limit, cybersecurity, and platform-safety claims need reputable citations and review dates.
5. **Verify Vietnam-specific support information.** Do not publish invented helplines, legal claims, or treatment resources. Use current official or demonstrably reputable sources.
6. **Obtain appropriate legal review.** The site targets Vietnamese readers and links to a third-party betting platform. Technical implementation is not a legal opinion about advertising, affiliate disclosure, accessibility, age restrictions, or the availability of gambling services in any jurisdiction.
7. **Verify production metadata.** Set the final HTTPS site URL, confirm canonical URLs, robots, sitemap URLs, Open Graph URLs, and image URLs all use the production domain.
8. **Validate the outbound affiliate flow.** Confirm the partner URL, disclosure text, redirect behavior, and link qualification are correct before launch.
9. **Do not claim current news coverage.** A real newsroom requires named authors, primary sources, exact timestamps, update history, corrections, and an ongoing publishing operation.

## Prioritized findings

### P0 — Resolve before relying on organic acquisition

#### The current corpus does not support a sports-news claim

`cach-chon-nguon-tin-the-thao-dang-tin-cay.md` is the only article assigned to `tin-the-thao`, and it is an evergreen media-literacy guide. There are no current news reports. Keep the accurate evergreen positioning implemented in this change until a real newsroom exists.

#### YMYL trust evidence is insufficient

Highest-risk files:

- `cach-doc-ty-le-cuoc-the-thao.md`
- `quan-ly-ngan-sach-giai-tri.md`
- `thiet-lap-gioi-han-ngan-sach-ca-cuoc.md`
- `dau-hieu-hanh-vi-ca-cuoc-rui-ro.md`
- `tieu-chi-chon-nen-tang-ca-cuoc-the-thao.md`

They discuss money, behavioral harm, self-exclusion, account security, or platform safety, but contain no body citations, named specialist reviewer, review methodology, or verified Vietnam-specific support directory. Add authoritative sources, a named qualified reviewer where appropriate, a visible review date, and a correction/update record.

### P1 — Build during the first 90 days

#### Differentiate the tactics cluster

Affected files:

- `cach-doc-the-tran-bong-da.md`
- `cach-theo-doi-chien-thuat-bong-da-quoc-te.md`
- `xu-huong-chien-thuat-bong-da-quoc-te.md`

All three repeat pressing, spacing, transitions, off-ball space, and coaching adjustments. Give each a unique job:

- Real-time match-reading checklist.
- Beginner learning pathway with observation exercises and diagrams.
- Dated trend report with current, sourced team and match examples.

#### Separate media literacy from consumption habits

- `the-thao-va-thoi-quen-theo-doi.md` should own notification routines, attention management, and a weekly reading workflow.
- `cach-chon-nguon-tin-the-thao-dang-tin-cay.md` should own verification, source hierarchy, corrections, translation context, and transfer or injury rumors.

#### Add a real freshness model

No article currently declares `updatedAt`. Prioritize recurring review for:

- `xu-huong-chien-thuat-bong-da-quoc-te.md`: at least annual review with dated examples.
- `bong-da-viet-nam-xay-nen-tang.md`: update when league or federation information changes.
- `loi-the-san-nha-bong-da-viet-nam.md`: add and refresh season-specific evidence.
- `tieu-chi-chon-nen-tang-ca-cuoc-the-thao.md`: periodic security and policy review.
- `dau-hieu-hanh-vi-ca-cuoc-rui-ro.md`: immediate review whenever support resources change.
- `cach-doc-ty-le-cuoc-the-thao.md`: review when terminology or settlement rules change.

#### Expand Vietnamese football coverage

Only `bong-da-viet-nam-xay-nen-tang.md` and `loi-the-san-nha-bong-da-viet-nam.md` primarily cover Vietnamese football. Missing areas include the V-League structure, club hubs, stadiums, season pages, fixtures and results, national teams, youth competitions, women's football, and official-source directories.

#### Cover core betting-education subtopics

The corpus lacks dedicated pages for Asian handicap, totals, 1X2, half-win and half-loss settlement, void bets, accumulators, live-betting risks, odds formats, KYC, withdrawal verification, and account security. Build these as distinct, evidence-led resources rather than near-duplicate keyword pages.

### P2 — Quality and taxonomy refinements

- Several football articles repeat a similar final warning paragraph. Keep the reusable responsible-gambling notice, but give each editorial conclusion a topic-specific takeaway.
- `cach-doc-ty-le-cuoc-the-thao.md` is classified under `nhan-dinh` despite being betting education. Consider a dedicated betting-knowledge cluster.
- The one-post `tin-the-thao` taxonomy remains thin. Its visible label has been narrowed to source-selection and media-literacy intent, but it should either gain a substantial distinct cluster or be consolidated later.
- The narrow 838–991-word range and repeated section cadence feel templated. Add original diagrams, worked calculations, source tables, downloadable checklists, first-hand testing evidence, or expert commentary where relevant.
- Keep FAQs only when they answer genuine follow-up intent. Do not create questions solely to expand schema.

## 90-day roadmap

Recommended cadence for months one and two: update two existing articles and publish two substantial evergreen resources each week. Do not publish at that rate if sourcing, review, or originality would suffer. In month three, begin current reporting only if a real newsroom workflow is ready.

### Month 1 — Trust, responsible gambling, and betting fundamentals

1. **“Cẩm nang cá cược thể thao có trách nhiệm dành cho người mới (18+)”**  
   Create the central pillar linking odds education, limits, warning signs, platform criteria, and verified support.

2. **“Luật cá cược thể thao tại Việt Nam: người trưởng thành cần biết gì?”**  
   Commission current legal review and cite official Vietnamese sources. Do not derive legal claims from AI summaries.

3. **“Nguồn hỗ trợ khi cá cược mất kiểm soát tại Việt Nam”**  
   Publish only after every resource has been verified and a recurring review owner is assigned.

4. **“Kèo châu Á là gì? Cách đọc handicap và các trường hợp thắng nửa, thua nửa”**  
   Use worked examples and explain uncertainty without promising an edge.

5. **“Kèo tài xỉu là gì? Cách đọc mốc bàn thắng và cách tính kết quả”**  
   Serve totals intent without duplicating the general odds guide.

6. **“Kèo châu Âu 1X2 là gì? Cách đọc tỷ lệ thắng, hòa và thua”**  
   Build a beginner-friendly explanation with transparent calculations.

7. **“Cách tính tiền cược: thắng đủ, thắng nửa, hòa kèo, thua nửa và hoàn tiền”**  
   Add useful tables and examples.

8. **“Cá cược trực tiếp có những rủi ro gì? Cách tạo khoảng dừng trước quyết định”**  
   Explain speed, emotional decision-making, changing information, and practical friction without presenting a winning method.

### Month 2 — Football analysis and data authority

1. **“Cẩm nang phân tích một trận bóng đá từ A đến Z”**  
   Develop `nhan-dinh-truoc-tran-can-xem-gi.md` into the main analysis pillar.

2. **“xG là gì? Cách hiểu bàn thắng kỳ vọng khi phân tích bóng đá”**  
   Explain definition, limitations, sample size, and differences between data providers.

3. **“PPDA là gì? Cách đọc cường độ pressing trong bóng đá”**  
   Create a focused data explainer instead of repeating generic pressing descriptions.

4. **“Cách đánh giá phong độ bóng đá mà không chỉ nhìn 5 trận gần nhất”**  
   Cover opponent strength, venue, process versus result, and sample bias.

5. **“Chấn thương và án treo giò ảnh hưởng đến trận đấu như thế nào?”**  
   Add official-source verification and role-based squad analysis.

6. **“Cách phân tích đội hình ra sân trước giờ bóng lăn”**  
   Cover formation changes, player roles, substitutions, and official lineup sources.

7. **“Tình huống cố định trong bóng đá: cách đánh giá phạt góc, đá phạt và bóng bổng”**  
   Fill a major tactical gap with original diagrams and sourced examples.

8. **“Cách đọc dữ liệu sân nhà và sân khách trong bóng đá”**  
   Deepen the current home-advantage article with season evidence rather than anecdotes.

### Month 3 — Vietnamese football and a conditional newsroom

Evergreen and hub content:

1. **“V-League là gì? Thể thức thi đấu, cách tính điểm và những điều cần biết”**
2. **“Hệ thống các giải bóng đá chuyên nghiệp Việt Nam được tổ chức như thế nào?”**
3. **“Cách theo dõi lịch thi đấu, kết quả và bảng xếp hạng V-League”**
4. **“Đội tuyển Việt Nam: lịch thi đấu, lực lượng và nguồn tin chính thức”**
5. **“Bóng đá nữ Việt Nam: hệ thống giải đấu và hành trình phát triển”**
6. **“Hồ sơ các câu lạc bộ V-League: sân vận động, huấn luyện viên và phong cách thi đấu”**

Use the following working-title formats only when real current reporting exists:

7. **“Bản tin bóng đá Việt Nam ngày [DD/MM/YYYY]: tin chính và nguồn xác nhận”**
8. **“Nhận định [Đội A] vs [Đội B] ngày [DD/MM/YYYY]: lực lượng, phong độ và chiến thuật”**
9. **“Kết quả [Giải đấu] ngày [DD/MM/YYYY]: tỷ số và diễn biến chính”**
10. **“Đội hình [Đội A] vs [Đội B]: thông tin chính thức và thay đổi đáng chú ý”**

Every current article needs a named writer or editor, primary-source links, an exact publication time, a visible update time when facts change, a correction history, and contextual links to evergreen explainers. If that operation cannot be maintained, continue publishing evergreen analysis instead of filling date-based templates with fabricated or stale information.

## Post-launch Search Console validation

SEO performance cannot be proven before the production domain is live and Google has crawled it. Use Google Search Console and analytics to validate the implementation with real data.

### At launch

1. Verify a Domain property through DNS.
2. Submit the production `/sitemap.xml`.
3. Inspect the homepage, article index, one topic archive, the editorial-team profile, the responsible-gambling page, and three representative articles.
4. Confirm that Google-selected canonical matches the declared canonical.
5. Confirm rendered HTML contains the intended title, description, H1, visible byline link, crawlable image, alt text, breadcrumb schema, and Article/BlogPosting schema.
6. Test structured data with Google's Rich Results Test, while remembering that validity does not guarantee a rich result.
7. Confirm that no staging hostname or placeholder production URL appears in canonicals, sitemap entries, JSON-LD, RSS, Open Graph, or image URLs.

### After 7–14 days

1. Review indexing and sitemap processing rather than assuming every submitted URL was indexed.
2. Inspect any duplicate, crawled-not-indexed, soft-404, redirect, or canonical warnings individually.
3. Check whether article WebP URLs are crawlable and begin appearing in image results.
4. Review Core Web Vitals and mobile usability on real devices and connections.
5. Record baseline impressions, clicks, click-through rate, and average position by page and query; do not react to isolated daily movement.

### After 30, 60, and 90 days

1. Compare cluster-level performance: football analysis, Vietnamese football, betting education, and responsible gambling.
2. Identify pages gaining impressions but receiving weak click-through rates; improve titles and descriptions only when they remain accurate.
3. Identify query overlap between the two budget pages and the three tactics pages. Consolidate or retarget if Google repeatedly alternates between competing URLs.
4. Inspect internal-link discovery and add contextual links to valuable pages with weak crawling or impressions.
5. Review image-search performance separately from web-search performance.
6. Update articles only when material facts, sources, examples, or user needs have changed. Do not change dates merely to create artificial freshness.
7. Use actual Search Console queries and reader behavior to adjust the next content quarter. Do not infer authority from article count alone.

The correct success test is not “all SEO checks are green.” It is whether Vietnamese adult readers can find accurate, useful, well-sourced content; whether Google can crawl and understand it; and whether post-launch data shows the site satisfying relevant searches without misleading news or gambling claims.
