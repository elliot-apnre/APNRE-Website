import type { Office } from '../data/offices';

export default function OfficeHero({ office }: { office: Office }) {
  return (
    <section id="top" className={`hero hero--office${office.heroPhoto ? '' : ' hero--plain'}`}>
      {office.heroPhoto && (
        <div className="hero__media">
          <img
            src={office.heroPhoto}
            alt={office.heroAlt ?? ''}
            style={office.heroFocalPoint ? { objectPosition: office.heroFocalPoint } : undefined}
          />
          <div className="hero__scrim" />
        </div>
      )}

      <div className="wrap hero__content">
        <p className="hero__meta hero__meta--above">
          <a href="/">APN Real Estate</a>
          <span aria-hidden="true">·</span>
          <span>{office.name} office</span>
        </p>
        <h1 className="h-display hero__headline">
          Property management
          <br />
          <span className="hero__headline-accent">in {office.name}.</span>
        </h1>

        <p className="lede hero__lede">{office.lede}</p>

        <div className="hero__actions">
          <a href="#appraisal" className="btn btn-primary">
            Get My Free Rental Appraisal
          </a>
          <a href="#switch" className="btn btn-outline-light">
            Thinking of Switching?
          </a>
        </div>
      </div>
    </section>
  );
}
