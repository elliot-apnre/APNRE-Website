import type { Office } from '../data/offices';

// Like SuccessStories, hidden until real entries exist in
// src/data/offices.ts. Photos must be of the actual property listed.
export default function WorkExamples({ office }: { office: Office }) {
  if (office.workExamples.length === 0) return null;

  return (
    <section id="work" className="section section-paper work">
      <div className="wrap">
        <div className="work__head">
          <span className="eyebrow">Examples of our work</span>
          <h2 className="h-1">Real properties around {office.name}.</h2>
        </div>

        <div className="work__grid">
          {office.workExamples.map((example) => (
            <figure className="work__card" key={example.title}>
              <img src={example.photo} alt={example.alt} loading="lazy" />
              <figcaption>
                {example.tag && <span className="work__tag">{example.tag}</span>}
                <h3 className="h-3">{example.title}</h3>
                {example.description && <p className="body-copy">{example.description}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
