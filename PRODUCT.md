# Product

## Platform

web

## Stack

Plain static HTML + CSS + vanilla JS modules, no framework, no build step, served from the repository root on GitHub Pages (locked in `docs/PLAN.md` §3). Registration happens in a Google Form the organizers own, linked out from `register.html` (not embedded); responses go to a linked Google Sheet (`docs/REGISTRATION.md`).

## Users

- **Prospective attendee** — mostly CDO MAS-AMiCUS alumni and their families; arrives on a phone from a link shared in Messenger, Facebook or a group chat, often on mobile data. Job: understand what Panaghiusa is, when and where the next one is, whether it's for them, and register fast.
- **Past attendee** — same arrival path. Job: find the event they were at, share it, register again.
- **Partner / sponsor** — usually sent by an organizer, often on desktop. Job: judge the track record from milestones, numbers and photos.
- **Organizer** — works in the repo and the Google Sheet, not on the site. Job: read registrations, add a milestone, open or close registration without a developer.

## Product Purpose

Panaghiusa ("unity") is the yearly gathering of the **CDO MAS-AMiCUS Alumni** in Cagayan de Oro, held around November–December. Every edition is now **for a cause**: the gathering raises funds for a named beneficiary (2025: House of Hope Lumbia — medicines, a hospital bed, cleaning materials — and a church CR renovation). Registration carries a fee that covers the cause plus what attendees receive (2025: ₱999, alumni shirt and dinner). The site exists to do two things: get people registered for the next edition in under two minutes on a phone, and show what past editions achieved so a first-time visitor trusts that it is real and worth joining. Success is a registration that lands in the organizers' Sheet, and a newcomer who believes the milestones.

## Positioning

The proof is the past editions themselves: real photos, real places, organizer-sourced numbers, and what each edition's cause actually received. No neighboring event can borrow that record; the site's credibility rests entirely on it staying true. Registering is both joining the alumni and giving to the cause.

## Operating Context

- Traffic is mostly shared links opened on phones; the Open Graph card is often the first impression.
- Registration happens on a phone, sometimes on a weak connection. The site's job is the hand-off: event details and privacy summary, then one tap to the Google Form. The form itself looks like Google's and its confirmation screen is set in the form, not on the site.
- Organizers maintain content by editing HTML from the templates in `docs/MILESTONES.md`, and open/close registration with two switches: `data-registration="open|closed|soon"` on the page and *Accepting responses* on the form.
- Registration windows open and close; the site must stay useful when registration is closed.
- Payment happens outside the site: the Google Form's description carries the payment details (GCash / GoTyme), and the form asks for the payment reference number. The site shows the fee and what it covers; it never shows account numbers or payment QR codes.
- Until now, editions were promoted with a Facebook poster and a group chat (`@CDOCD MAS-AMiCUS ALUMNI`); the site replaces the poster as the shareable link.

## Capabilities and Constraints

- Pages: Home, Register, Milestones, 404. v1 scope and exclusions in `docs/PLAN.md` §4 (no accounts, payments, CMS, blog, multi-event forms).
- Static only; no server the organizers run. Relative URLs only (may be served from a GitHub Pages sub-path).
- The form asks only the questions in `docs/REGISTRATION.md` §2, without requiring Google sign-in; privacy summary on the page before the Register link and in the form; no analytics.
- Performance budget: ≤ 200 KB HTML+CSS+JS gzip per page, AVIF/WebP images, at most two web font files, no carousels or autoplay video.
- Language: English, with Cebuano/Bisaya phrases only where the organizers provide them. Never machine-translate or invent Cebuano copy.
- Panaghiusa 2026: Sunday 29 November 2026, 5:00–8:00 PM, Pearlmont Hotel, Cagayan de Oro City.
- Undecided (owner to supply, `docs/PLAN.md` §5): Panaghiusa 2026's cause, fee and inclusions, deadline and contact person; domain; applicable privacy law and data contact; which edition each photo is from.

## Brand Commitments

- Name: **Panaghiusa** ("unity").
- A logo and existing brand colors/fonts are in use elsewhere (posters: green-dominant 2025 poster and alumni shirt, peach-and-maroon 2023 poster). The owner treats them as a **loose reference only**; the web direction is open to a fresh approach.
- No logo file on the site: "Panaghiusa" is set as a typographic wordmark.
- Warm and communal rather than corporate; respect the Cebuano/Visayan cultural context without motifs that caricature it.

## Evidence on Hand

The owner's original photo set (optimized into `assets/img/`; the full-size originals were removed from the repo on 2026-11-04 and remain in git history):

- Large group photos: green alumni shirts with a "MAS AMiCUS Alumni CDO District" banner outside House of Hope Foundation, Lumbia; two formal year-end gala group photos (gowns and suits, balloon backdrops).
- Venue: a hall with carved-wood paneling, a balloon arch and a "CDO MAS AMICUS ALUMNI PANAGHIUSA" sign.
- Outreach: volunteers with an MPC Balingasag Power Station banner at Magayad Integrated School (seedlings, schoolchildren) and at a dam viewpoint; a small group at the Magayad school sign.
- Posters: "2023 Panaghiusa Year-End Celebration" (26 Nov 2023, Garnet Function Hall, De Luxe Hotel, CDO; guest speaker Dr. Jimmy V. Adil, Jr.; ₱800, a portion donated to the MAS-AMiCUS CDO Organization) and "Panaghiusa 2025 for a Cause" (13 Dec 2025, House of Hope; ₱999 with shirt and dinner). Posters are reference material, not shippable images: they carry personal phone numbers and payment QR codes.

The owner confirms photos have consent (record it per entry, `docs/MILESTONES.md` §4); several include children. Past-edition numbers exist with organizers but aren't in the repo yet, and each needs its source (`docs/MILESTONES.md` §3).

Absent and never to be fabricated: testimonials, quotes, sponsor logos, any figure without an organizer source, stock photos of strangers standing in for attendees.

## Product Principles

1. **Registration is the job.** Every page leads to registering for the next edition, or to the next useful step when registration is closed.
2. **True or absent.** A number, photo or claim ships only with a source the organizers can point to; leave it out rather than guess.
3. **Phone on mobile data first.** If it is slow or awkward on a shared-link phone visit, it is broken.
4. **Real people, not templates.** Past editions' photos and places carry the story; generic imagery dilutes the proof.
5. **Organizers can run it.** Routine updates (a new milestone, opening/closing registration) stay simple enough to do without a developer.

## Accessibility & Inclusion

WCAG AA as a floor: visible labels on every input, errors announced and tied to fields, full keyboard use with visible focus and a skip link, text contrast ≥ 4.5:1, `prefers-reduced-motion` respected, tap targets ≥ 44 px, layout holds from 320 px. `inspect.mjs` FAIL findings block merge (`docs/UI.md` §5).
