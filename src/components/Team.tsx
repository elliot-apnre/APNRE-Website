import { TEAM, type TeamMember } from '../data/team';

function ContactLines({ member }: { member: TeamMember }) {
  if (!member.phone && !member.email) return null;
  return (
    <p className="team__contact">
      {member.phone && <a href={`tel:${member.phone.replace(/\s+/g, '')}`}>{member.phone}</a>}
      {member.email && <a href={`mailto:${member.email}`}>{member.email}</a>}
    </p>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="team__card">
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
      <ContactLines member={member} />
    </div>
  );
}

function TeamLeader({ member }: { member: TeamMember }) {
  return (
    <div className="team__leader">
      <div className="team__leader-portrait">
        <img
          src={member.photo}
          alt={member.name}
          style={member.focalPoint ? { objectPosition: member.focalPoint } : undefined}
        />
      </div>
      <div className="team__leader-body">
        <h3 className="h-3">{member.name}</h3>
        <p className="team__role">{member.role}</p>
        <p className="team__bio">{member.bio}</p>
        <ContactLines member={member} />
      </div>
    </div>
  );
}

export default function Team() {
  const propertyManagers = TEAM.filter((m) => m.group === 'property-management');
  const leadership = TEAM.filter((m) => m.group === 'leadership');

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

        <div className="team__group">
          <h3 className="team__group-label">Property Management</h3>
          <div className="team__grid">
            {propertyManagers.map((member) => (
              <TeamCard member={member} key={member.name} />
            ))}
          </div>
        </div>

        <div className="team__group">
          <h3 className="team__group-label">Leadership / Sales</h3>
          {leadership.map((member) => (
            <TeamLeader member={member} key={member.name} />
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
