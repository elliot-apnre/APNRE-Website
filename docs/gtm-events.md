# GTM events

The site sends its analytics events to the Google Tag Manager dataLayer
(container `GTM-P5H7NTCF`). GTM passes them on to GA4 (`G-WDLJLYGJCY`).
None of these reach GA4 until the matching trigger and tag exist in the
container and the container is published. The code is in
`src/lib/analytics.ts`. The Meta Pixel events (`Lead`, `Contact`) are
sent straight from the page and don't go through GTM.

| dataLayer `event`       | When                                   | Parameters |
| ----------------------- | -------------------------------------- | ---------- |
| `generate_lead`         | Appraisal form accepted by `/api/lead` | `event_category` (`appraisal_form`), `event_label` (`Free Rental Appraisal`), `office` (`home`, `adelaide`, `mount-gambier`), `currently_managed` (`agent`, `self`, `not-rented`, `not_answered`) |
| `appraisal_form_submit` | Straight after `generate_lead`, just before the redirect to `/thank-you/` | `form_name` (`landlord_appraisal`) |
| `click_to_call`         | A tap on a Call button                 | `placement` (`header_menu`, `sticky_bar`, `switch_section`) |

## Setting it up in GTM

1. **Variables → User-Defined → New → Data Layer Variable**, one for
   each of `event_category`, `event_label`, `office`,
   `currently_managed`, `placement`. Use the parameter name as the Data
   Layer Variable Name, and name the variables `DLV - office` and so on.
2. **Triggers → New → Custom Event**:
   - `CE - generate_lead`, event name `generate_lead`
   - `CE - click_to_call`, event name `click_to_call`
3. **Tags → New → Google Analytics: GA4 Event**. Set the Measurement ID
   to `G-WDLJLYGJCY`, or pick the existing Google tag.
   - `GA4 - generate_lead`: event name `generate_lead`. Event parameters:
     `event_category`, `event_label`, `office` and `currently_managed`,
     each set to its `DLV -` variable. Trigger: `CE - generate_lead`.
   - `GA4 - click_to_call`: event name `click_to_call`. Event parameter:
     `placement` = `{{DLV - placement}}`. Trigger: `CE - click_to_call`.
4. Check both in **Preview** mode (Tag Assistant), then **Submit** to
   publish the container.
5. In GA4, go to **Admin → Custom definitions** and add event-scoped
   custom dimensions for `office`, `currently_managed` and `placement`.
   Without them the values are collected but can't be used in reports.
   Then mark `generate_lead` (and `click_to_call` if you want it) as a
   key event under **Admin → Events**.

`appraisal_form_submit` fires on the same submission as `generate_lead`.
If the container already has a GA4 tag on it, count only one of the two
as a key event, or every lead will be counted twice.
