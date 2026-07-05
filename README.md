# Thantai88sport

Thantai88sport is a Vietnamese-language sports and iGaming affiliate website built with the Next.js App Router. It is prepared for deployment to Cloudflare Workers through OpenNext.

## Run locally

Node.js 22 or later is required.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Pre-deployment checks

Run the complete verification set before deploying:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run cf:build
npm run cf:dry-run
```

## Deploy to Cloudflare Workers

1. Push the repository to GitHub or GitLab, or deploy locally with Wrangler.
2. In Cloudflare Workers Builds, set the build command to `npm run cf:build` and the deploy command to `npx opennextjs-cloudflare deploy`.
3. Add the production origin as the `NEXT_PUBLIC_SITE_URL` build variable. Use HTTPS, include no path, and do not add a trailing slash.
4. Add `CONTACT_WEBHOOK_URL` as a secret if the contact form should deliver submissions to a webhook or automation service.
5. Add `PARTNER_URL` if the affiliate destination must differ from the default URL in `lib/site-config.ts`.
6. After the first deployment, open Worker -> Settings -> Domains & Routes -> Add Custom Domain and connect the production domain.
7. Deploy again after changing the domain or image assets so the sitemap, canonical URLs, structured data, RSS feed, and Open Graph metadata use the production values.

Cloudflare currently recommends Workers for full-stack Next.js applications. `wrangler.jsonc` enables `nodejs_compat`, static assets, and observability for the OpenNext deployment.

## Manage articles

Article source files are stored in `content/posts/*.md`. Every `npm run dev`, `npm run build`, or `npm run cf:build` execution validates the frontmatter and regenerates `generated/posts.json`.

See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) before adding or editing an article.

## Add production images

The site expects exactly 17 production WebP files. The required filenames, paths, dimensions, and replacement behavior are documented in [docs/IMAGE_ASSETS.md](./docs/IMAGE_ASSETS.md). Detailed generation prompts are in [docs/AI_IMAGE_PROMPTS.md](./docs/AI_IMAGE_PROMPTS.md).

If each generated file is placed at its documented path with its exact filename, no code changes are required. Rendered image slots show a graceful branded placeholder while a file is missing or fails to load. The default social-sharing image does not have a browser-visible fallback for social crawlers, so all 17 files should be present before launch.

## Required owner review before launch

Read and complete [OWNER_INPUTS.md](./OWNER_INPUTS.md). The project can run locally with development defaults, but it should not be published until the production domain, owner identity, business and legal details, contact channels, affiliate claims, reviewers, source policy, images, webhook, analytics consent, and legal pages have been confirmed.
