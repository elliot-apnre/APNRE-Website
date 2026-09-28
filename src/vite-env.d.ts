/// <reference types="vite/client" />

/** A photo processed by vite-imagetools; see src/lib/photo.ts. */
declare module '*?photo' {
  const photo: import('./lib/photo').Photo;
  export default photo;
}

/** True once at least one blog post is published. Set in vite.config.ts. */
declare const __BLOG_HAS_POSTS__: boolean;
