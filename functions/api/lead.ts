// Cloudflare Pages Function — receives the appraisal form POST from the
// browser (same-origin, so no CORS headaches) and forwards it server-side
// to a Google Sheet via an Apps Script Web App webhook.
//
// Why a function in the middle instead of pointing the form straight at
// the Apps Script URL?
//   - Keeps the webhook URL out of the client-side bundle.
//   - Gives us one seam to add validation, spam checks, or a second
//     destination (e.g. PropertyMe, once/if a real lead-intake API or
//     partner integration is confirmed with them) without touching the
//     frontend again.
//
// Setup:
//   1. Create the Google Sheet + Apps Script webhook (see
//      docs/google-sheet-lead-webhook.md in this repo for the script).
//   2. In the Cloudflare Pages project settings → Settings → Environment
//      variables, add:
//        SHEETS_WEBHOOK_URL = https://script.google.com/macros/s/XXX/exec
//   3. Deploy. The form already posts to /api/lead (see AppraisalForm.tsx).

interface Env {
  SHEETS_WEBHOOK_URL: string;
}

const REQUIRED_FIELDS = ['name', 'email', 'phone', 'address'] as const;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ ok: false, error: 'Invalid form submission.' }, 400);
  }

  const payload: Record<string, string> = {};
  for (const field of ['name', 'email', 'phone', 'address', 'message'] as const) {
    payload[field] = String(formData.get(field) ?? '').trim();
  }

  // Honeypot: a hidden field named "company" in the form should always be
  // empty for a real visitor. If it's filled, silently pretend success —
  // don't tip off the bot, don't waste a row in the sheet.
  const honeypot = String(formData.get('company') ?? '').trim();
  if (honeypot) {
    return json({ ok: true });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !payload[field]);
  if (missing.length > 0) {
    return json({ ok: false, error: `Missing required field(s): ${missing.join(', ')}` }, 400);
  }

  if (!env.SHEETS_WEBHOOK_URL) {
    return json({ ok: false, error: 'Lead intake is not configured (SHEETS_WEBHOOK_URL missing).' }, 500);
  }

  try {
    const sheetRes = await fetch(env.SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        source: 'apnre-website / appraisal form',
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!sheetRes.ok) {
      throw new Error(`Sheet webhook responded ${sheetRes.status}`);
    }
  } catch (err) {
    console.error('Failed to forward lead to sheet webhook:', err);
    return json({ ok: false, error: 'Could not record submission. Please try again.' }, 502);
  }

  return json({ ok: true });
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
