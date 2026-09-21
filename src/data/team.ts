import patrickPhoto from '../assets/team/patrick-nhim.jpg';
import brettPhoto from '../assets/team/brett-david.jpg';
import jennyPhoto from '../assets/team/jenny-saffin.jpg';
import lukePhoto from '../assets/team/luke-whittaker.jpg';
import marissaPhoto from '../assets/team/marissa-bowell.jpg';

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  photo: string;
  /** Short intro copy. Placeholder text below — replace with real bios
   *  before launch (see docs/team-photos-and-bios.md). */
  bio: string;
  /** CSS object-position for the portrait crop, e.g. 'center 20%'.
   *  Use this to fix inconsistent framing between photos without needing
   *  to re-crop the source image. Defaults to 'center' if omitted. */
  focalPoint?: string;
}

// Everyone shown the same way, one grid, no separate "leadership" tier.
//
// TODO (content): every bio below is a placeholder — swap for 2-3 real
// sentences per person (background, how long at APN, an area of focus).
// See docs/team-photos-and-bios.md for the brief + a template to send to
// each person.
export const TEAM: TeamMember[] = [
  {
    name: 'Jenny Saffin',
    role: 'Property Manager',
    initials: 'JS',
    photo: jennyPhoto,
    bio: 'PLACEHOLDER — 2–3 sentences on Jenny’s background, focus area, and what landlords can expect working with her.',
  },
  {
    name: 'Luke Whittaker',
    role: 'Property Manager / Sales Agent',
    initials: 'LW',
    photo: lukePhoto,
    bio: 'PLACEHOLDER — 2–3 sentences on Luke’s background, focus area, and what landlords can expect working with him.',
  },
  {
    name: 'Marissa Bowell',
    role: 'Property Manager / Sales Agent',
    initials: 'MB',
    photo: marissaPhoto,
    // This photo is framed noticeably tighter/closer than the others —
    // nudge the crop down slightly so it reads more like a standard
    // shoulders-up headshot until it can be reshot. Tune or remove once a
    // consistent photo is in.
    focalPoint: 'center 15%',
    bio: 'PLACEHOLDER — 2–3 sentences on Marissa’s background, focus area, and what landlords can expect working with her.',
  },
  {
    name: 'Brett David',
    role: 'Property Manager / Accounting',
    initials: 'BD',
    photo: brettPhoto,
    bio: 'PLACEHOLDER — 2–3 sentences on Brett’s background, focus area, and what landlords can expect working with him.',
  },
  {
    name: 'Patrick Nhim',
    role: 'Director',
    initials: 'PN',
    photo: patrickPhoto,
    bio: 'PLACEHOLDER — 2–3 sentences on Patrick founding APN, his sales-side background, and what he oversees today.',
  },
];
