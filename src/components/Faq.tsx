const FAQS = [
  {
    q: 'How much does property management cost?',
    a: 'Management fees vary depending on your property and what you need. Get in touch and we\u2019ll give you a straight answer for your specific property.',
  },
  {
    q: 'Can I change property managers if my property is currently tenanted?',
    a: 'Yes \u2014 it\u2019s a normal process and doesn\u2019t need to disrupt an existing tenancy. Tell us your situation and we\u2019ll explain how it would work for your property.',
  },
  {
    q: 'Who will manage my property, and can I speak to them directly?',
    a: 'A named property manager from our team. You\u2019ll know who they are and be able to reach them directly.',
  },
  {
    q: 'Can APN manage my property if I live interstate?',
    a: 'Get in touch with the details of your property and where you\u2019re based, and we\u2019ll let you know how we can help.',
  },
  {
    q: 'How quickly can my property be leased?',
    a: 'This depends on the property, the market, and the time of year. Ask us for a rental appraisal and we\u2019ll give you a realistic view for your property.',
  },
];

export default function Faq() {
  return (
    <section id="faq" className="section section-paper faq">
      <div className="wrap">
        <div className="faq__head">
          <span className="eyebrow">Common questions</span>
          <h2 className="h-1">Questions landlords ask us.</h2>
        </div>

        <div className="faq__list">
          {FAQS.map((item) => (
            <details className="faq__item" key={item.q}>
              <summary>{item.q}</summary>
              <p className="body-copy">{item.a}</p>
            </details>
          ))}
        </div>

        <p className="faq__more">
          Don’t see your question? <a href="#appraisal">Ask us directly</a> —
          we’d rather give you an accurate answer than a generic one.
        </p>
      </div>
    </section>
  );
}
