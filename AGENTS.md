# AGENTS.md — Panaghiusa

Ground rules for AI agents (and humans) working in this repository. Read this before writing code. The site has two jobs: get people registered, and show what past events achieved. Anything that makes registration a dead end, or makes the milestones untrue, breaks the only things this site is for.

## What this is

A small static website for Panaghiusa, hosted on **GitHub Pages**. It has:

- **Home** (`index.html`) — what Panaghiusa is, the next event, a clear way to register.
- **Register** (`register.html`) — the next event's details, a privacy summary, and a link out to a **Google Form** the organizers own; responses land in a linked Google Sheet (`docs/REGISTRATION.md`). The site itself never handles registration data.
- **Milestones** (`milestones.html`) — a timeline of past events: date, place, what happened, numbers worth telling, photos.

Plain HTML, CSS and a little vanilla JavaScript. **No framework, no build step, no runtime dependencies.** The repository root is what GitHub Pages serves.

Visual design is done with the **design-taste-frontend** skill (`.agents/skills/design-taste-frontend/`, `docs/UI.md`). The dealt direction is saved in `.taste-skill/direction.json` (reprint it with `draw.mjs --show`); its tokens live in `assets/css/site.css`. `PRODUCT.md` at the root is the product context: audience, purpose, constraints.

## Authoritative docs (read in this order)

1. `docs/PLAN.md` — purpose, audience, locked decisions, open questions, scope
2. `docs/KICKOFF.md` — **start here if the repo is empty**: the ordered task list for the first agent
3. `docs/REGISTRATION.md` — Google Form questions and settings, the register page states, privacy
4. `docs/MILESTONES.md` — how a past event is written up; the copy-paste entry template
5. `docs/UI.md` — pages, how design-taste-frontend is used, accessibility and performance floor
6. `docs/DEPLOY.md` — GitHub Pages setup, custom domain, the Google Form setup
7. `PRODUCT.md` — product context; `.taste-skill/direction.json` — the visual direction
8. `docs/PROGRESS.md` — what's done (update it with every merged change)

## Commands

```bash
# serve locally (any static server; the repo root is the site)
python3 -m http.server 8000          # → http://localhost:8000

# checks — CI runs the same (.github/workflows/check.yml)
npx --yes html-validate@9 "*.html"
npx --yes linkinator@6 http://localhost:8000 --recurse --skip "^(?!http://localhost)"

# design checks (Node 22+ and Chrome)
T=.agents/skills/design-taste-frontend/scripts
node $T/lint.mjs *.html assets/css assets/js          # banned patterns in source
node $T/inspect.mjs http://localhost:8000/index.html   # rendered rules at 1440/768/390; repeat per page
node $T/draw.mjs --show                                # reprint the direction sheet
```

Every PR must pass the checks above. There is no `package.json`; tools run through `npx` with pinned major versions.

## Non-negotiable invariants

