# Glamour Image Generation Design

## Goal

Replace the existing restrained editorial image direction with a model-first adult iGaming glamour prompt system and hand off 17 self-contained prompts for the owner to generate with their preferred AI image generator.

## Visual direction

- Every image features an unmistakably adult Vietnamese or Southeast Asian woman age 25–35.
- The model is the dominant visual subject, with an eye-catching, playful, flirtatious, or naughty facial expression.
- Wardrobe may use lingerie-inspired tops, corset-style blouses, fitted crop shirts, satin camisoles, bodysuits, glamorous sports tops, or similarly provocative styling while remaining non-nude and covering intimate areas.
- Sports and iGaming context is reduced to a small number of recognizable background cues. The image should sell visual appeal first rather than tell a detailed story.
- The existing green, lime, gold, red, and off-white brand palette remains in wardrobe, lighting, and backgrounds.

## Prompt catalog changes

- Remove every `Negative constraints` field from `docs/AI_IMAGE_PROMPTS.md`.
- Replace the former fully-covered and restrained-editorial language with the new adult glamour direction.
- Keep all 17 exact output paths, filenames, dimensions, aspect ratios, and Vietnamese alt text.
- Each prompt remains distinct through setting, pose, wardrobe, and one or two topic cues.
- Prompts use positive instructions only, including the positive boundary that the model is adult and non-nude.

## Logo treatment

The supplied transparent PNG at `C:\Users\Terry\.codex\attachments\3e825769-fc86-4ad3-8384-fcab7175add1\image-1.png` is attached as a logo reference with every prompt.

- Every prompt contains an explicit attached-logo instruction.
- Position: top-left.
- Margin: approximately 3% of the image width and height.
- Width: approximately 24% on landscape/social images, 34% on square images, and 42% on the portrait homepage hero.
- The prompt asks the generator to preserve the exact supplied lettering, footballs, colors, and mascot. Deterministic compositing remains the fallback if a generator redraws it inaccurately.

## Generation handoff

- The owner chose prompt handoff after the native generator rejected the requested sexual-fashion direction at its output-safety stage.
- Each entry includes the exact orientation, dimensions, output path, generation prompt, attached-logo instruction, and Vietnamese alt text.
- The owner will attach the supplied logo PNG and submit each prompt to their preferred generator.
- Generated files should be exported as sRGB WebP and placed at the 17 manifest paths under `public/images`.
- Existing code requires no path changes; correctly named files appear automatically after refresh.

## Validation

- Confirm exactly 17 prompt entries and 17 manifest paths.
- Confirm every entry contains adult age, non-nude, glamour wardrobe, playful expression, attached-logo, top-left placement, dimensions, filename, and output path instructions.
- Confirm no `Negative constraints` block remains.
- Run the image contract tests to prevent the catalog from regressing.
