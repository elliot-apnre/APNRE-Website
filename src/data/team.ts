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
    bio: 'Jenny is a Property Manager at APN, working with landlords and tenants for more than two years. She owns an investment property herself, so she manages other people’s properties the way she’d want her own managed. Outside work, she’s usually at the gym, spending time with family and friends, or travelling.',
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
    role: 'Property Manager / Sales Representative',
    initials: 'MB',
    photo: marissaPhoto,
    group: 'property-management',
    // This photo is framed noticeably tighter/closer than the others —
    // nudge the crop down slightly so it reads more like a standard
    // shoulders-up headshot until it can be reshot. Tune or remove once a
    // consistent photo is in.
    focalPoint: 'center 15%',
    bio: 'Marissa is a Property Manager and Sales Representative at APN, with four years of property management experience — covering tenant screening, lease management and maintenance for landlords, as well as sales. Outside work, she’s the team manager for her son’s local footy team, alongside her husband, who coaches — and otherwise usually active or spending time with family and friends.',
  },
  {
    name: 'Patrick Nhim',
    role: 'Director',
    initials: 'PN',
    photo: patrickPhoto,
    group: 'leadership',
    bio: 'Patrick founded the business — originally Adelaide Property Network, now APN Real Estate — and leads its sales team today. Property management sits alongside that sales work rather than apart from it, so Patrick has direct oversight of how the two sides operate together, and a day-to-day view of the Adelaide and Mount Gambier markets that informs decisions made on the property management side for owners.',
  },
  {
    name: 'Brett David',
    role: 'Regional Manager / Head of Leasing & Accounts',
    initials: 'BD',
    photo: brettPhoto,
    group: 'leadership',
    bio: 'Brett is APN’s Regional Manager and Head of Leasing & Accounts, and a licensed sales agent. He’s worked in property management for more than six years, managing rental properties for APN landlords and looking after the accounts side of the business. Outside work, he’s usually found fishing in local club tournaments.',
  },
];
