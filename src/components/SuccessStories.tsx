import type { Office } from '../data/offices';

// Renders nothing until the office has at least one real story in
// src/data/offices.ts — an empty "testimonials coming soon" block on a
// live campaign page does more harm than no section at all.
export default function SuccessStories({ office }: { office: Office }) {
  if (office.successStories.length === 0) return null;

  return (
    <section id="stories" className="section section-paper-dim stories">
      <div className="wrap">
        <div className="stories__head">
          <span className="eyebrow">Success stories</span>
          <h2 className="h-1">What {office.name} landlords say.</h2>
        </div>

        <div className="stories__grid">
          {office.successStories.map((story) => (
            <figure className="stories__card" key={story.quote}>
              <blockquote>
                <p>“{story.quote}”</p>
              </blockquote>
              <figcaption>
                <strong>{story.attribution}</strong>
                {story.suburb && <span>{story.suburb}</span>}
                {story.sourceLabel &&
                  (story.sourceUrl ? (
                    <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {story.sourceLabel} ↗
                    </a>
                  ) : (
                    <span>{story.sourceLabel}</span>
                  ))}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
