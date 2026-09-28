import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { loadPosts } from './src/blog/load-posts';

// Replaces the <!-- shared-head --> marker in each page with
// src/partials/head-shared.html. Runs 'pre' so Vite's own %VITE_*% env
// replacement still applies to the injected analytics snippet.
function sharedHead(): Plugin {
  const partialPath = resolve(__dirname, 'src/partials/head-shared.html');
  return {
    name: 'apn-shared-head',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const partial = readFileSync(partialPath, 'utf8');
        return html.replace('<!-- shared-head -->', partial);
      },
    },
  };
}

// Replaces the <!-- shared-body --> marker (immediately after <body> in
// each page) with src/partials/body-shared.html — the GTM <noscript>
// fallback. Kept separate from sharedHead() since it targets a different
// marker; same %VITE_*% replacement behaviour via the 'pre' order.
function sharedBody(): Plugin {
  const partialPath = resolve(__dirname, 'src/partials/body-shared.html');
  return {
    name: 'apn-shared-body',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const partial = readFileSync(partialPath, 'utf8');
        return html.replace('<!-- shared-body -->', partial);
      },
    },
  };
}

// Serves the /blog/ pages on the dev server, rendered the same way the
// build does (src/blog-server.tsx) but including drafts, so a post can
// be previewed before it's published. Posts are re-read on every
// request: edit the Markdown and refresh.
function blogDevServer(): Plugin {
  return {
    name: 'apn-blog-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url ?? '').split('?')[0];
        if (!/^\/blog(\/[a-z0-9-]+)?\/?$/.test(url)) return next();
        if (!url.endsWith('/')) {
          res.statusCode = 301;
          res.setHeader('Location', `${url}/`);
          return res.end();
        }
        try {
          const raw = readFileSync(resolve(__dirname, 'blog/index.html'), 'utf8');
          const template = await server.transformIndexHtml(url, raw);
          const { renderBlogPages } = (await server.ssrLoadModule(
            '/src/blog-server.tsx'
          )) as typeof import('./src/blog-server');
          const page = renderBlogPages(template, { includeDrafts: true }).find((p) => p.path === url);
          if (!page) return next();
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(page.html);
        } catch (err) {
          server.ssrFixStacktrace(err as Error);
          next(err);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sharedHead(), sharedBody(), blogDevServer()],
  define: {
    // Whether any post is published, so the footer's Blog link only
    // appears once there's something to read. Worked out when the build
    // (or dev server) starts; restart `npm run dev` after publishing the
    // first post to see the link locally.
    __BLOG_HAS_POSTS__: JSON.stringify(loadPosts().length > 0),
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      // One HTML file per public page. Each office page is a real file at
      // its own path, so Cloudflare Pages serves it directly and every
      // other unknown path still gets the real 404 (see public/404.html).
      input: {
        main: resolve(__dirname, 'index.html'),
        adelaide: resolve(__dirname, 'adelaide/index.html'),
        mountGambier: resolve(__dirname, 'mount-gambier/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        thankYou: resolve(__dirname, 'thank-you/index.html'),
        // Template for every blog page; filled in after the build by
        // scripts/prerender-blog.mjs. See docs/blog.md.
        blog: resolve(__dirname, 'blog/index.html'),
      },
    },
  },
});
