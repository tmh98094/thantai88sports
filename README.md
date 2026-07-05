# thantai88sports

Vietnamese sports/iGaming content website built with Next.js App Router.

This repository is prepared as a frontend-only handoff for design review and later Vercel deployment. Backend/webhook/deployment-specific integrations can wait until client approval.

## Run locally

Node.js 22 or later is recommended.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Required environment for production build

Set this in Vercel before building:

```bash
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

Optional:

```bash
PARTNER_URL=https://www.thantai688.com/?f=55
CONTACT_WEBHOOK_URL=
```

## Vercel setup

- Framework preset: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: leave default

## Pre-upload checks

Run these before uploading/importing to Vercel:

```bash
npm test
npm run lint
npm run typecheck
npm run build
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
