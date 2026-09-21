# Team section: photo consistency + bios

## Photos

The team is now split into two groups: **Property Management** (Jenny,
Luke, Marissa, Brett — a four-up grid, `.team__grid`) and **Leadership /
Sales** (Patrick — a wider single "spotlight" card, `.team__leader`, since
one person alone in a grid tile reads as an accident rather than a
deliberate layout). The four property-management photo boxes are a fixed,
identical size (`.team__portrait` is a 3:4 box with `object-fit: cover` in
`src/index.css`), so the *boxes* are consistent. What's inconsistent is the
source photos themselves:

- Jenny and Luke are shot at a similar distance/style (head-and-shoulders,
  office-window bokeh background).
- Marissa's photo is framed noticeably tighter/closer and has a different
  background, which reads as a different shoot.

Two ways to fix this, in order of how much it actually solves it:

1. **Reshoot (or ask for a comparable existing shot) so all three photos are
   the same distance, background style, and lighting.** This is the real
   fix — cropping can't manufacture a wider shot from a tight one.
2. **In the meantime**, `src/data/team.ts` now has an optional `focalPoint`
   field per person (CSS `object-position`) so you can nudge how a given
   photo sits inside its box without touching the image file. I've set
   Marissa's to `'center 15%'` as a starting guess to pull the crop back a
   bit — open the site and eyeball it; adjust the percentage (or remove the
   field to go back to plain `center`) until it looks right relative to the
   other two.

## Bios

`src/data/team.ts` has a `bio` field on every team member. Each one is
currently a short, factual, role-based line (what they manage, what the
role covers) rather than a personal biography — nothing invented about
experience, background or personal detail. That's a deliberate stand-in,
not a placeholder: it's true and fine to ship as-is, but it reads as a
job description rather than a person, which is worth improving.

To make these read more like actual people, the fastest path is a short
async brief to each person — something like:

> For the new website, we're adding a two-to-three sentence intro under
> your photo. Could you send me:
> - How long you've been in property management / at APN
> - Anything you focus on or are known for (e.g. maintenance, a particular
>   area, tenant relations)
> - One human detail if you're comfortable (a hobby, why you like the job,
>   etc.) — optional, but it's what makes these read as a person and not a
>   directory listing

Then it's a straight copy-paste into the `bio: '...'` line for that person
in `src/data/team.ts`. Happy to write the polished version from whatever
rough notes come back — just paste them in and ask.
