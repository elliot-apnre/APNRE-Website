// Build-time renderer for the blog. Turns the Markdown posts in
// content/blog/ into complete HTML pages, so each article's text is in
// the page itself rather than filled in by JavaScript — which is what
// makes the blog useful for SEO. Used by scripts/prerender-blog.mjs
// after `vite build`, and by the dev server (blogDevServer() in
// vite.config.ts). The browser side is src/blog-main.tsx.

import { renderToString } from 'react-dom/server';
import BlogIndexPage from './BlogIndexPage';
import BlogPostPage from './BlogPostPage';
import { loadPosts } from './blog/load-posts';
import { BLOG_DATA_ID, type BlogPageData, type Post, type PostMeta } from './blog/types';
import { TEAM } from './data/team';

const SITE = 'https://apnre.com.au';
const DEFAULT_IMAGE = `${SITE}/og-cover.jpg`;
const RELATED_COUNT = 3;

export interface RenderedPage {
  /** e.g. /blog/ or /blog/rental-bond-guide/ */
  path: string;
  html: string;
  /** False for pages that must stay out of search and the sitemap. */
  indexable: boolean;
  lastmod?: string;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** JSON inside a <script> tag: escape "<" so a post can't close the tag. */
function scriptJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function absolute(path: string): string {
  return path.startsWith('http') ? path : `${SITE}${path}`;
}

function toMeta({ html: _html, ...meta }: Post): PostMeta {
  return meta;
}

interface HeadOptions {
  title: string;
  description: string;
  path: string;
  indexable: boolean;
  ogType: 'website' | 'article';
  image?: string;
  extra?: string;
  jsonLd: unknown[];
  data: BlogPageData;
}

function head(o: HeadOptions): string {
  const url = `${SITE}${o.path}`;
  const image = o.image ? absolute(o.image) : DEFAULT_IMAGE;
  return [
    `<title>${esc(o.title)}</title>`,
    `<meta name="description" content="${esc(o.description)}" />`,
    `<meta name="robots" content="${o.indexable ? 'index, follow' : 'noindex'}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${o.ogType}" />`,
    `<meta property="og:site_name" content="APN Real Estate" />`,
    `<meta property="og:title" content="${esc(o.title)}" />`,
    `<meta property="og:description" content="${esc(o.description)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="en_AU" />`,
    o.extra ?? '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(o.title)}" />`,
    `<meta name="twitter:description" content="${esc(o.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    ...o.jsonLd.map((ld) => `<script type="application/ld+json">${scriptJson(ld)}</script>`),
    `<script type="application/json" id="${BLOG_DATA_ID}">${scriptJson(o.data)}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
}

const PUBLISHER = {
  '@type': 'Organization',
  name: 'APN Real Estate',
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: `${SITE}/apple-touch-icon.png` },
};

function breadcrumbs(items: [name: string, path: string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE}${path}`,
    })),
  };
}

function fill(template: string, headHtml: string, appHtml: string): string {
  // Function replacements, so a "$" in a post can't be read as a
  // replacement pattern.
  return template
    .replace('<!-- blog-head -->', () => headHtml)
    .replace('<!-- blog-app -->', () => appHtml);
}

/** Every blog page, rendered into `template` (blog/index.html after
 *  Vite has processed it, so its script and stylesheet links are in). */
export function renderBlogPages(template: string, { includeDrafts = false } = {}): RenderedPage[] {
  const posts = loadPosts({ includeDrafts });
  const metas = posts.map(toMeta);
  const pages: RenderedPage[] = [];

  // An empty blog stays out of search until the first post is published.
  const indexData: BlogPageData = { kind: 'index', posts: metas };
  const indexIndexable = posts.some((p) => !p.draft);
  pages.push({
    path: '/blog/',
    indexable: indexIndexable,
    lastmod: metas.find((p) => !p.draft)?.date,
    html: fill(
      template,
      head({
        title: 'Landlord Advice & Property Management Guides | APN Real Estate',
        description:
          'Practical guides for landlords on renting out and managing property in Adelaide and Mount Gambier, from the APN Real Estate property management team.',
        path: '/blog/',
        indexable: indexIndexable,
        ogType: 'website',
        data: indexData,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'APN Real Estate Blog',
            url: `${SITE}/blog/`,
            publisher: PUBLISHER,
          },
          breadcrumbs([['Home', '/'], ['Blog', '/blog/']]),
        ],
      }),
      renderToString(<BlogIndexPage posts={metas} />)
    ),
  });

  for (const post of posts) {
    const meta = toMeta(post);
    const related = metas.filter((p) => p.slug !== post.slug).slice(0, RELATED_COUNT);
    const path = `/blog/${post.slug}/`;
    const author = TEAM.find((m) => m.name === post.author);
    const indexable = !post.draft;

    pages.push({
      path,
      indexable,
      lastmod: post.updated ?? post.date,
      html: fill(
        template,
        head({
          title: `${post.title} | APN Real Estate`,
          description: post.description,
          path,
          indexable,
          ogType: 'article',
          image: post.image,
          extra: [
            `<meta property="article:published_time" content="${post.date}" />`,
            post.updated ? `<meta property="article:modified_time" content="${post.updated}" />` : '',
          ]
            .filter(Boolean)
            .join('\n    '),
          data: { kind: 'post', post: meta, related },
          jsonLd: [
            {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              dateModified: post.updated ?? post.date,
              image: post.image ? absolute(post.image) : DEFAULT_IMAGE,
              mainEntityOfPage: `${SITE}${path}`,
              author: author
                ? { '@type': 'Person', name: author.name, jobTitle: author.role, worksFor: PUBLISHER }
                : PUBLISHER,
              publisher: PUBLISHER,
            },
            breadcrumbs([['Home', '/'], ['Blog', '/blog/'], [post.title, path]]),
          ],
        }),
        renderToString(<BlogPostPage post={meta} bodyHtml={post.html} related={related} />)
      ),
    });
  }

  return pages;
}
