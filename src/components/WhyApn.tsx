import agentPhoto from '../assets/photos/agent-placing-sold-sticker.jpg';

const REASONS = [
  {
    tag: 'Local knowledge',
    title: 'Local people. Local property knowledge.',
    copy: 'APN operates across Adelaide and Mount Gambier, with people on the ground in both markets.',
  },
  {
    tag: 'A named property manager',
    title: 'Know exactly who’s looking after it.',
    copy: 'You’ll know who is responsible for your property and how to reach them directly.',
  },
  {
    tag: 'Owner-first thinking',
    title: 'You own the property. You make the decisions.',
    copy: 'Our job is to manage the property professionally, keep you informed and give you the information you need to make your own decisions.',
  },
];

export default function WhyApn() {
  return (
    <section id="why-apn" className="section section-dark why">
      <div className="wrap why__grid">
        <div className="why__copy">
          <span className="eyebrow">Why landlords choose APN</span>
          <h2 className="h-1">A property manager you can actually reach.</h2>

          <ul className="why__list">
            {REASONS.map((r) => (
              <li key={r.tag}>
                <span className="why__reason-tag">{r.tag}</span>
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
