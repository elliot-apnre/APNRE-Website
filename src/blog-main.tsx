import React from 'react';
import ReactDOM from 'react-dom/client';
import BlogIndexPage from './BlogIndexPage';
import BlogPostPage from './BlogPostPage';
import { BLOG_DATA_ID, POST_BODY_ID, type BlogPageData } from './blog/types';
import './index.css';

// Browser entry for every /blog/ page. Unlike the other pages, these
// arrive fully rendered (src/blog-server.tsx, at build time) so search
// engines see the articles; this just hydrates that markup so the
// header menu, form and call tracking work.
const root = document.getElementById('root')!;
const data = JSON.parse(document.getElementById(BLOG_DATA_ID)!.textContent!) as BlogPageData;

const page =
  data.kind === 'index' ? (
    <BlogIndexPage posts={data.posts} />
  ) : (
    <BlogPostPage
      post={data.post}
      related={data.related}
      bodyHtml={document.getElementById(POST_BODY_ID)?.innerHTML ?? ''}
    />
  );

ReactDOM.hydrateRoot(root, <React.StrictMode>{page}</React.StrictMode>);
