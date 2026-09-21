import { useState, type FormEvent } from 'react';
import { trackAppraisalLead } from '../lib/analytics';

// Posts to the Cloudflare Pages Function at functions/api/lead.ts, which
// forwards the submission server-side to a Google Sheet (see
// docs/google-sheet-lead-webhook.md for setup). Same-origin, so no CORS
// configuration needed. Swap this if the intake mechanism ever changes.
const FORM_ENDPOINT = '/api/lead';

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
      trackAppraisalLead();
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
            Tell us about your property. A local APN property manager will
            review the details and contact you directly.
          </p>

          <div className="appraisal__steps">
            <span className="appraisal__steps-label">What happens next</span>
            <ol className="appraisal__steps-list">
              <li>
                <span className="appraisal__step-num">01</span>
                <div>
                  <h4>We review your property</h4>
                  <p>We review the information you’ve provided and assess the property.</p>
                </div>
              </li>
              <li>
                <span className="appraisal__step-num">02</span>
                <div>
                  <h4>We contact you</h4>
                  <p>An APN property manager gets in touch directly.</p>
                </div>
              </li>
              <li>
                <span className="appraisal__step-num">03</span>
                <div>
                  <h4>You decide</h4>
                  <p>There’s no obligation to appoint APN.</p>
                </div>
              </li>
            </ol>
          </div>
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
              {/* Honeypot — hidden from real visitors via CSS, invisible to
                  screen readers. Bots that fill every field trip this and
                  functions/api/lead.ts silently drops the submission.
                  Deliberately NOT named/labelled like a real field (e.g.
                  "company", "website") — browser autofill ignores CSS
                  visual-hiding and will happily fill a hidden field if its
                  name/label matches a saved profile value, which silently
                  drops real submissions exactly like a bot would. */}
              <div className="appraisal__honeypot" aria-hidden="true">
                <label>
                  Leave this field blank
                  <input type="text" name="hp_confirm" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

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
