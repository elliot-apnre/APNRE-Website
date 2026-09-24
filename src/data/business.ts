// Business-wide details shown in the footer, privacy policy and call
// buttons. Keep these in one place so every page stays consistent.

export const BUSINESS_NAME = 'APN Real Estate';

/** Main line, used for every "Call" button. Both offices share it. */
export const PHONE_DISPLAY = '1300 123 276';
export const PHONE_TEL = 'tel:1300123276';

/** Legal entity details for the compliance line in the footer. Each one
 *  is only shown once it's filled in, so nothing half-finished goes live.
 *  Take these from the actual registration records rather than old
 *  signage: an SA agent has to show the RLA number that's current. */
export const LEGAL_ENTITY_NAME = '';
export const ABN = '';
export const RLA_NUMBER = '';

/** Where privacy requests go. Leave the email blank until there's a
 *  monitored inbox for it. The policy falls back to phone and post. */
export const PRIVACY_EMAIL = '';
