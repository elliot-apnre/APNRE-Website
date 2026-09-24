import starMark from '../assets/logo/apn-star-mark-small.png';

interface LogoProps {
  /** Small line under the wordmark, e.g. an office name. */
  subline?: string;
  /** 'dark' for use on charcoal backgrounds (footer). */
  tone?: 'light' | 'dark';
}

// Star mark plus "APN Real Estate", for dark backgrounds (the footer),
// where the full logo's grey lettering doesn't read. The header uses the
// full logo files instead (MAIN_LOGO / office.logo in data/offices.ts).
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
