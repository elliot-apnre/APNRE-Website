// Entry for the server build in `npm run build` (dist-ssr/server.js),
// which scripts/prerender.mjs uses to write finished HTML into dist/.
export { renderBlogPages } from './blog-server';
export { STATIC_PAGES, renderStaticPage } from './pages-server';
