// Thin wrapper around the GA4 / Meta Pixel globals loaded in index.html.
// Safe to call even when analytics isn't configured (VITE_GA4_ID /
// VITE_META_PIXEL_ID unset) — both branches just no-op.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire once, right after a successful appraisal-form submission.
 *  `office` is set when the form was on an office page; `managed` is the
 *  answer to "is it currently managed?" (empty if skipped). */
export function trackAppraisalLead(office?: string, managed?: string) {
  try {
    window.gtag?.('event', 'generate_lead', {
      event_category: 'appraisal_form',
      event_label: 'Free Rental Appraisal',
      office: office ?? 'home',
      currently_managed: managed || 'not_answered',
    });
  } catch (err) {
    console.warn('GA4 lead event failed:', err);
  }

  try {
    window.fbq?.('track', 'Lead', {
      content_name: 'Free Rental Appraisal',
    });
  } catch (err) {
    console.warn('Meta Pixel lead event failed:', err);
  }
}

/** Fire once, right after a successful appraisal-form submission, before
 *  the redirect to /thank-you/ — lets a GTM trigger fire a conversion off
 *  this event without depending on gtag's own `generate_lead` event. */
export function trackAppraisalFormSubmit(formName: string) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'appraisal_form_submit', form_name: formName });
  } catch (err) {
    console.warn('dataLayer push failed:', err);
  }
}

/** A tap on a "Call" button. `placement` says which one. */
export function trackCallClick(placement: string) {
  try {
    window.gtag?.('event', 'click_to_call', { placement });
  } catch (err) {
    console.warn('GA4 call event failed:', err);
  }

  try {
    window.fbq?.('track', 'Contact', { content_name: placement });
  } catch (err) {
    console.warn('Meta Pixel call event failed:', err);
  }
}
