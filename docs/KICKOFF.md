# KICKOFF — agent plan for an empty repository

The ordered task list for the first agent (or developer). Do the tasks in order; each has a deliverable and a check. Don't start a task until the previous one's check passes. Update `docs/PROGRESS.md` after each task.

## T0 — Owner decisions (blocking, ask before coding)

Ask the owner every question in `docs/PLAN.md` §5 and record the answers there with the date. Accepting a default is an answer. Don't invent event facts, numbers or quotes to fill gaps — use `TODO(owner)` and keep those pages off the live site.

## T1 — Repository skeleton

- `git init`; `.gitignore` (OS files + `.taste-skill/` except `direction.json`), empty `.nojekyll`, `.editorconfig`, `LICENSE` if the owner wants one, `README.md` (one paragraph + link to `AGENTS.md`).
- Pages: `index.html`, `register.html`, `milestones.html`, `404.html` — valid HTML shells with shared header/footer, `lang`, title, description, OG tags.
- `assets/css/site.css`, `assets/js/`, `assets/img/`.
- `.github/workflows/check.yml`: on PR and push — start `python3 -m http.server`, then `html-validate`, taste `lint.mjs`, taste `inspect.mjs` on each page, `linkinator` (commands in `AGENTS.md`).
- **Check:** CI green; the four pages open locally and every link between them works.

## T2 — Design direction

- `PRODUCT.md` from `docs/PLAN.md` answers (audience, purpose, tone, constraints: static, phone-first, low bandwidth).
- Follow `.agents/skills/design-taste-frontend/SKILL.md` steps 1–5: inventory the subject, write the argument, deal three directions with `draw.mjs --options 3`, choose one, write the idea sentence. Build the token layer in `site.css` from the sheet. Real photos from past events beat stock or illustration.
- **Check:** owner approves the direction (screenshot at 375 px and 1280 px); `PRODUCT.md` and `.taste-skill/direction.json` committed.

## T3 — Registration

- Follow `docs/REGISTRATION.md` end to end: the owner (or you, in their account) creates the Google Form and linked Sheet (§2, §4); build `register.html` with the open/closed/soon states, privacy summary, fallback contact and the Register link (§3, §6).
- Write the page copy and the form's description/confirmation text (`references/copy.md`); check the closed and soon states render.
- **Check:** every case in `docs/REGISTRATION.md` §7 passes; `inspect.mjs register.html` has 0 FAIL.

## T4 — Milestones

- Collect past events from the owner. Write each with the template in `docs/MILESTONES.md`, newest first, with source notes and consent notes.
- Optimize photos (AVIF/WebP, ≤ 1600 px long edge, ≤ 250 KB each) before committing.
- `inspect.mjs milestones.html`, then a written critique round (`references/critique.md`).
- **Check:** every number has a source note; every photo of identifiable people has a consent note; page weight within budget (`AGENTS.md` invariant 9).

## T5 — Home, 404, sharing

- Home: what it is, next event, primary "Register" action, a short preview of recent milestones linking to the full page.
- 404 page with links home and to register (paths relative — GitHub Pages serves it at any depth).
- OG images (1200×630) for home, register, milestones.
- Critique rounds on Home and every page (`references/critique.md`), layout check at 320 / 375 / 768 / 1280 px.
- **Check:** Lighthouse mobile ≥ 95 in all four categories on every page; `inspect.mjs` 0 FAIL; OG card renders in a link-preview debugger.

## T6 — Deploy and launch

- Follow `docs/DEPLOY.md`: enable Pages, custom domain + HTTPS if chosen.
- Retest everything on the real Pages URL (sub-path issues only show there).
- **Check:** a real registration from a phone on mobile data lands in the form's response Sheet; organizers can open the Sheet; `docs/PROGRESS.md` updated with the live URL.
