import type { Office } from '../data/offices';

export default function OfficeAbout({ office }: { office: Office }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `APN Real Estate ${office.addressLines.join(' ')}`
  )}`;

  return (
    <section id="about" className="section section-paper office-about">
      <div className="wrap office-about__grid">
        <div className="office-about__copy">
          <span className="eyebrow">About the {office.name} office</span>
          <h2 className="h-1">Local people, looking after local properties.</h2>
          {office.about.map((para) => (
            <p className="body-copy" key={para}>
              {para}
            </p>
          ))}
        </div>

        <aside className="office-about__card" aria-label={`${office.name} office details`}>
          <h3 className="office-about__card-label">Visit or call</h3>
          <p className="office-about__address">
            {office.addressLines[0]}
            <br />
            {office.addressLines[1]}
          </p>
          <p className="office-about__links">
            <a href={`tel:${office.phone.replace(/\s+/g, '')}`}>{office.phone}</a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions ↗
            </a>
            <a href={office.reviewsUrl} target="_blank" rel="noopener noreferrer">
              See our reviews on realestate.com.au ↗
            </a>
          </p>
        </aside>
      </div>
    </section>
  );
}
