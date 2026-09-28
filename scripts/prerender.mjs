// Last step of `npm run build`. Uses the server build of src/server.tsx
// (in dist-ssr/) to write finished HTML into dist/: the homepage, office
// pages and privacy policy (src/pages-server.tsx) and every blog page
// (src/blog-server.tsx). Then writes dist/sitemap.xml listing all of them
// (published blog pages only) and removes dist-ssr/. See docs/blog.md.

import { execFileSync } from 'node:child_process';
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

const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

// A static page's <lastmod> is the date of the last commit touching its
// sources, so the build needs the full git history. Cloudflare Pages
// clones only the latest commit, and in a shallow clone that one commit
// looks like it added every file, so every page would get its date. So
// fetch the rest of the history first. If that fails, or there's no git
// at all, leave those pages' <lastmod> out (with a warning) rather than
// give a wrong date. Blog pages use the dates in their front matter.
function hasFullHistory() {
  let reason = 'git fetch --unshallow left the clone shallow';
  try {
    if (git('rev-parse', '--is-shallow-repository') !== 'true') return true;
    console.log('Sitemap: shallow clone, fetching full git history for <lastmod>...');
    git('fetch', '--unshallow', '--quiet');
    if (git('rev-parse', '--is-shallow-repository') !== 'true') return true;
  } catch (err) {
    reason = String(err.message).split('\n')[0];
  }
  console.warn(`Sitemap: no full git history (${reason}), leaving <lastmod> out for static pages.`);
  return false;
}

// Files that aren't committed yet have no log, which means they're being
// changed today.
const today = new Date().toISOString().slice(0, 10);
const fullHistory = hasFullHistory();
function lastCommitDate(paths) {
  if (!fullHistory) return undefined;
  const date = git('log', '-1', '--format=%cs', '--', ...paths);
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : today;
}

const urls = [
  ...STATIC_PAGES.map((p) => ({ path: p.path, lastmod: lastCommitDate(p.sources) })),
  ...pages.filter((p) => p.indexable).map((p) => ({ path: p.path, lastmod: p.lastmod ?? today })),
];
writeFileSync(
  join(dist, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>https://apnre.com.au${u.path}</loc>\n` +
          (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : '') +
          '  </url>\n'
      )
      .join('') +
    '</urlset>\n'
);

rmSync(ssrDir, { recursive: true, force: true });

const published = pages.filter((p) => p.indexable && p.path !== '/blog/').length;
console.log(`Pre-rendered ${STATIC_PAGES.length} page(s).`);
console.log(`Blog: wrote ${pages.length} page(s), ${published} published post(s).`);
console.log(`Sitemap: ${urls.length} URL(s).`);
