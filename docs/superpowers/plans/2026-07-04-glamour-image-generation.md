# Glamour Image Prompt Handoff Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the 17-image catalog for adult, non-nude glamour imagery and deliver self-contained prompts for the owner’s preferred generator.

**Architecture:** The Markdown catalog is the source of truth for filenames, dimensions, prompts, attached-logo instructions, and alt text. Existing Next.js paths consume generated WebP files automatically when the owner places them under `public/images` with the documented names.

**Tech Stack:** Markdown, Vitest, Next.js image manifest.

**Execution decision:** Native Image 2 rejected three progressively softer sexual-fashion prompts at output-safety stage. The owner therefore chose prompt handoff rather than native generation.

---

### Task 1: Rewrite and test the prompt catalog

**Files:**
- Modify: `docs/AI_IMAGE_PROMPTS.md`
- Modify: `docs/IMAGE_ASSETS.md`
- Modify: `tests/image-contract.test.tsx`

- [x] Add a failing catalog test that rejects `Negative constraints` blocks and requires 17 generation prompts containing adult age, non-nude boundary, glamour wardrobe, and playful-expression direction.
- [x] Run `npm.cmd test -- image-contract` and confirm failure against the restrained catalog.
- [x] Rewrite the global direction and all 17 prompts in English while preserving exact paths, dimensions, aspect ratios, and Vietnamese alt text.
- [x] Remove every negative-constraint field.
- [x] Run `npm.cmd test -- image-contract` and confirm the catalog contract passes.

### Task 2: Make logo instructions self-contained

**Files:**
- Modify: `docs/AI_IMAGE_PROMPTS.md`
- Test: `tests/image-contract.test.tsx`

- [x] Add a failing assertion requiring attached-logo and top-left placement instructions in every prompt entry.
- [x] Add the exact supplied-logo instruction to all 17 entries, with 24% landscape, 34% square, and 42% portrait scale guidance.
- [x] Explain how to attach `C:\Users\Terry\.codex\attachments\3e825769-fc86-4ad3-8384-fcab7175add1\image-1.png` as the reference image.
- [x] Run the image contract test and confirm all 17 entries pass.

### Task 3: Verify and merge the prompt package

**Files:**
- Modify only files proven faulty during verification.

- [ ] Run `npm.cmd test`, `npm.cmd run lint`, and `npm.cmd run typecheck`.
- [ ] Confirm the catalog contains 17 prompts, 17 logo instructions, 17 dimensions, 17 output paths, and zero negative-constraint blocks.
- [ ] Run `git diff --check`.
- [ ] Commit the prompt package, merge it to `main`, rerun tests, and remove the temporary worktree.
