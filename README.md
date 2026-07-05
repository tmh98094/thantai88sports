# thantai88sports

Vietnamese sports/iGaming content website built with Next.js App Router.

This repository is prepared as a frontend-only handoff for design review and Cloudflare deployment. Backend/webhook integrations can wait until client approval.

## Run locally

Node.js 22 or later is recommended.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Required environment for production build

Set this in Cloudflare before the final production build:

```bash
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

Optional:

```bash
PARTNER_URL=https://www.thantai688.com/?f=55
CONTACT_WEBHOOK_URL=
```

## Cloudflare setup

- Install command: `npm install`
- Build/test command: `npm run cf:build`
- Preview locally on the Cloudflare adapter: `npm run preview`
- Deploy with Wrangler/OpenNext: `npm run deploy`

## Pre-upload checks

Run these before deploying to Cloudflare:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run cf:dry-run
```

## Articles

Article source files are stored in `content/posts/*.md`. The build process validates frontmatter and regenerates `generated/posts.json`.

See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) before adding or editing an article.

## Images

Required image paths, dimensions, and generation prompts are documented in:

- [docs/IMAGE_ASSETS.md](./docs/IMAGE_ASSETS.md)
- [docs/AI_IMAGE_PROMPTS.md](./docs/AI_IMAGE_PROMPTS.md)

## Owner review before launch

Read and complete [OWNER_INPUTS.md](./OWNER_INPUTS.md) before publishing with a real domain.
