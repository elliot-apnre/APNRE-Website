import { TEAM } from '../data/team';

export default function Team() {
  return (
    <section id="team" className="section section-paper team">
      <div className="wrap">
        <div className="team__head">
          <span className="eyebrow">Meet the team</span>
          <h2 className="h-1">Know who’s looking after your property.</h2>
          <p className="lede">
            A named property manager you can reach directly.
          </p>
        </div>

        <div className="team__grid">
          {TEAM.map((member) => (
            <div className="team__card" key={member.name}>
              <div className="team__portrait">
                <img
                  src={member.photo}
                  alt={member.name}
                  style={member.focalPoint ? { objectPosition: member.focalPoint } : undefined}
                />
              </div>
              <h3 className="h-3">{member.name}</h3>
              <p className="team__role">{member.role}</p>
              <p className="team__bio">{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="team__cta">
          <a href="#appraisal" className="btn btn-outline-dark">
            Get My Free Rental Appraisal
          </a>
        </div>
      </div>
    </section>
  );
}
