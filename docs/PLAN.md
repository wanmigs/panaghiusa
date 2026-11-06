# PLAN — Panaghiusa

## 1. Product in one paragraph

A small public website for **Panaghiusa** ("unity"). It does two things: lets people **register** for the next event in under two minutes on a phone, and shows the **milestones of past events** — what happened, where, how many came, what it achieved — so a first-time visitor trusts that this is real and worth joining. It runs free on GitHub Pages and the organizers can keep it up to date without a developer for routine changes (a new milestone, opening/closing registration).

## 2. Audience

| Who | Arrives from | Needs |
|---|---|---|
| **Prospective attendee** | A link shared in Messenger / Facebook / group chats, on a phone | What is this, when and where, is it for me, register fast |
| **Past attendee** | Same | See the event they were at, share it, register again |
| **Partner / sponsor** | Link from an organizer, often on desktop | Proof of track record: milestones, numbers, photos |
| **Organizer** | — (works in the repo and the Google Sheet) | Read registrations in a Sheet; add a milestone; open/close registration |

## 3. Locked decisions

| Area | Decision | Why |
|---|---|---|
| Hosting | GitHub Pages, deploy from `main` branch, repository root | Free, no server, organizers already use GitHub |
| Stack | Plain HTML + CSS + vanilla JS modules; no framework, no build step | Three pages; nothing to compile means nothing to break |
| Registration | **Google Form** owned by the organizers, responses linked to a Google Sheet. `register.html` shows the event and privacy summary and links out to the form (`docs/REGISTRATION.md`). Decided 2026-11-04 | Free, no code to maintain or break, Google handles validation, confirmation and storage, and organizers can edit questions and open/close it themselves. Trade-off: the form looks like Google's, not the site's, and duplicates are cleaned up in the Sheet |
| Milestones content | Written directly in `milestones.html` from the template in `docs/MILESTONES.md` | No CMS or data-fetching JS; works without JS and is indexable |
| Design | **design-taste-frontend** skill (`.agents/skills/design-taste-frontend/`), direction in `.taste-skill/direction.json`, `PRODUCT.md` at the root (`docs/UI.md`). Switched from impeccable 2026-11-04 | Avoids the generic "AI template" look; dealt direction plus a browser inspector as the gate |
| Checks | `html-validate`, taste `lint.mjs` and `inspect.mjs`, `linkinator` in a GitHub Actions workflow | Catches broken markup, slop, contrast and dead links before deploy |
| Analytics | None in v1 | Nothing to consent to; add a privacy-friendly one later only if organizers ask |

## 4. Scope

**v1:** Home, Register, Milestones; registration open/closed/soon state with a link to the Google Form; privacy notice; Open Graph images for sharing; 404 page; responsive and accessible; GitHub Pages deploy; custom domain if chosen.

**Not v1:** user accounts, processing payments on the site (the fee is shown on the site and paid via GCash / GoTyme per the form's instructions; `docs/REGISTRATION.md` §2), ticketing, emailing registrants from the site (organizers use the Sheet), admin UI, CMS, multiple simultaneous events with separate forms, comments, a blog. Don't build hooks "for later" for these.

## 5. Open questions (KICKOFF T0 — ask before coding)

| # | Question | Default if not answered |
|---|---|---|
| 1 | What is Panaghiusa (organization? recurring event?), its one-line description, and who runs it? | Placeholder copy marked `TODO(owner)` — never invented facts |
| 2 | Next event: name, date, time zone, venue, capacity, registration open/close dates | Registration page shows "Registration opens soon" until filled |
| 3 | Registration fields beyond name / email / phone | `docs/REGISTRATION.md` §2 default set |
| 4 | Registration backend | **Answered 2026-11-04:** Google Form, linked out from `register.html` (not embedded) |
| 5 | Language(s): English only, or English + Cebuano/Bisaya (or another) | English, with Cebuano phrases only where the owner provides them |
| 6 | Domain: `<user>.github.io/panaghiusa` or a custom domain | GitHub Pages URL; custom domain added later (`docs/DEPLOY.md` §3) |
| 7 | Which data-privacy law applies (e.g. Philippine Data Privacy Act 2012, US state law) and who is the contact for data requests | Generic notice naming an organizer email; owner confirms before launch |
| 8 | Past events: list with dates, places, numbers (with source) and photos (with consent) | Milestones page ships with whatever the owner has provided; no placeholders on the live site |
| 9 | Brand assets: logo, colors, fonts, photos | design-taste-frontend deals a direction; owner approves |

Record answers here (replace the default column) with the date decided.

Answered so far (2026-11-04):

- **Q1:** the yearly gathering of the CDO MAS-AMiCUS Alumni in Cagayan de Oro; every edition is for a cause. Paid registration (2025: ₱999 with shirt and dinner); payment via GCash / GoTyme outside the site, reference number collected in the form.
- **Q2 (partial):** Panaghiusa 2026 is on Sunday 29 November 2026, 5:00–9:00 PM (Philippine time, UTC+8). The owner withdrew the Pearlmont Hotel venue and extended the end time to 9:00 PM on 2026-11-06; the venue is TBA. Still pending: venue, cause, fee and inclusions, capacity, registration close date.
- **Q5:** English, with Cebuano/Bisaya phrases only where the organizers provide them.
- **Q8 (partial):** consented photos and organizer-sourced numbers exist; not yet handed over.
- **Q9:** a logo and brand colors/fonts exist; treat them as a loose reference — the web direction is open.

## 6. Phases and exit criteria

| Phase | Deliverable | Exit |
|---|---|---|
| P0 Decisions | §5 answered | Owner has answered or accepted every default |
| P1 Skeleton + design context | Repo, `PRODUCT.md`, taste direction dealt, CI checks | CI green on an empty-but-valid page; owner approves the visual direction |
| P2 Registration | `register.html` + Google Form + linked Sheet | Every test in `docs/REGISTRATION.md` §7 passes |
| P3 Milestones | `milestones.html` with real entries | Every number has a source note; every photo of people has consent recorded |
| P4 Home + polish | `index.html`, 404, OG images | written critique ≥ owner's bar, `inspect.mjs` 0 FAIL on every page, Lighthouse mobile ≥ 95 on all four categories |
| P5 Launch | Pages live (custom domain if chosen) | Real submission from a phone on mobile data lands in the form's response Sheet; shared link shows the OG card |
