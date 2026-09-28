import type { CSSProperties } from 'react';
import type { Photo } from '../lib/photo';

/** Screens this narrow get the phone-sized copy of a photo (see
 *  PHONE_PHOTO_WIDTH in vite.config.ts), whatever their pixel density.
 *  Matches the site's main mobile breakpoint in index.css. */
const PHONE_MEDIA = '(max-width: 760px)';

interface PictureProps {
  photo: Photo;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** The page's main (above-the-fold) image: loaded straight away, at
   *  high priority. Everything else waits until it's near the screen. */
  priority?: boolean;
  /** How wide the photo is shown above the phone breakpoint, as an HTML
   *  `sizes` value. Lets tablets and desktops pick the right copy.
   *  Defaults to the full viewport width. */
  sizes?: string;
}

/** The narrowest entry of a "url 800w, url 1600w" srcset, or undefined
 *  if there's only one. */
function narrowest(srcSet: string): string | undefined {
  const entries = srcSet.split(', ').map((entry) => {
    const [url, descriptor] = entry.split(' ');
    return { url, width: parseInt(descriptor, 10) };
  });
  if (entries.length < 2) return undefined;
  return entries.reduce((a, b) => (b.width < a.width ? b : a)).url;
}

/** A photo imported with `?photo` (see src/lib/photo.ts): WebP for
 *  browsers that support it, JPEG for the rest. Large photos also come
 *  in a phone-sized copy, which phones always get; bigger screens choose
 *  between the copies using `sizes`. width and height are the image's
 *  own size, so the browser keeps its space free before it loads (CSS
 *  still decides the displayed size). */
export default function Picture({ photo, alt, className, style, priority = false, sizes = '100vw' }: PictureProps) {
  const formats = Object.entries(photo.sources);
  return (
    <picture>
      {formats.map(([format, srcSet]) => {
        const phone = narrowest(srcSet);
        return phone ? <source key={`${format}-phone`} media={PHONE_MEDIA} type={`image/${format}`} srcSet={phone} /> : null;
      })}
      {formats.map(([format, srcSet]) => (
        <source
          key={format}
          type={`image/${format}`}
          srcSet={srcSet}
          sizes={narrowest(srcSet) ? sizes : undefined}
        />
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
