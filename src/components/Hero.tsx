import balconyView from '../assets/photos/balcony-view-hills.jpg';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media" role="img" aria-label="View across the Adelaide hills from a managed investment property">
        <img src={balconyView} alt="View across the Adelaide hills from one of the properties APN manages" />
        <div className="hero__scrim" />
      </div>

      <div className="wrap hero__content">
        <h1 className="h-display hero__headline">
          Your property
          <br />
          is an asset.
          <br />
          <span className="hero__headline-accent">We treat it like one.</span>
        </h1>

        <p className="lede hero__lede">
          Professional property management for landlords across Adelaide and
          Mount Gambier — with a team that treats your property as an
          investment, not just another rental to manage.
        </p>

        <div className="hero__actions">
          <a href="#appraisal" className="btn btn-primary">
            Get My Free Rental Appraisal
          </a>
          <a href="#switch" className="btn btn-outline-light">
            Thinking of Switching?
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
