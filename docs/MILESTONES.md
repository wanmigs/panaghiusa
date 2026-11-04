# MILESTONES — writing up past events

The milestones page is the site's proof: it tells a newcomer this has happened before, people came, and it mattered. It's only worth anything if it's true.

## 1. Page structure

- Intro: one or two sentences on how long Panaghiusa has been running, plus the headline totals across all events (only if the owner supplies them, with source).
- Timeline, **newest first**, one `<article>` per event.
- Closing call to action: register for the next event (link to `register.html`).

No JavaScript is required to read the page. Filters, a year jump list or a lightbox may be added later as progressive enhancement, only when there are enough entries to need them (> ~10).

## 2. Entry template

Copy this block, newest event at the top of the `<ol class="milestones">` list:

```html
<li>
  <article class="milestone" id="edition-2025-cebu-community-day">
    <!--
      Source: <who gave these facts, and when — e.g. "Maria (organizer), message 2026-11-04">
      Photo consent: <how consent was obtained — e.g. "attendees signed photo release at registration desk">
    -->
    <h3 class="milestone__title">Community Day 2025</h3>
    <p class="milestone__meta">
      <time datetime="2025-08-16">16 August 2025</time> · Cebu City
    </p>
    <ul class="milestone__stats">
      <li><strong>320</strong> attendees</li>
      <li><strong>45</strong> volunteers</li>
    </ul>
    <p class="milestone__summary">Two or three sentences: what happened and what it achieved.</p>
    <figure class="milestone__photo">
      <img src="assets/img/2025-cebu-community-day/hero.webp"
           alt="Volunteers handing out food packs under a covered court"
           width="1200" height="800" loading="lazy" decoding="async">
      <figcaption>Optional caption.</figcaption>
    </figure>
  </article>
</li>
```

- `id`: `edition-YYYY-place-short-name`, kebab-case (html-validate needs ids to start with a letter) — makes each event linkable and shareable.
- The example values above are placeholders for the template only. Never ship them.
- Stats are optional. Leave a stat out rather than guess it (AGENTS invariant 6). Use the organizer's exact figure; write "about 300" only if they said "about".
- The first (newest) entry's photo may drop `loading="lazy"` if it's above the fold.

## 3. Source notes (required)

Every entry carries an HTML comment naming who supplied the facts and when. It isn't visible on the page but is visible in the repo and in "view source" — so write names the person is comfortable having public (a first name and role is enough). If a figure is later corrected, update it and the source note in the same commit.

## 4. Photos

- **Consent:** identifiable people (especially minors) only with consent the organizers can point to; record how in the entry's comment. When in doubt, use a crowd-from-behind, venue or hands-at-work shot.
- **Format:** AVIF or WebP, ≤ 1600 px long edge, ≤ 250 KB. Keep the original out of the repo. Always set `width` and `height` to the real pixel size to prevent layout shift.
- **Alt text:** describe what matters in the photo for this event, not "image of". Purely decorative images get `alt=""`.
- **Folder:** `assets/img/<entry id>/`.

## 5. Adding an event (organizer checklist)

1. Gather: date, place, name, 2–3 sentence summary, any numbers (with who gave them), 1–3 photos (with consent).
2. Add the entry block at the top of the list; add photos to the folder.
3. Open the page locally (`python3 -m http.server`) on a phone-sized window and check it reads right.
4. Open a PR; CI checks markup, links and design rules.
5. Update the home page's "recent milestones" preview if it shows the newest events.
