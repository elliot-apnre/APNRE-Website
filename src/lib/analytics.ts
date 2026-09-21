// Thin wrapper around the GA4 / Meta Pixel globals loaded in index.html.
// Safe to call even when analytics isn't configured (VITE_GA4_ID /
// VITE_META_PIXEL_ID unset) — both branches just no-op.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire once, right after a successful appraisal-form submission. */
export function trackAppraisalLead() {
  try {
    window.gtag?.('event', 'generate_lead', {
      event_category: 'appraisal_form',
      event_label: 'Free Rental Appraisal',
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
