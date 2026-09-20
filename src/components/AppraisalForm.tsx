import { useState, type FormEvent } from 'react';

// Integration point: set this to a real endpoint (your CRM, a serverless
// function, Formspree, a Zapier webhook, etc.) before launch. While this
// is empty, the form makes that explicit in the UI instead of pretending
// a submission was received.
const FORM_ENDPOINT = '';

type Status = 'idle' | 'submitting' | 'sent' | 'error' | 'not-connected';

export default function AppraisalForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!FORM_ENDPOINT) {
      // No backend configured. Do not fake a successful lead capture —
      // tell the truth in the UI instead.
      setStatus('not-connected');
      return;
    }

    setStatus('submitting');
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: formData });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('sent');
    } catch (err) {
      console.error('Appraisal form submission failed:', err);
      setStatus('error');
    }
  }

  const showForm = status === 'idle' || status === 'submitting' || status === 'error';

  return (
    <section id="appraisal" className="section section-paper appraisal">
      <div className="wrap appraisal__grid">
        <div className="appraisal__copy">
          <span className="eyebrow">Free rental appraisal</span>
          <h2 className="h-1">What is your property really worth to rent?</h2>
          <p className="lede">
            Tell us a little about your property and one of our property
            managers will get back to you with an honest, no-obligation
            rental appraisal. Already have a property manager? Mention it
            in the note below — this is the same form we use for that
            conversation too.
          </p>

          <dl className="appraisal__facts">
            <div>
              <dt>What happens next</dt>
              <dd>
                A property manager reviews your details and contacts you
                directly — by phone or email, whichever you prefer.
              </dd>
            </div>
            <div>
              <dt>No obligation</dt>
              <dd>Requesting an appraisal doesn’t commit you to anything.</dd>
            </div>
          </dl>
        </div>

        <div className="appraisal__form-wrap">
          {!FORM_ENDPOINT && showForm && (
            <div className="appraisal__dev-notice" role="note">
              <strong>Development notice:</strong> this form isn’t connected
              to a live backend yet. Submissions will not be sent or
              received until an integration is added — see the
              <code> FORM_ENDPOINT</code> constant in
              <code> AppraisalForm.tsx</code>.
            </div>
          )}

          {status === 'sent' && (
            <div className="appraisal__result appraisal__result--success" role="status">
              <h3 className="h-3">Thanks — we’ve got your details.</h3>
              <p className="body-copy">
                A member of the APN property management team will be in
                touch shortly. If it’s urgent, call the office directly.
              </p>
            </div>
          )}

          {status === 'not-connected' && (
            <div className="appraisal__result appraisal__result--warning" role="status">
              <h3 className="h-3">This form isn’t connected yet.</h3>
              <p className="body-copy">
                Your details were <strong>not</strong> sent anywhere — this
                build has no backend wired up, so nothing was received on
                APN’s end. Once a real submission endpoint is connected,
                this message will be replaced with an actual confirmation.
              </p>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => setStatus('idle')}
              >
                Back to the form
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="appraisal__dev-notice appraisal__dev-notice--error" role="alert">
              Something went wrong sending this form. Please try again, or
              call the office directly.
            </div>
          )}

          {showForm && (
            <form className="appraisal__form" onSubmit={handleSubmit} noValidate>
              <div className="appraisal__row">
                <label>
                  Name*
                  <input type="text" name="name" required autoComplete="name" />
                </label>
              </div>

              <div className="appraisal__row appraisal__row--split">
                <label>
                  Email*
                  <input type="email" name="email" required autoComplete="email" />
                </label>
                <label>
                  Phone*
                  <input type="tel" name="phone" required autoComplete="tel" />
                </label>
              </div>

              <div className="appraisal__row">
                <label>
                  Property address*
                  <input type="text" name="address" required autoComplete="street-address" />
                </label>
              </div>

              <div className="appraisal__row">
                <label>
                  Anything else that helps? (optional)
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Property type, bedrooms, current rent, current property manager — whatever's useful."
                  />
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Get My Free Rental Appraisal'}
              </button>
              <p className="appraisal__fineprint">* Required.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
