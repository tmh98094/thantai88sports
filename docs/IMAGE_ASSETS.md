# Production Image Asset Manifest

The production image package contains exactly 17 WebP files. Generate each image from [AI_IMAGE_PROMPTS.md](./AI_IMAGE_PROMPTS.md), export it with the exact filename shown below, and place it at the exact path.

Use sRGB WebP, retain the requested aspect ratio, and compress without visibly damaging faces, wardrobe details, hands, or the supplied logo. The native generation is model-first adult glamour photography; the exact logo is composited afterward.

## Required logo overlay

Use the transparent source logo at `C:\Users\Terry\.codex\attachments\3e825769-fc86-4ad3-8384-fcab7175add1\image-1.png` on every image. Apply it in the top-left with approximately 3% outer margin. Scale it to approximately 24% image width for landscape/social assets, 34% for the square asset, and 42% for the portrait hero. Deterministic compositing keeps the lettering, footballs, colors, and mascot identical across the full package.

## Drop-in replacement behavior

The code already references every path in this manifest. Exact filename replacement requires no code changes: copy each generated WebP file into its listed location and reload or redeploy the site.

Rendered homepage, article, and article-card image slots handle missing or failed files gracefully by showing the existing branded placeholder. This makes local review safe while assets are incomplete. Social crawlers cannot use a missing `og-default.webp`, so all 17 files must be present and return HTTP 200 before public launch.

Do not rename a file, change its extension, or place it in another folder unless the corresponding source path is deliberately updated.

## Exact 17-file WebP manifest

| # | Exact output path | Dimensions | Aspect ratio | Recommended maximum |
|---:|---|---:|---:|---:|
| 1 | `public/images/og-default.webp` | 1200 x 630 px | 1.91:1 | 250 KB |
| 2 | `public/images/home/hero-stadium-1600x2000.webp` | 1600 x 2000 px | 4:5 | 220 KB |
| 3 | `public/images/home/analysis-board-1200x1200.webp` | 1200 x 1200 px | 1:1 | 220 KB |
| 4 | `public/images/posts/bong-da-viet-nam-xay-nen-tang.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 5 | `public/images/posts/cach-chon-nguon-tin-the-thao-dang-tin-cay.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 6 | `public/images/posts/cach-doc-the-tran-bong-da.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 7 | `public/images/posts/cach-doc-ty-le-cuoc-the-thao.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 8 | `public/images/posts/cach-theo-doi-chien-thuat-bong-da-quoc-te.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 9 | `public/images/posts/dau-hieu-hanh-vi-ca-cuoc-rui-ro.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 10 | `public/images/posts/loi-the-san-nha-bong-da-viet-nam.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 11 | `public/images/posts/nhan-dinh-truoc-tran-can-xem-gi.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 12 | `public/images/posts/phan-tich-lich-thi-dau-va-the-luc.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 13 | `public/images/posts/quan-ly-ngan-sach-giai-tri.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 14 | `public/images/posts/the-thao-va-thoi-quen-theo-doi.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 15 | `public/images/posts/thiet-lap-gioi-han-ngan-sach-ca-cuoc.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 16 | `public/images/posts/tieu-chi-chon-nen-tang-ca-cuoc-the-thao.webp` | 1600 x 900 px | 16:9 | 220 KB |
| 17 | `public/images/posts/xu-huong-chien-thuat-bong-da-quoc-te.webp` | 1600 x 900 px | 16:9 | 220 KB |

## Export and composition requirements

- Use WebP in the sRGB color space. A quality setting around 78-84 is a sensible starting point.
- Generate at the listed dimensions or larger in the same aspect ratio, then crop and export precisely. Do not upscale a smaller source.
- Keep faces, torso, wardrobe details, and the simple topic cue inside the crop-safe area described in [AI_IMAGE_PROMPTS.md](./AI_IMAGE_PROMPTS.md).
- Keep every model unmistakably adult, age 25–35, non-nude, and styled with the model-first glamour direction in the prompt catalog.
- Inspect face, hands, anatomy, wardrobe, crop safety, and exact logo placement before approving an image.
- Keep the final file extension `.webp`; changing only a filename extension does not convert an image.

## Optional brand assets outside the 17-file package

The existing `public/images/logo.svg` and `public/icon.svg` remain valid development brand assets. They are not part of the 17-file WebP manifest. If they are replaced or renamed later, update their references in `lib/seo.ts` and `app/manifest.ts` as applicable.

## Final verification

After adding the files:

```bash
npm test
npm run build
```

Then confirm that every manifest URL returns HTTP 200 on the deployed domain, inspect the homepage and several article crops on mobile and desktop, and validate the social-sharing image before launch.