1. **Static only.** Nothing that needs a server we run. No backend, no database, no build step that GitHub Pages can't reproduce from the committed files. Registration is handled by the Google Form; any other feature that needs server code doesn't ship (raise it in `docs/PLAN.md` first).
2. **Registration is never a dead end.** When open, `register.html` links to the current edition's form and the form is accepting responses. When closed or not yet open, the page says so and gives the next step, and the form itself is closed too. The fallback contact in `docs/REGISTRATION.md` is always visible next to the Register link.
3. **Registering needs no JavaScript.** The Register action is a plain `<a href>` to the Google Form. No embedded iframe, no custom form posting into Google behind the scenes (it can't confirm the submission landed).
4. **Collect only what's listed in `docs/REGISTRATION.md` §2.** A new form question = a doc change first, with the reason it's needed. The privacy summary appears on `register.html` before the Register link and in the form description, both linking the full notice. No analytics or tracking scripts.
5. **No secrets in the repo.** This repo is public and GitHub Pages serves every committed file. The form's public responder link (`…/viewform` or `forms.gle/…`) is public by design; the form's `/edit` URL, the response Sheet link, the Google account, and payment account numbers or QR codes are not — they never go here (payment details live in the form description, `docs/REGISTRATION.md` §2).
6. **Milestones are factual.** Every number (attendees, funds raised, volunteers) comes from the organizers and is recorded with its source in the entry's comment (`docs/MILESTONES.md` §3). No invented stats, no "approximately" without an organizer saying so. Photos of people need the consent rule in `docs/MILESTONES.md` §4.
7. **Relative URLs everywhere.** The site may be served from `https://<user>.github.io/panaghiusa/` (a sub-path) or a custom domain (root). Links and assets are relative (`register.html`, `assets/img/…`), never root-absolute (`/register.html`).
8. **Accessibility is a floor, not a polish item.** Everything on our pages works by keyboard, with visible focus; text contrast ≥ 4.5:1; respects `prefers-reduced-motion`. Any `inspect.mjs` FAIL blocks merge.
9. **Fast on a phone on mobile data.** Most visitors arrive from a shared link on a phone. Budget per page: ≤ 200 KB HTML+CSS+JS (gzip), images in AVIF/WebP with `width`/`height` and `loading="lazy"` below the fold, at most two web font files. No carousels, no autoplay video.
10. **Design changes go through design-taste-frontend.** Follow the skill's run (`SKILL.md`): argument → build from the dealt direction → `lint.mjs` and `inspect.mjs` → look at every screenshot and write the critique → fix. `inspect.mjs` shows 0 FAIL on every page; each remaining WARN is defended in the PR. Don't re-deal the direction for a new section; build it from the sheet (`draw.mjs --show`, `--alternatives <role>` for a section that can't hold the content). Re-deal only when the owner asks for a new look.

## Code conventions

- Semantic HTML first: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<time datetime>`, `<form>`, `<fieldset>`. One `<h1>` per page; no skipped heading levels.
- CSS: one `assets/css/site.css`, custom properties for the tokens from the direction sheet, mobile-first, `rem` for type, logical properties. No CSS framework.
- JavaScript: only if a page genuinely needs it — one small ES module per page, loaded with `type="module"`. No dependencies. Progressive enhancement only; no page needs JS to work.
- Shared header/footer are copied into each page (three pages don't justify a templating step). When you change one, change all — the PR checklist in `docs/UI.md` §6 says so.
- Every page has `<title>`, `<meta name="description">`, Open Graph tags (shared links are the main traffic source) and `lang` on `<html>`.
- Images: `assets/img/<event-slug>/…`, file names in `kebab-case`, meaningful `alt` text (or `alt=""` for pure decoration).
- No comments unless they explain a *why* that isn't obvious. Milestone source notes (invariant 6) are the exception and required.

## Gotchas

- **GitHub Pages sub-path.** Root-absolute URLs work on `localhost:8000` and break on `<user>.github.io/panaghiusa/`. Test with the real Pages URL after the first deploy, not only locally.
- **Google Form link.** Use the responder link from *Send → link*, never the `/edit` URL from the address bar. A new edition usually means a new form and a **new link** — update `register.html` in the same PR as the event details, and check the old link shows the closed message.
- **Google sign-in.** *Limit to 1 response* and file-upload questions force visitors to sign in with Google, which loses people on a phone. Keep them off; duplicates are cleaned up in the Sheet (`docs/REGISTRATION.md` §5).
- **Two switches for closing.** `data-registration` on the page and *Accepting responses* on the form. Flip both, or an old shared link keeps collecting.
- **Cache.** GitHub Pages caches for ~10 minutes. A "fixed" page can look broken until the cache expires; check with a query string (`?v=2`) before debugging further.
- **`.nojekyll`.** Keep the empty `.nojekyll` file at the root, or Jekyll ignores folders starting with `_` and adds build time.
- **Taste-skill files.** `.taste-skill/` holds working files (inspector screenshots and reports); only `direction.json` is committed. `.impeccable/` is from the abandoned first direction and is ignored.

## Adding a change (checklist)

1. Is it in scope (`docs/PLAN.md` §4)? If it needs a server, stop and raise it.
2. New form question → `docs/REGISTRATION.md` first (question, why, type, Sheet column). New milestone → follow `docs/MILESTONES.md`.
3. Design → build from the direction sheet, then `lint.mjs`, `inspect.mjs` and a written critique (`references/critique.md` §4).
4. Run the checks in **Commands**; if registration changed, run the tests in `docs/REGISTRATION.md` §7.
5. Update `docs/PROGRESS.md`.
