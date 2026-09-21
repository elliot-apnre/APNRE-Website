# Team section: photo consistency + bios

## Photos

All five photo boxes (the team is now one grid, no separate leadership
tier) are already a fixed, identical size (`.team__portrait` is a 3:4 box
with `object-fit: cover` in `src/index.css`) — so the *boxes* are
consistent. What's inconsistent is the source photos themselves:

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

`src/data/team.ts` now has a `bio` field on every one of the five team
members, rendered the same way for everyone (a short paragraph under name
and role). Every value is currently a `PLACEHOLDER —` string — the site
will visibly show that placeholder text until it's replaced, on purpose,
so it can't accidentally ship silently blank or with lorem ipsum.

To fill these in, the fastest path is a short async brief to each person —
something like:

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
