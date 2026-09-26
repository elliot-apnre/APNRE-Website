import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

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

export default defineConfig({
  plugins: [react(), sharedHead(), sharedBody()],
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
      },
    },
  },
});
