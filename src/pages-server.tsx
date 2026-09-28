// Build-time renderer for the non-blog pages (homepage, office pages,
// privacy policy). Same idea as src/blog-server.tsx: each page's content
// is written into its HTML at build time, so search engines read it
// without running JavaScript. Used by scripts/prerender.mjs after
// `vite build`; the browser entries (main.tsx, office-main.tsx,
// privacy-main.tsx) then hydrate that markup.

import { renderToString } from 'react-dom/server';
import App from './App';
import OfficePage from './OfficePage';
import PrivacyPage from './PrivacyPage';
import { OFFICES } from './data/offices';
import { officeAgent, organization, scriptJson } from './structured-data';

export interface StaticPage {
  /** URL path, and the folder of its HTML file in dist/. */
  path: string;
  render: () => string;
  /** Written in place of the page's <!-- page-jsonld --> marker. */
  jsonLd: unknown[];
}

export const STATIC_PAGES: StaticPage[] = [
  { path: '/', render: () => renderToString(<App />), jsonLd: [organization()] },
  {
    path: '/adelaide/',
    render: () => renderToString(<OfficePage office={OFFICES.adelaide} />),
    jsonLd: [officeAgent(OFFICES.adelaide)],
  },
  {
    path: '/mount-gambier/',
    render: () => renderToString(<OfficePage office={OFFICES['mount-gambier']} />),
    jsonLd: [officeAgent(OFFICES['mount-gambier'])],
  },
  { path: '/privacy/', render: () => renderToString(<PrivacyPage />), jsonLd: [] },
];

/** Fills the <!-- app --> marker inside #root with the page's markup, and
 *  the <!-- page-jsonld --> marker (if the page has one) with its
 *  structured data. Function replacements, so a "$" in the content can't
 *  be read as a replacement pattern. */
export function renderStaticPage(page: StaticPage, template: string): string {
  if (!template.includes('<!-- app -->')) throw new Error(`${page.path}: template has no <!-- app --> marker`);
  const hasJsonLdMarker = template.includes('<!-- page-jsonld -->');
  if (page.jsonLd.length > 0 && !hasJsonLdMarker) throw new Error(`${page.path}: template has no <!-- page-jsonld --> marker`);
  const jsonLd = page.jsonLd
    .map((ld) => `<script type="application/ld+json">${scriptJson(ld)}</script>`)
    .join('\n    ');
  return template
    .replace('<!-- page-jsonld -->', () => jsonLd)
    .replace('<!-- app -->', () => page.render());
}
