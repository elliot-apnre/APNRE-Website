import balconyView from '../assets/photos/balcony-view-hills.jpg';
import adelaideLogo from '../assets/logo/adelaide-property-network-logo.png';
import mountGambierLogo from '../assets/logo/mount-gambier-property-network-logo.png';

export type OfficeId = 'adelaide' | 'mount-gambier';

/** A real client testimonial. Only add these with the client's OK and
 *  exactly as they said/wrote it — never paraphrase into something they
 *  didn't say, and never invent one. */
export interface SuccessStory {
  quote: string;
  /** How the client is named on the page, e.g. 'Sarah T., landlord'. */
  attribution: string;
  suburb?: string;
  /** Where it came from, e.g. 'realestate.com.au review' — optional, but
   *  a linkable source makes a testimonial far more credible. */
  sourceLabel?: string;
  sourceUrl?: string;
}

/** A real property APN has worked on. The photo must be of that actual
 *  property (import it from src/assets/photos/). Keep captions factual:
 *  what happened, not how impressive it was. */
export interface WorkExample {
  photo: string;
  alt: string;
  /** Short label, e.g. street + suburb: 'Fenden Road, Salisbury'. */
  title: string;
  /** One or two plain sentences, e.g. 'Leased within two weeks of
   *  listing after a pre-lease maintenance round.' Only verified facts. */
  description?: string;
  /** e.g. 'Leased', 'Managed', 'Sold'. */
  tag?: string;
}

export interface Office {
  id: OfficeId;
  name: string;
  /** Public URL path — matches the folder name of the HTML entry. */
  path: string;
  /** Office-branded logo shown in the header on this office's page
   *  (the homepage keeps the APN group logo). */
  logo: string;
  logoAlt: string;
  addressLines: [string, string];
  phone: string;
  /** Must be a real photo from this area. Leave unset to show a plain
   *  dark hero rather than borrowing another office's photography. */
  heroPhoto?: string;
  heroAlt?: string;
  /** CSS object-position for the hero image. */
  heroFocalPoint?: string;
  lede: string;
  /** The office "bio" — a few short paragraphs. Keep it to facts APN has
   *  confirmed: who works there, where it is, what it does. */
  about: string[];
  reviewsUrl: string;
  /** Both lists are hidden on the page while empty, so nothing
   *  placeholder-y ever goes live. Add real entries to make each
   *  section appear. */
  successStories: SuccessStory[];
  workExamples: WorkExample[];
}

// APN's realestate.com.au agency profile (also used in Proof.tsx). If
// Mount Gambier has its own profile, swap its reviewsUrl for that one.
const REA_PROFILE_URL = 'https://www.realestate.com.au/agency/adelaide-property-network-blair-athol-JIASZF';

export const OFFICES: Record<OfficeId, Office> = {
  adelaide: {
    id: 'adelaide',
    name: 'Adelaide',
    path: '/adelaide/',
    logo: adelaideLogo,
    logoAlt: 'Adelaide Property Network',
    addressLines: ['Level 1 / 420B, Cnr Main North Road', 'and Barton Street, Blair Athol SA 5084'],
    phone: '1300 123 276',
    heroPhoto: balconyView,
    heroAlt: 'View across the Adelaide hills from one of the properties APN manages',
    heroFocalPoint: 'center 78%',
    lede: 'Property management for Adelaide landlords from our Blair Athol office — with a named property manager you can reach directly.',
    about: [
      'APN Real Estate began in Adelaide as Adelaide Property Network, founded by Patrick Nhim. Our Adelaide office is in Blair Athol, on the corner of Main North Road and Barton Street.',
      'It’s home to Patrick, who leads the sales team, Brett David, who heads up leasing and accounts, and property manager Marissa Bowell — so property management and sales work side by side, with a day-to-day view of the Adelaide market.',
    ],
    reviewsUrl: REA_PROFILE_URL,
    successStories: [],
    workExamples: [],
  },
  'mount-gambier': {
    id: 'mount-gambier',
    name: 'Mount Gambier',
    path: '/mount-gambier/',
    logo: mountGambierLogo,
    logoAlt: 'Mount Gambier Property Network',
    addressLines: ['178 Commercial Street East,', 'Mount Gambier SA 5290'],
    phone: '1300 123 276',
    // Every photo supplied so far is from Adelaide (and the signage in
    // them reads "Adelaide Property Network"), so this hero is plain
    // until a real Mount Gambier photo is supplied — add it to
    // src/assets/photos/ and set heroPhoto/heroAlt here.
    lede: 'Property management for Mount Gambier landlords from a local team on Commercial Street East — with a named property manager you can reach directly.',
    about: [
      'Our Mount Gambier office is at 178 Commercial Street East, with a local team looking after Mount Gambier landlords and their properties.',
      'Property managers Luke Whittaker and Jenny Saffin manage the office’s rentals, and Bree runs reception — so when you call or walk in, you’re dealing with people who work in the local market every day.',
    ],
    reviewsUrl: REA_PROFILE_URL,
    successStories: [],
    workExamples: [],
  },
};

export const OFFICE_LIST: Office[] = [OFFICES.adelaide, OFFICES['mount-gambier']];
