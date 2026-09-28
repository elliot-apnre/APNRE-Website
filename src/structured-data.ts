// Schema.org structured data (JSON-LD) for the homepage and office pages,
// built from the same data the pages show (src/data/) so the two can't
// drift apart. Written into each page's <head> at build time by
// src/pages-server.tsx; the blog's publisher refers to the same
// organisation by its @id (src/blog-server.tsx).
//
// Only verified details go in here. No ratings or review counts: those
// move over time, and a stale figure is worse than none (see Proof.tsx).

import { ABN, ACN, BUSINESS_NAME, LEGAL_ENTITY_NAME, PHONE_SCHEMA, RLA_NUMBER } from './data/business';
import { OFFICE_LIST, type Office } from './data/offices';

export const SITE = 'https://apnre.com.au';
export const ORGANIZATION_ID = `${SITE}/#organization`;
const LOGO = `${SITE}/apple-touch-icon.png`;

function absolute(path: string): string {
  return path.startsWith('http') ? path : `${SITE}${path}`;
}

function officeId(office: Office): string {
  return `${SITE}${office.path}#office`;
}

/** JSON inside a <script> tag: escape "<" so the data can't close it. */
export function scriptJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

/** How other entities (offices, blog posts) point at the organisation. */
export const ORGANIZATION_REF = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: BUSINESS_NAME,
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: LOGO },
};

/** The business as a whole. On the homepage. */
export function organization() {
  return {
    '@context': 'https://schema.org',
    ...ORGANIZATION_REF,
    alternateName: 'Adelaide Property Network',
    // TODO(elliot): legalName should be the registered entity name exactly
    // as the footer shows it next to the ACN. The footer doesn't show one
    // yet: set LEGAL_ENTITY_NAME in src/data/business.ts and it appears in
    // both places.
    ...(LEGAL_ENTITY_NAME ? { legalName: LEGAL_ENTITY_NAME } : {}),
    identifier: [
      { '@type': 'PropertyValue', name: 'RLA', value: RLA_NUMBER },
      ...(ACN ? [{ '@type': 'PropertyValue', name: 'ACN', value: ACN }] : []),
      ...(ABN ? [{ '@type': 'PropertyValue', name: 'ABN', value: ABN }] : []),
    ],
    telephone: PHONE_SCHEMA,
    areaServed: ['Adelaide SA', 'Mount Gambier SA'],
    subOrganization: OFFICE_LIST.map((office) => ({
      '@type': 'RealEstateAgent',
      '@id': officeId(office),
      name: `${BUSINESS_NAME} — ${office.name}`,
      url: `${SITE}${office.path}`,
    })),
  };
}

/** One office, on its own page. */
export function officeAgent(office: Office) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': officeId(office),
    name: `${BUSINESS_NAME} — ${office.name}`,
    url: `${SITE}${office.path}`,
    telephone: PHONE_SCHEMA,
    ...(office.heroPhoto ? { image: absolute(office.heroPhoto) } : {}),
    areaServed: `${office.name} SA`,
    address: {
      '@type': 'PostalAddress',
      ...office.postalAddress,
      addressRegion: 'SA',
      addressCountry: 'AU',
    },
    // TODO(elliot): geo (latitude/longitude), openingHoursSpecification
    // and priceRange aren't anywhere on the site yet. Add them here once
    // confirmed; they help the office show up in map results.
    parentOrganization: ORGANIZATION_REF,
  };
}
