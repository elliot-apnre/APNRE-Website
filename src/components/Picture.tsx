import type { CSSProperties } from 'react';
import type { Photo } from '../lib/photo';

interface PictureProps {
  photo: Photo;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** The page's main (above-the-fold) image: loaded straight away, at
   *  high priority. Everything else waits until it's near the screen. */
  priority?: boolean;
}

/** A photo imported with `?photo` (see src/lib/photo.ts): WebP for
 *  browsers that support it, JPEG for the rest. width and height
 *  are the image's own size, so the browser keeps its space free before
 *  it loads (CSS still decides the displayed size). */
export default function Picture({ photo, alt, className, style, priority = false }: PictureProps) {
  return (
    <picture>
      {Object.entries(photo.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} />
      ))}
      <img
        src={photo.img.src}
        width={photo.img.w}
        height={photo.img.h}
        alt={alt}
        className={className}
        style={style}
        decoding="async"
        loading={priority ? undefined : 'lazy'}
        // React 18 doesn't know fetchPriority yet; the lowercase
        // attribute passes straight through to the HTML.
        {...(priority ? { fetchpriority: 'high' } : {})}
      />
    </picture>
  );
}
