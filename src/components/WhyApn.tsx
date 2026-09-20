import agentPhoto from '../assets/photos/agent-placing-sold-sticker.jpg';

const REASONS = [
  {
    title: 'Local knowledge',
    copy: 'APN operates across Adelaide and Mount Gambier, with an office in each.',
  },
  {
    title: 'A named property manager',
    copy: 'You will know exactly who is managing your property, and how to reach them directly.',
  },
  {
    title: 'Owner-first thinking',
    copy: 'The property is yours. Our role is to manage it professionally and keep you informed so you can make your own decisions.',
  },
];

export default function WhyApn() {
  return (
    <section id="why-apn" className="section section-dark why">
      <div className="wrap why__grid">
        <div className="why__copy">
          <span className="eyebrow">Why landlords choose APN</span>
          <h2 className="h-1">
            The difference isn’t a slogan. It’s who answers the phone.
          </h2>

          <ul className="why__list">
            {REASONS.map((r) => (
              <li key={r.title}>
                <h3 className="h-3">{r.title}</h3>
                <p className="body-copy">{r.copy}</p>
              </li>
            ))}
          </ul>

          <p className="why__founder">
            APN Real Estate was founded by Patrick Nhim, who also leads the
            business’s sales side — so property management here sits
            alongside a working view of the local market, not apart from it.
          </p>

          <a href="#appraisal" className="btn btn-primary">
            Get My Free Rental Appraisal
          </a>
        </div>

        <div className="why__media">
          <img
            src={agentPhoto}
            alt="An APN agent placing a Sold sticker on a property sign"
          />
          <p className="why__caption">
            Real work, on real properties, across Adelaide and Mount Gambier.
          </p>
        </div>
      </div>
    </section>
  );
}
