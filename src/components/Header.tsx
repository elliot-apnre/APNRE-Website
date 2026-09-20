import { useEffect, useState } from 'react';
import logoFull from '../assets/logo/apnre-group-logo.png';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap site-header__row">
        <a href="#top" className="site-header__brand" aria-label="APN Real Estate — home">
          <img src={logoFull} alt="APN Real Estate" height={48} />
        </a>
        <nav className="site-header__nav" aria-label="Primary">
          <a href="#why-apn">Why APN</a>
          <a href="#team">The Team</a>
          <a href="#switch">Switching?</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#appraisal" className="btn btn-primary site-header__cta">
          Free Rental Appraisal
        </a>
      </div>
    </header>
  );
}
