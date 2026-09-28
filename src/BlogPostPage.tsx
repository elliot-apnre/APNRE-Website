import Header from './components/Header';
import AppraisalForm from './components/AppraisalForm';
import Footer from './components/Footer';
import StickyMobileCta from './components/StickyMobileCta';
import PostCard from './components/PostCard';
import Picture from './components/Picture';
import { TEAM } from './data/team';
import { POST_BODY_ID, formatDate, type PostMeta } from './blog/types';

interface BlogPostPageProps {
  post: PostMeta;
  /** The post body, already rendered from Markdown. */
  bodyHtml: string;
  related: PostMeta[];
}

export default function BlogPostPage({ post, bodyHtml, related }: BlogPostPageProps) {
  // Only credit a real team member; anything else falls back to APN.
  const author = TEAM.find((m) => m.name === post.author);

  return (
    <>
      <Header nav={[{ href: '/blog/', label: 'Blog' }]} />
      <main id="top">
        <article className="section section-paper post">
          <div className="wrap post__inner">
            <nav className="post__crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/blog/">Blog</a>
            </nav>

            {post.draft && (
              <p className="post__draft" role="note">
                Draft: only visible on the dev server. Remove <code>draft: true</code> to publish.
              </p>
            )}

            <h1 className="h-1 post__title">{post.title}</h1>
            <p className="lede post__lede">{post.description}</p>

            <p className="post__meta">
              <span>{author ? author.name : 'APN Real Estate'}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </p>

            {post.image && (
              <img className="post__hero" src={post.image} alt={post.imageAlt ?? ''} />
            )}

            <div id={POST_BODY_ID} className="prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            {author && (
              <aside className="post__author" aria-label="About the author">
                <Picture
                  photo={author.photo}
                  alt=""
                  style={author.focalPoint ? { objectPosition: author.focalPoint } : undefined}
                />
                <div>
                  <p className="post__author-name">{author.name}</p>
                  <p className="post__author-role">{author.role}, APN Real Estate</p>
                </div>
              </aside>
            )}
          </div>
        </article>

        <AppraisalForm />

        {related.length > 0 && (
          <section className="section section-paper-dim post-more" aria-labelledby="post-more-heading">
            <div className="wrap">
              <h2 id="post-more-heading" className="h-2 post-more__heading">More from the blog</h2>
              <ul className="post-grid">
                {related.map((p) => (
                  <li key={p.slug}>
                    <PostCard post={p} headingLevel="h3" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
