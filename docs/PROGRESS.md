# PROGRESS

| Task (KICKOFF) | Status |
|---|---|
| T0 Owner decisions | not started |
| T1 Repository skeleton | not started |
| T2 Design direction | done — design-taste-frontend, `.taste-skill/direction.json` |
| T3 Registration | in progress — page built; fallback contact and form sign-in setting open |
| T4 Milestones | in progress — 2025 and 2023 entries |
| T5 Home, 404, sharing | done — live at https://panaghiusa.info/ |
| T6 Deploy and launch | not started |

Live URL: — (not deployed)

## Log

Newest first. One entry per merged change: what changed, the checks run, anything deferred.

- 2026-11-04 — **Click-to-zoom photo viewer.** The content photos on Home, Register and Milestones link to their largest file. `site.js` opens them in a full-screen `<dialog>`: the photo fit to the screen (click it to zoom 2× and pan by scrolling), the caption, a collapsed "More details" (the alt text plus an optional `data-details` note on the `<figure>`), and Close. It closes with Close, Escape or a click on the scrim, and focus returns to the photo. Only the House of Hope photo has a `data-details` note so far (from the 2025 poster and owner answers). How to add one is in `docs/UI.md` §4. Checks: html-validate clean, linkinator clean, `lint.mjs` 0 FAIL, `inspect.mjs` 0 FAIL on all three pages.

- 2026-11-04 — **MAS AMiCUS logo on the Home letter.** The round House of Hope photo above "One night a year, for a cause" is now the MAS AMiCUS logo (`assets/icons/mas-amicus-logo.webp`, dark ink on transparent, 6rem wide). html-validate clean.

- 2026-11-04 — **Share metadata fixed for the live domain.** The site is live at `https://panaghiusa.info/` (`CNAME`). `og:image`, `twitter:image` and `og:url` are now absolute (the relative poster link failed to fetch), and every page has `og:site_name`. Titles are 60 characters or fewer, descriptions 155 or fewer, and `og:description` 125 or fewer. The absolute-URL exception is recorded in `AGENTS.md` invariant 7 and the `docs/DEPLOY.md` checklist.

- 2026-11-04 — **Countdown runs when a page is opened from disk.** `site.js` is now a classic `defer` script instead of `type="module"`. Chrome blocks module scripts on `file://`, so the hero showed only the static start time. `AGENTS.md` conventions updated. Checked: countdown ticks from `file://` and from `http://`; html-validate clean.

- 2026-11-04 — **Hero ticket, favicon, OG poster.** The Home hero is now a paper ticket in the style of the editions sheet (scalloped edges, Date / Time / Place rows): "PANAGHIUSA" on one line, a live countdown (days, hours, minutes, seconds; without JS it shows the start time as text) and a tear-off stub with a large "Register for 2026" button and the fallback line next to it. The 2026 / 2025 / 2023 switcher is gone (the past editions stay in the sheet and on Milestones). Favicon from the MAS AMiCUS logo (`favicon.ico` 16/32/48, `assets/icons/apple-touch-icon.png`). OG poster `assets/img/og/panaghiusa-2026.jpg` (1200×630, the hero ticket over the hall photo; its HTML source is `.taste-skill/og.html`, not committed) linked from every page. CSS and JS links carry `?v=` to beat the Pages cache. Checks: html-validate clean, linkinator clean, `lint.mjs` 0 FAIL, `inspect.mjs` 0 FAIL on all three pages. Deferred: `og:image` is relative until the live URL is known; Facebook and Messenger need it absolute.

- 2026-11-04 — **2026 details, countdown, hero fix; docs moved to design-taste-frontend.** Owner gave the 2026 edition: Sunday 29 November 2026, 5:00–8:00 PM, Pearlmont Hotel, Cagayan de Oro City (source comment in `index.html`). Added it to Home (card, letter stub, editions sheet, reply band, footer), `register.html` (head and open state) and the meta descriptions. The hero card no longer pins on scroll; it sits over the hall photo with the date, time, venue and a live countdown (`role="timer"`, `data-ui`, hidden without JS, switches to "Happening now" at 5:00 PM and a thank-you after 8:00 PM). `AGENTS.md`, `docs/UI.md`, `docs/PLAN.md`, `docs/KICKOFF.md`, `docs/DEPLOY.md`, `PRODUCT.md` and `docs/MILESTONES.md` now name design-taste-frontend as the design process. Checks: html-validate clean, linkinator clean, `lint.mjs` 0 FAIL (3 WARN: zero-padded clock digits), `inspect.mjs` 0 FAIL on all three pages (WARN: no footage). Deferred: 2026 cause and fee, named fallback contact, `og:image`, CI workflow.

- 2026-11-04 — **Home, Register, Milestones and 404 built with design-taste-frontend.** The owner dropped the impeccable quilt direction and chose a fresh taste-skill build: direction "The page is the object" (seed 1883615129), Bricolage Grotesque (self-hosted, two woff2 files), palette from the alumni shirt. Home is a programme card over the venue hall ("PANAG HIU SA" from the shirt print) with an edition switcher (2026 / 2025 / 2023, progressive enhancement), a pinned card on desktop, a letter, the editions sheet, a photo gallery, a reply card and a postcard footer. `register.html` keeps the form link, the `data-registration` states and the privacy summary before the Register link. `milestones.html` has the 2025 and 2023 entries with source notes. Photos are WebP in `assets/img/gallery/`. Checks: html-validate clean, linkinator clean, taste `lint.mjs` clean, `inspect.mjs` 0 FAIL on all three pages. Deferred: 2026 date, venue, cause and fee (TODO(owner) in `index.html` and `register.html`); named fallback contact; `og:image` (needs the final absolute URL); CI workflow (T1); `AGENTS.md` invariant 10 and `docs/UI.md` still name impeccable as the design process.

- 2026-11-04 — **Registration form link.** The public responder link is in `register.html` only. Opening it in a signed-out browser stopped at a Google sign-in page, so the form is not yet reachable without a Google account.

- 2026-11-04 — **Registration moves to Google Forms (PLAN §5 Q4).** `register.html` will link out to an organizer-owned Google Form with a linked response Sheet; no Apps Script, custom form or `register.js`. Rewrote `docs/REGISTRATION.md`; updated `AGENTS.md` (invariants 1–5, 8, gotchas), `docs/PLAN.md`, `docs/DEPLOY.md`, `docs/KICKOFF.md`, `docs/UI.md`, `PRODUCT.md`.

- 2026-11-04 — **`/impeccable init`.** `PRODUCT.md` written from the planning docs plus owner answers: single recurring event; English with organizer-provided Cebuano phrases; logo, brand colors/fonts, consented photos and sourced numbers exist (not yet in repo); existing brand is a loose reference only. `.impeccable/config.json` records `buildPath: comp`. Still open in PLAN §5: one-line description and who runs it, next event details, domain, privacy law/contact.

- 2026-11-04 — **Planning docs.** `AGENTS.md`, `docs/PLAN.md`, `docs/KICKOFF.md`, `docs/REGISTRATION.md`, `docs/MILESTONES.md`, `docs/UI.md`, `docs/DEPLOY.md`. No site code yet; T0 questions are open in PLAN §5.
