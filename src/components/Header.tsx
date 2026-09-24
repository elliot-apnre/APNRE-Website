import { useEffect, useState } from 'react';
import logoFull from '../assets/logo/apnre-group-logo.png';
import { OFFICE_LIST, type OfficeId } from '../data/offices';

export interface NavLink {
  href: string;
  label: string;
}

const HOME_NAV: NavLink[] = [
  { href: '#why-apn', label: 'Why APN' },
  { href: '#team', label: 'The Team' },
  { href: '#switch', label: 'Switching?' },
  { href: '#faq', label: 'FAQ' },
];

interface HeaderProps {
  /** In-page section links. Defaults to the homepage's. */
  nav?: NavLink[];
  /** Set on an office page so its own office link is marked current and
   *  the logo links back to the homepage instead of the top of the page. */
  currentOffice?: OfficeId;
}

export default function Header({ nav = HOME_NAV, currentOffice }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const office = OFFICE_LIST.find((o) => o.id === currentOffice);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap site-header__row">
        <a href={office ? '/' : '#top'} className="site-header__brand" aria-label="APN Real Estate — home">
          {office ? (
            // Office logos are stacked (mark over wordmark), so they need
            // more height than the wide group logo to stay legible.
            <img src={office.logo} alt={office.logoAlt} height={60} />
          ) : (
            <img src={logoFull} alt="APN Real Estate" height={48} />
          )}
        </a>
        <nav className="site-header__nav" aria-label="Primary">
          {nav.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
          <span className="site-header__nav-divider" aria-hidden="true" />
          {OFFICE_LIST.map((office) => (
            <a
              href={office.path}
              key={office.id}
              className="site-header__office-link"
              aria-current={office.id === currentOffice ? 'page' : undefined}
            >
              {office.name}
            </a>
          ))}
        </nav>
        <a href="#appraisal" className="btn btn-primary site-header__cta">
          Free Rental Appraisal
        </a>
      </div>
    </header>
  );
}
