import Header from './components/Header';
import Footer from './components/Footer';
import StickyMobileCta from './components/StickyMobileCta';
import PostCard from './components/PostCard';
import type { PostMeta } from './blog/types';

// The homepage's form, since this page has none of its own.
const FORM_HREF = '/#appraisal';

export default function BlogIndexPage({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <Header nav={[]} ctaHref={FORM_HREF} />
      <main id="top" className="section section-paper blog">
        <div className="wrap">
          <div className="blog__intro">
            <span className="eyebrow">Blog</span>
            <h1 className="h-1">Advice for landlords</h1>
            <p className="lede">
              Practical guides on renting out and managing property in
              Adelaide and Mount Gambier, from the APN property management
              team.
            </p>
          </div>

          {posts.length > 0 ? (
            <ul className="post-grid">
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} headingLevel="h2" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="body-copy blog__empty">The first articles are on their way.</p>
          )}
        </div>
      </main>
      <Footer ctaHref={FORM_HREF} />
      <StickyMobileCta ctaHref={FORM_HREF} />
    </>
  );
}
