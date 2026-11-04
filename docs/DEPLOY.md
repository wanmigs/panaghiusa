# DEPLOY — GitHub Pages and the registration form

## 1. GitHub Pages

1. Push the repo to GitHub (public, or private with a plan that allows Pages).
2. **Settings → Pages → Build and deployment:** Source *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Keep the empty `.nojekyll` file at the root.
4. The site goes live at `https://<user-or-org>.github.io/panaghiusa/` within a minute or two of each push to `main`.

Protect `main` (**Settings → Branches**): require the `check` workflow to pass and one review before merge. Every merge is a deploy.

## 2. Check workflow

`.github/workflows/check.yml` runs on pull requests and pushes to `main`: start `python3 -m http.server 8000`, then the commands in `AGENTS.md` → **Commands** (`html-validate`, taste `lint.mjs` and `inspect.mjs`, `linkinator`). It doesn't deploy — Pages deploys from the branch.

## 3. Custom domain (optional, PLAN §5 Q6)

1. At the DNS provider: for an apex domain, `A` records to GitHub Pages' IPs (see GitHub docs "Managing a custom domain"); for a subdomain, a `CNAME` to `<user-or-org>.github.io`.
2. **Settings → Pages → Custom domain**: enter it; this commits a `CNAME` file. Wait for the DNS check, then tick **Enforce HTTPS**.
3. Verify the domain in the account/org settings (prevents takeover if Pages is ever disabled).
4. Retest every page: moving from the sub-path to the root shouldn't change anything if links are relative (AGENTS invariant 7).

## 4. Registration form

1. In the organizers' shared Google account (not a personal one that may leave), create the Google Form for the edition with the questions and settings in REGISTRATION §2 and §4.
2. *Responses → Link to Sheets → Create a new spreadsheet.* Share the form editor and the Sheet only with named organizers.
3. *Send → link* (optionally *Shorten URL*). That responder link goes in `register.html` as the Register `href`. Never commit the `/edit` URL or the Sheet link.
4. Submit one test response while signed out of Google, check it in the Sheet, then delete it from the form and the Sheet.

## 5. Opening and closing registration

- Open: form *Accepting responses* on; in `register.html` set `data-registration="open"` on `<main>`, update the form link and the event details on Home and Register. One PR.
- Close: form *Accepting responses* off (with a closed message pointing to the site), and `data-registration="closed"`. Do both — the form switch stops old shared links, the page switch stops new visitors.

## 6. Launch checklist

- [ ] All pages load on the real Pages URL (or custom domain) with HTTPS
- [ ] `og:image`, `og:url` and `twitter:image` use the live domain (`https://panaghiusa.info/`), and a link-preview checker shows the poster
- [ ] Real registration from a phone on mobile data, via the site's Register link, appears in the form's response Sheet (then delete it from the form and the Sheet)
- [ ] Shared link in Messenger / Facebook shows the OG title, description and image
- [ ] 404 page shows for a mistyped URL
- [ ] Privacy notice on `register.html` and in the form description reviewed by the owner (REGISTRATION §6)
- [ ] `docs/PROGRESS.md` has the live URL and launch date
