# REGISTRATION — Google Form, register page, privacy

## 1. Flow

```
register.html  ──plain link──▶  Google Form (organizers' account)
  event details                   ├─ questions from §2
  privacy summary                 ├─ confirmation message with a link back to the site
  "Register" button               └─ responses ──▶ linked Google Sheet (organizers own it)
```

The site never receives registration data. `register.html` explains the event, shows the privacy summary, and links to the Google Form. Google handles validation, submission, the confirmation screen and storage. No JavaScript is involved in registering.

## 2. Fields (default set — change only with the owner's agreement, PLAN §5 Q3)

One Google Form per event edition, titled with the edition's name and date.

| Question | Google Forms type | Required | Why we need it | Sheet column |
|---|---|---|---|---|
| Full name | Short answer, max length 120 (response validation) | yes | Name tag / attendance list | `Full name` |
| Email | Settings → *Collect email addresses: Responder input* | yes | Event updates | `Email Address` |
| Mobile number | Short answer | no | Day-of contact | `Mobile number` |
| City / area | Short answer | no | Plan logistics | `City / area` |
| How did you hear about us? | Dropdown | no | Know which channels work | `How did you hear about us?` |
| Payment reference number | Short answer, max length 60 | yes | Match the registration to the fee paid (GCash / GoTyme) | `Payment reference number` |
| Consent | Checkboxes, one option, required | yes | Lawful basis for storing their data | `Consent` |

Google adds `Timestamp` automatically.

**Fee and payment.** Each edition has a registration fee (2025: ₱999, alumni shirt and dinner). The site never handles payment: `register.html` states the fee, what it covers and that it supports the edition's cause; the **form description** carries the payment instructions (GCash / GoTyme account name and number, or a QR image uploaded in the form editor) and asks visitors to pay before submitting. Account numbers and payment QR codes never go in the repo — they change per edition, and the repo is public. Organizers reconcile reference numbers against their payment app. Nothing else: no date of birth, ID numbers, addresses or file uploads unless the owner gives a reason and §6 is updated. File-upload questions also force responders to sign in with Google, so they're out.

## 3. Register page behavior

- **Open:** event name, date (`<time datetime>`), time zone, venue; the cause; the fee and what it includes, with a line that payment details are in the form; a short "what to expect"; the privacy summary (§6) with a link to the full notice; then the primary action, a plain `<a href="<form URL>">Register</a>` styled as a button. Same tab (no `target="_blank"`), so the phone back button returns to the site. An "Add to calendar" `.ics` link is optional.
- **Closed / soon:** `<main data-registration="open|closed|soon">`. Closed and soon hide the Register link and show the next step (opening date, or "follow us for the next one"). Organizers flip one attribute **and** stop the form accepting responses (§4), so a cached page or an old shared link can't keep collecting.
- **Fallback:** under the button, "Trouble with the form? Message us at `TODO(owner)` contact." Always visible while open.
- The only form URL in the repo is the public responder link (§4). It appears once, in `register.html`.

## 4. Google Form setup

Create the form in the organizers' shared Google account, not a personal one that may leave.

- **Responses → Link to Sheets:** create a new spreadsheet. That Sheet is the registration list.
- **Settings → Responses:** *Collect email addresses: Responder input*; *Limit to 1 response* **off** (it forces Google sign-in, which loses people on a shared-link phone visit); *Allow response editing* off.
- **Settings → Presentation → Confirmation message:** event name, date, venue, what happens next, and the site URL to get back. Turn *Show link to submit another response* off.
- **Description** (top of the form): the fee, payment instructions (§2), the privacy summary from §6 and a link to the full notice.
- **Closing:** *Responses → Accepting responses* off, with a custom message pointing to the site for the next edition.
- **Link to use:** *Send → link* (the `…/viewform` URL or its `forms.gle` short link). Never commit the `/edit` URL or the response Sheet link (AGENTS invariant 5).
- A new edition gets a new form (or a copy). Update the link in `register.html` in the same PR that updates the event details.

## 5. Duplicates and spam

Without required sign-in, Google Forms can't stop the same person submitting twice. Organizers dedupe in the Sheet (sort by `Email Address`, or a `COUNTIF` helper column). If spam appears, the options in order: add a short "type the event's city" question; then turn on required sign-in, accepting that some visitors will drop off. Raise it in `docs/PLAN.md` first.

## 6. Privacy

- Short notice on `register.html` before the Register link **and** in the form description: who collects it, what for, that it's stored in Google Forms / Sheets, how long it's kept, how to ask for deletion. Both link the full notice (a section on `register.html` or `privacy.html`).
- Retention: delete responses (in the form **and** the Sheet) `TODO(owner)` months after the event (default 12). Put the date in the Sheet's first tab so it isn't forgotten.
- Access: share the form editor and the Sheet only with named organizers, never "anyone with the link".
- Applicable law and contact person: PLAN §5 Q7 — the owner confirms before launch.

## 7. Test cases (run before every release that touches registration or opens a new edition)

- `data-registration="open"`: the Register link opens the correct edition's form on a phone; back returns to `register.html`.
- Submit a test response without being signed in to Google → it lands in the linked Sheet with every column; confirmation message shows the right event and link back. Delete the test response from the form and the Sheet.
- Required questions block submission when empty; a malformed email is rejected.
- Form *Accepting responses* off → the old link shows the closed message. `data-registration="closed"` and `"soon"` → no Register link, next step shown.
- Privacy summary and fallback contact visible on `register.html`; keyboard only and VoiceOver can reach and activate the Register link.
