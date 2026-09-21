import soldFenden from '../assets/photos/sold-sign-fenden-rd.jpg';
import soldRidley from '../assets/photos/sold-sign-ridley.jpg';

// NOTE: We deliberately do not hardcode a review count, rating, or
// leasing volume here. Those figures move over time and a stale number
// on a live campaign page is worse than no number — link straight to
// APN's live realestate.com.au agency profile instead.
const REVIEWS_PROFILE_URL = 'https://www.realestate.com.au/agency/adelaide-property-network-blair-athol-JIASZF';

// NOTE: The two photos below are real APN "Sold" signage — evidence that
// APN is an active, real local agency, not stock imagery. They are sales
// results, not property-management results, so the copy here leads with
// the property-management proof point (a named, reachable manager) and
// uses the photos only as secondary evidence that APN is a genuine,
// working local business rather than a shell operation.
export default function Proof() {
  return (
    <section id="proof" className="section section-paper-dim proof">
      <div className="wrap proof__inner">
        <div className="proof__copy">
          <span className="eyebrow">Proof, not promises</span>
          <h2 className="h-2">Real people. Real properties. Real accountability.</h2>
          <p className="body-copy">
            You’ll know the name of the property manager looking after your
            property, and how to reach them directly. For feedback on our
            service specifically, the most current source is our reviews —
            not a number quoted on this page.
          </p>
          <a
            href={REVIEWS_PROFILE_URL}
            className="proof__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            See our current reviews on realestate.com.au ↗
          </a>
        </div>

        <div className="proof__media">
          <figure>
            <img src={soldFenden} alt="A Sold sign outside a property on Fenden Road, Salisbury, sold by APN" />
            <figcaption>Fenden Road, Salisbury</figcaption>
          </figure>
          <figure>
            <img src={soldRidley} alt="A Sold sign outside a property on Ridley Street, sold by APN" />
            <figcaption>Ridley Street</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
