// Last step of `npm run build`. Uses the server build of src/server.tsx
// (in dist-ssr/) to write finished HTML into dist/: the homepage, office
// pages and privacy policy (src/pages-server.tsx) and every blog page
// (src/blog-server.tsx). Adds the published blog pages to
// dist/sitemap.xml, then removes dist-ssr/. See docs/blog.md.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { renderBlogPages, STATIC_PAGES, renderStaticPage } = await import(
  pathToFileURL(join(ssrDir, 'server.js')).href
);

// Each page's own dist/<path>/index.html (already processed by Vite, so
// its script and stylesheet links are in) gets its content filled in
// place.
for (const page of STATIC_PAGES) {
  const file = join(dist, page.path, 'index.html');
  writeFileSync(file, renderStaticPage(page, readFileSync(file, 'utf8')));
}

const template = readFileSync(join(dist, 'blog', 'index.html'), 'utf8');
const pages = renderBlogPages(template);

for (const page of pages) {
  const file = join(dist, page.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page.html);
}

const sitemapFile = join(dist, 'sitemap.xml');
const entries = pages
  .filter((p) => p.indexable)
  .map(
    (p) =>
      `  <url>\n    <loc>https://apnre.com.au${p.path}</loc>\n` +
      (p.lastmod ? `    <lastmod>${p.lastmod}</lastmod>\n` : '') +
      '  </url>\n'
  )
  .join('');
const sitemap = readFileSync(sitemapFile, 'utf8');
if (!sitemap.includes('</urlset>')) throw new Error('dist/sitemap.xml has no </urlset>');
writeFileSync(sitemapFile, sitemap.replace('</urlset>', () => `${entries}</urlset>`));

rmSync(ssrDir, { recursive: true, force: true });

const published = pages.filter((p) => p.indexable && p.path !== '/blog/').length;
console.log(`Pre-rendered ${STATIC_PAGES.length} page(s).`);
console.log(`Blog: wrote ${pages.length} page(s), ${published} published post(s) added to the sitemap.`);
