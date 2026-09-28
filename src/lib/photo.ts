// Photos are imported with a `?photo` suffix, e.g.
//   import hero from '../assets/photos/balcony-view-hills.jpg?photo';
// vite-imagetools (see imageDefaults() in vite.config.ts) turns each one
// into WebP and JPEG copies at quality 80, with no resizing,
// sharpening or other filters, and gives back this object. Show it with
// src/components/Picture.tsx.

export interface Photo {
  /** Format ("webp") → srcset, for <source> tags. */
  sources: Record<string, string>;
  /** The JPEG fallback, with its size in pixels. */
  img: { src: string; w: number; h: number };
}
