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
          Changing property managers is a normal, straightforward process —
          it doesn’t need to disrupt your tenancy. Tell us about your
          property and we’ll talk you through what’s involved, so you can
          make your own decision about what’s right for it.
        </p>
        <a href="#appraisal" className="btn btn-primary">
          I'm Thinking of Changing Property Managers
        </a>
      </div>
    </section>
  );
}
