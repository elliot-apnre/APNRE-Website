import interiorPhoto from '../assets/photos/interior-corner-windows.jpg';

export default function SwitchSection() {
  return (
    <section id="switch" className="switch">
      <div className="switch__media">
        <img src={interiorPhoto} alt="Interior of a property managed by APN" />
        <div className="switch__scrim" />
      </div>

      <div className="wrap switch__inner">
        <span className="eyebrow">Already have a property manager?</span>
        <h2 className="h-display switch__headline">
          Thinking about
          <br />a change?
        </h2>
        <p className="lede switch__lede">
          Changing property managers is a straightforward process. Tell us
          about your property and we’ll explain what’s involved, including
          how the transition works while your property is tenanted.
        </p>
        <a href="#appraisal" className="btn btn-primary">
          Talk to APN About Switching
        </a>
      </div>
    </section>
  );
}
