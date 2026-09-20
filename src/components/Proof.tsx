import soldFenden from '../assets/photos/sold-sign-fenden-rd.jpg';
import soldRidley from '../assets/photos/sold-sign-ridley.jpg';

// NOTE: We deliberately do not hardcode a review count, rating, or
// leasing volume here. Those figures move over time and a stale number
// on a live campaign page is worse than no number. Link the button
// below to APN's actual realestate.com.au agency profile before launch.
const REVIEWS_PROFILE_URL = '#'; // TODO: replace with the live realestate.com.au agency profile URL

// NOTE: The two photos below are real APN "Sold" signage — evidence that
// APN is an active, real local agency, not stock imagery. They are sales
// results, not property-management or leasing results, and the copy and
// captions here are worded to reflect that distinction accurately.
export default function Proof() {
  return (
    <section id="proof" className="section section-paper-dim proof">
      <div className="wrap proof__inner">
        <div className="proof__copy">
          <span className="eyebrow">Proof, not promises</span>
          <h2 className="h-2">A real, active local agency.</h2>
          <p className="body-copy">
            These are real sales signs from real APN transactions — not
            stock photography. For feedback on our property management
            service specifically, the most current source is our reviews,
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
            <figcaption>Sold — Fenden Road, Salisbury</figcaption>
          </figure>
          <figure>
            <img src={soldRidley} alt="A Sold sign outside a property on Ridley Street, sold by APN" />
            <figcaption>Sold — Ridley Street</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
