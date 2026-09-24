# Office pages: /adelaide/ and /mount-gambier/

Each office has its own page with an office intro ("bio"), that office's
team, success stories, examples of work, and the same appraisal form,
switching section, and FAQ as the homepage. The homepage links to both
from the header, the hero's "Adelaide / Mount Gambier" line, an "Our
offices" strip under the team, and the footer.

## Where things live

| What | Where |
| --- | --- |
| Office intro, address, hero photo, stories, work examples | `src/data/offices.ts` |
| Who appears on which office page | `office:` on each person in `src/data/team.ts` |
| Page title / description / search snippet | `adelaide/index.html`, `mount-gambier/index.html` |
| Page layout (section order) | `src/OfficePage.tsx` |

## Adding a success story

Add an entry to that office's `successStories` array in
`src/data/offices.ts`:

```ts
successStories: [
  {
    quote: 'Exactly what the client said, word for word.',
    attribution: 'Sarah T., landlord',
    suburb: 'Salisbury',                    // optional
    sourceLabel: 'realestate.com.au review', // optional
    sourceUrl: 'https://…',                  // optional
  },
],
```

Only use real quotes, with the client's OK. Don't paraphrase a quote
into something the client didn't say. The section (and its "Stories"
nav link) stays hidden while the list is empty.

## Adding an example of work

1. Put the photo in `src/assets/photos/`. It has to be the actual
   property.
2. Import it at the top of `src/data/offices.ts` and add an entry to that
   office's `workExamples`:

```ts
import fendenRoad from '../assets/photos/sold-sign-fenden-rd.jpg';
// …
workExamples: [
  {
    photo: fendenRoad,
    alt: 'A Sold sign outside a property on Fenden Road, Salisbury',
    title: 'Fenden Road, Salisbury',
    tag: 'Sold',                        // optional: Leased / Managed / Sold
    description: 'One or two factual sentences.', // optional
  },
],
```

The section and its "Our Work" nav link stay hidden while the list is
empty.

## Hero photos

Each office's hero is set by `heroPhoto` / `heroAlt` in
`src/data/offices.ts`. Mount Gambier's is a street shot from APN's own
listing photography (4 Boandik Terrace). It's a sales listing, so the
alt text describes the street rather than claiming APN manages it. Use
exterior or empty-room shots only: interiors of occupied homes show the
owners' or tenants' belongings.

## Leads

The form on an office page sends a hidden `office` field. The lead then
shows up in the Google Sheet's Source column as e.g.
`apnre-website / mount-gambier page / appraisal form`, so no change to
the Apps Script is needed. The GA4 `generate_lead` event also carries an
`office` parameter (`adelaide`, `mount-gambier`, or `home`).

## Adding a third office later

1. Add the id to `OfficeId` and an entry to `OFFICES` / `OFFICE_LIST` in
   `src/data/offices.ts`.
2. Add the id to `KNOWN_OFFICES` in `functions/api/lead.ts`.
3. Copy `adelaide/index.html` to `<id>/index.html`, then update its meta
   tags, structured data and `data-office`.
4. Add it to `rollupOptions.input` in `vite.config.ts` and to
   `public/sitemap.xml`.
