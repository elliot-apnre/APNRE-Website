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
  /** Files and folders the page is built from. Its sitemap <lastmod> is
   *  the date of the last commit that touched any of them. */
  sources: string[];
}

// Every page here is also listed in the sitemap (scripts/prerender.mjs),
// so only add pages that should be in search.
const SHARED_SOURCES = ['src/components', 'src/data', 'src/index.css'];

export const STATIC_PAGES: StaticPage[] = [
  {
    path: '/',
    render: () => renderToString(<App />),
    jsonLd: [organization()],
    sources: ['index.html', 'src/App.tsx', ...SHARED_SOURCES],
  },
  {
    path: '/adelaide/',
    render: () => renderToString(<OfficePage office={OFFICES.adelaide} />),
    jsonLd: [officeAgent(OFFICES.adelaide)],
    sources: ['adelaide/index.html', 'src/OfficePage.tsx', ...SHARED_SOURCES],
  },
  {
    path: '/mount-gambier/',
    render: () => renderToString(<OfficePage office={OFFICES['mount-gambier']} />),
    jsonLd: [officeAgent(OFFICES['mount-gambier'])],
    sources: ['mount-gambier/index.html', 'src/OfficePage.tsx', ...SHARED_SOURCES],
  },
  {
    path: '/privacy/',
    render: () => renderToString(<PrivacyPage />),
    jsonLd: [],
    sources: ['privacy/index.html', 'src/PrivacyPage.tsx'],
  },
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
