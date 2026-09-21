import patrickPhoto from '../assets/team/patrick-nhim.jpg';
import brettPhoto from '../assets/team/brett-david.jpg';
import jennyPhoto from '../assets/team/jenny-saffin.jpg';
import lukePhoto from '../assets/team/luke-whittaker.jpg';
import marissaPhoto from '../assets/team/marissa-bowell.jpg';

export type TeamGroup = 'property-management' | 'leadership';

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  photo: string;
  group: TeamGroup;
  /** Concise, factual, role-based copy — no invented biographical detail
   *  (years of experience, personal history, etc). Replace with a real
   *  first-person bio if/when APN supplies one; see
   *  docs/team-photos-and-bios.md. */
  bio: string;
  /** Direct phone/email — only set once verified with APN. Never invent
   *  these; a landlord seeing a wrong number is worse than seeing none. */
  phone?: string;
  email?: string;
  /** CSS object-position for the portrait crop, e.g. 'center 20%'.
   *  Use this to fix inconsistent framing between photos without needing
   *  to re-crop the source image. Defaults to 'center' if omitted. */
  focalPoint?: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Jenny Saffin',
    role: 'Property Manager',
    initials: 'JS',
    photo: jennyPhoto,
    group: 'property-management',
    bio: 'Jenny manages a portfolio of rental properties for APN landlords — inspections, maintenance and day-to-day tenant communication.',
  },
  {
    name: 'Luke Whittaker',
    role: 'Property Manager',
    initials: 'LW',
    photo: lukePhoto,
    group: 'property-management',
    bio: 'Luke manages a portfolio of rental properties for APN landlords, keeping tenancies running smoothly and owners informed.',
  },
  {
    name: 'Marissa Bowell',
    role: 'Property Manager',
    initials: 'MB',
    photo: marissaPhoto,
    group: 'property-management',
    // This photo is framed noticeably tighter/closer than the others —
    // nudge the crop down slightly so it reads more like a standard
    // shoulders-up headshot until it can be reshot. Tune or remove once a
    // consistent photo is in.
    focalPoint: 'center 15%',
    bio: 'Marissa manages a portfolio of rental properties for APN landlords, from routine inspections through to maintenance requests.',
  },
  {
    name: 'Brett David',
    role: 'Property Manager / Accounts',
    initials: 'BD',
    photo: brettPhoto,
    group: 'property-management',
    bio: 'Brett manages a portfolio of rental properties for APN landlords and looks after the accounts side of property management, including rent disbursements to owners.',
  },
  {
    name: 'Patrick Nhim',
    role: 'Director',
    initials: 'PN',
    photo: patrickPhoto,
    group: 'leadership',
    bio: 'Patrick founded APN and leads the business’s sales team, with oversight across the property management side of the business.',
  },
];
