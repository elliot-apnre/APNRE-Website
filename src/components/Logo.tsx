import starMark from '../assets/logo/apn-star-mark-small.png';

interface LogoProps {
  /** Small line under the wordmark, e.g. an office name. */
  subline?: string;
  /** 'dark' for use on charcoal backgrounds (footer). */
  tone?: 'light' | 'dark';
}

// The one APN Real Estate lockup used on every page: the star mark plus
// the wordmark set in the site's display face. It matches the Open Graph
// share image. The older supplied logo files still read "Adelaide Property
// Network" / "Mount Gambier Property Network", which is why they aren't
// used here. If an official APN Real Estate logo file is supplied, swap
// it in here and every page picks it up.
export default function Logo({ subline, tone = 'light' }: LogoProps) {
  return (
    <span className={`logo logo--${tone}`}>
      <img src={starMark} alt="" className="logo__mark" aria-hidden="true" />
      <span className="logo__text">
        <span className="logo__word">APN Real Estate</span>
        {subline && <span className="logo__sub">{subline}</span>}
      </span>
    </span>
  );
}
