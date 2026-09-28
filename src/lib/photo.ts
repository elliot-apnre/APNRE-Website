// Photos are imported with a `?photo` suffix, e.g.
//   import hero from '../assets/photos/balcony-view-hills.jpg?photo';
// vite-imagetools (see imageDefaults() in vite.config.ts) turns each one
// into WebP and JPEG copies at quality 80, at the original size plus an
// 800px-wide copy for photos over 1000px, with no sharpening or other
// filters, and gives back this object. Show it with
// src/components/Picture.tsx.

export interface Photo {
  /** Format ("webp", "jpeg") → srcset with width descriptors, for
   *  <source> tags. Only large photos (more than one copy) get "jpeg". */
  sources: Record<string, string>;
  /** The full-size JPEG fallback, with its size in pixels. */
  img: { src: string; w: number; h: number };
}
