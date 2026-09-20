import balconyView from '../assets/photos/balcony-view-hills.jpg';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media" role="img" aria-label="View across the Adelaide hills from a managed investment property">
        <img src={balconyView} alt="View across the Adelaide hills from one of the properties APN manages" />
        <div className="hero__scrim" />
      </div>

      <div className="wrap hero__content">
        <div className="file-tag hero__filetag">FILE — LANDLORD ENQUIRY</div>

        <h1 className="h-display hero__headline">
          Your property
          <br />
          is an asset.
          <br />
          <span className="hero__headline-accent">We manage it like one.</span>
        </h1>

        <p className="lede hero__lede">
          Professional property management for landlords across Adelaide and Mount
          Gambier — from a team who'll tell you what's happening with your
          investment, and why.
        </p>

        <div className="hero__actions">
          <a href="#appraisal" className="btn btn-primary">
            Get My Free Rental Appraisal
          </a>
          <a href="#switch" className="btn btn-outline-light">
            I'm Thinking of Changing Property Managers
          </a>
        </div>

        <div className="hero__meta">
          <span>Adelaide</span>
          <span aria-hidden="true">/</span>
          <span>Mount Gambier</span>
        </div>
      </div>
    </section>
  );
}
