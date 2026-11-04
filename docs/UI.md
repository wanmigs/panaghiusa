# UI — pages, design-taste-frontend workflow, quality floor

## 1. Pages

| Page | File | Visitor's success |
|---|---|---|
| Home | `index.html` | Understands what Panaghiusa is, when and where the next one is, and taps "Register" |
| Register | `register.html` | Knows the event details, then reaches the Google Form in one tap — or knows exactly why registration isn't open and what's next |
| Milestones | `milestones.html` | Believes this is real and worth joining; can share one event |
| Not found | `404.html` | Gets back home or to registration |

Shared header (wordmark, links to Milestones and Register) and footer (the postcard back: links, privacy notice link) on every page. The primary action everywhere is **Register** — unless registration is closed (REGISTRATION §3), then it becomes the next useful step.

## 2. The skill

The **design-taste-frontend** skill lives in `.agents/skills/design-taste-frontend/`. Read its `SKILL.md` before any design work. Its scripts need Node 22+ and an installed Chrome; they install nothing.

The direction was dealt once (2026-11-04) and is the art direction for every page:

- **Direction:** "The page is the object" (seed 1883615129). The object is the alumni shirt's split print, "PANAG / HIU / SA", set as the title of a programme card.
- **Type:** Bricolage Grotesque, self-hosted (`assets/fonts/`, two woff2 files), five size steps (`--step-small` … `--step-display`).
- **Colour:** the dealt proportions, with colours taken from the shirt: dark green ground, shirt-green card, bone paper and ink, a sage field.
- **Sections:** programme card hero → letter → editions sheet → photo tiles with label strips → reply card → postcard footer.

Reprint the full sheet with `node .agents/skills/design-taste-frontend/scripts/draw.mjs --show` (it reads `.taste-skill/direction.json`, which is committed).

## 3. Workflow for a change

1. **Argument first** (`references/copy.md` §1): one line per section, a claim and its proof. No claim, no section.
2. **Build from the sheet.** New sections take a blueprint from the sheet; if none fits the real content, `draw.mjs --alternatives <role>` and `--redraw section:<role>=<id>`. Don't re-deal the direction.
3. **Gate:** `lint.mjs` on the source, `inspect.mjs` on every changed page (commands in `AGENTS.md`). Fix every FAIL; defend or fix every WARN.
4. **Look:** open every screenshot the inspector lists (desktop, tablet, phone) and write the critique in the shape of `references/critique.md` §4. Fix the top three problems, inspect again.
5. **Motion last** (`references/motion.md`): transform and opacity only, with a `prefers-reduced-motion` fallback.

## 4. Direction rules that matter here

- Lead with **real photos from past events** — they're the proof the milestones page exists to give. No stock photos of strangers, no generic illustrations.
- Warm and communal rather than corporate. Respect the cultural context in `PRODUCT.md`; avoid motifs that caricature it.
- The house rules in `SKILL.md` apply without exception: no eyebrow labels, no monospace, no hairline rules, no gradients, no shadows at rest, headlines two lines or fewer at every width.
- **Photo viewer.** Every content photo sits in a `<figure>` as `<a class="zoom" href="…-<largest>.webp"><img …></a>`, so without JS the link opens the full-size file. `site.js` turns it into a dialog with the caption, a collapsed **More details** (the `alt` text), and an optional organizer note from `data-details` on the `<figure>`. Leave `data-details` off when there's nothing sourced to add. Its facts follow the same sourcing rule as milestones (`AGENTS.md` invariant 6). Decorative images (the hero background, the footer stamp) don't get the link.

## 5. Quality floor (blocks merge)

- `inspect.mjs`: 0 FAIL at 1440, 768 and 390 px on every page.
- `lint.mjs`: 0 FAIL.
- Lighthouse mobile ≥ 95 for Performance, Accessibility, Best Practices, SEO on every page.
- Layout holds at 320, 375, 768, 1280 px; no horizontal scroll; tap targets ≥ 44 px.
- Keyboard: visible focus on every interactive element; logical tab order; skip link to `<main>`.
- `prefers-reduced-motion` disables non-essential animation.
- Text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI borders).

## 6. PR checklist

- [ ] Header/footer changes copied to all pages
- [ ] Relative URLs only
- [ ] Checks in `AGENTS.md` pass locally
- [ ] Screenshots at 375 px and 1280 px in the PR description for visual changes
- [ ] `docs/PROGRESS.md` updated
