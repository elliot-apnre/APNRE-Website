import starMark from '../assets/logo/apn-star-mark.png';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__logo">
            <img src={starMark} alt="" height={34} aria-hidden="true" />
            <span>APN Real Estate</span>
          </div>
          <p>Property management across Adelaide and Mount Gambier.</p>
        </div>

        <div className="site-footer__col">
          <h4>Adelaide</h4>
          <p>
            Level 1 / 420B, Cnr Main North Road
            <br />
            and Barton Street, Blair Athol SA 5084
          </p>
        </div>

        <div className="site-footer__col">
          <h4>Mount Gambier</h4>
          <p>
            178 Commercial Street East,
            <br />
            Mount Gambier SA 5290
          </p>
        </div>

        <div className="site-footer__col">
          <h4>Get in touch</h4>
          <p>
            <a href="tel:1300123276">1300 123 276</a>
          </p>
          <a href="#appraisal" className="btn btn-outline-light site-footer__btn">
            Free Rental Appraisal
          </a>
        </div>
      </div>

      <div className="wrap site-footer__legal">
        <p>
          © {new Date().getFullYear()} APN Real Estate. Formerly Adelaide
          Property Network. Founded by Patrick Nhim.
        </p>
      </div>
    </footer>
  );
}
