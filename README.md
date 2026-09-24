# APN Real Estate — Landlord Acquisition Landing Page (V2)

A tight, single-objective marketing campaign page (React + TypeScript +
Vite) built to convert landlords into property-management leads for APN
Real Estate. This is a paid-campaign landing page, not a general company
website — every section is built to move a landlord toward the rental
appraisal form.

## Pages

- `/`: the campaign landing page (structure below)
- `/adelaide/` and `/mount-gambier/`: office pages, each with an office
  intro, that office's team, success stories and examples of work. See
  `docs/office-pages.md` for how to add stories and work examples.
- `/privacy/`: privacy policy, linked from the footer and the form.
  Update it whenever the form, analytics or ad tracking changes.

## Homepage structure

1. Hero — dual conversion paths: get an appraisal, or "thinking of
   changing property managers"
2. Landlord pain (3 concise points)
3. Why APN (3 concrete, defensible reasons — no competitor comparisons)
4. Property management team — Jenny Saffin, Luke Whittaker and Marissa
   Bowell prominent; Brett David and Patrick Nhim in a smaller
   "Leadership" line so the founder story doesn't dominate
5. Proof — real photography, no hardcoded review/rating/leasing figures
   (see note below)
6. Switching from another property manager — a prominent, full-bleed
   photo section, not an afterthought
7. Free rental appraisal form — shared by both conversion paths
8. Short FAQ (5 questions)
9. Final CTA

## Running it

```bash
npm install
npm run dev        # local dev server
npm run build       # production build -> dist/
npm run preview     # preview the production build
```

`dist/` is fully static — deploy it to any static host (Netlify, Vercel,
S3 + CloudFront, cPanel, etc).

## Launch-blocking items — status

**1. Enquiry form — connected.**
`src/components/AppraisalForm.tsx` posts to `/api/lead`
(`functions/api/lead.ts`, a Cloudflare Pages Function), which forwards
to a Google Sheet via an Apps Script webhook. See
`docs/google-sheet-lead-webhook.md` for the webhook setup and
`SHEETS_WEBHOOK_URL` in Cloudflare Pages' environment variables.

**2. Reviews link — connected.**
`src/components/Proof.tsx`'s `REVIEWS_PROFILE_URL` points at APN's real
realestate.com.au agency profile. Rating/review-count/leasing-volume
figures are still deliberately not hardcoded anywhere on the page —
those move over time and a stale number undermines trust more than no
number does.

**3. Production domain — confirmed: `apnre.com.au`.**
`index.html`'s canonical URL, Open Graph tags, and Twitter card tags
all point at `https://apnre.com.au/`.

## Already fixed / already real

- Favicon and Apple touch icon: generated from your actual supplied logo
  mark (`public/favicon-32.png`, `favicon-180.png`, `apple-touch-icon.png`)
- Open Graph share image: generated (`public/og-cover.jpg`, 1200×630),
  on-brand, no placeholder
- Team: real portraits, verified names/roles, prioritised per the brief
- Photography: real property/view photos and real "agent at work" and
  "sold" photos — no stock photography, no AI-generated people
- Copy: rewritten to remove comparative/unsubstantiated claims (e.g. no
  "not a call centre" type lines) — every claim about APN is either
  verifiable or a plain statement of intent/philosophy
- Phone number used for `tel:` links (`1300 123 276`) was sourced from a
  supplied sign photo — confirm this is the right line for property
  management enquiries specifically, as opposed to a sales-specific one

## Structure

```
src/
  components/     one file per section, in page order
  data/team.ts    the team, with each person's group and office
  data/offices.ts office intros, addresses, stories, work examples
  data/business.ts phone number, ABN / RLA / legal name for the footer
  partials/       <head> markup shared by every page (fonts, analytics)
  main.tsx        homepage entry; office-main.tsx is the office pages'
  assets/
    logo/         APN logo files: main (Adelaide Property Network),
                  Mount Gambier version, and the star mark
    photos/       supplied property/agent/sold-sign photography
    team/         supplied team portraits, cropped to 3:4
  index.css       design tokens + all section styles
public/
  favicon-32.png, favicon-180.png, apple-touch-icon.png, og-cover.jpg
  404.html        served with a real 404 for every unknown path; its
                  presence also disables Cloudflare Pages' SPA fallback
  robots.txt, sitemap.xml
```

## Design notes

- Colour palette sampled directly from the supplied logo: lime `#8dc600`,
  brand grey `#6d6e71`, on a custom charcoal/warm-white system. The logo
  lime is the only green. It's too light for text on the paper
  background, so text there is charcoal, and the lime goes on fills,
  rules and underlines. Don't reintroduce darker "accessible" greens:
  they read as a different, muddier brand colour.
- Logos: the Adelaide Property Network logo is the main brand logo, in
  the header on the homepage and the Adelaide page (and on the 404).
  The Mount Gambier page uses the Mount Gambier version. Both are set in
  `src/data/offices.ts`. The footer uses the star mark plus "APN Real
  Estate" (`src/components/Logo.tsx`), since the full logo's grey
  lettering doesn't read on the charcoal footer.
- Typefaces: Archivo (headings) + Public Sans (body), loaded via Google
  Fonts in `index.html`.
- No AI-generated people or stock "shaking hands" photography anywhere —
  every photo is either your supplied material or a plain graphic device.
- The hero uses `display: flex` to bottom-align its content; its content
  block has an explicit `width: 100%` to stop it shrink-wrapping as a
  flex item — if you restructure the hero, keep that in mind or the
  headline will overflow on narrow viewports again.
