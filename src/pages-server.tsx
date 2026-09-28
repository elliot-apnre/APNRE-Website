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

export interface StaticPage {
  /** URL path, and the folder of its HTML file in dist/. */
  path: string;
  render: () => string;
}

export const STATIC_PAGES: StaticPage[] = [
  { path: '/', render: () => renderToString(<App />) },
  { path: '/adelaide/', render: () => renderToString(<OfficePage office={OFFICES.adelaide} />) },
  { path: '/mount-gambier/', render: () => renderToString(<OfficePage office={OFFICES['mount-gambier']} />) },
  { path: '/privacy/', render: () => renderToString(<PrivacyPage />) },
];

/** Fills the <!-- app --> marker inside #root with the page's markup.
 *  A function replacement, so a "$" in the content can't be read as a
 *  replacement pattern. */
export function renderStaticPage(page: StaticPage, template: string): string {
  if (!template.includes('<!-- app -->')) throw new Error(`${page.path}: template has no <!-- app --> marker`);
  return template.replace('<!-- app -->', () => page.render());
}
