import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import SafeImg from '../components/SafeImg.jsx';
import { BLOGS } from '../data/blogs.js';

export const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Blogs() {
  return (
    <>
      <Seo title="Design & Branding Blog | Design World" path="/blogs" og="blogs"
        description="Explore Design World's insights on graphic design, branding, printing, and building a stronger visual identity." />
      <PageHero title="Our blogs">
        <p>Browse some of the thoughts we would like to share on design, printing and branding.</p>
      </PageHero>
      <section className="sec light" aria-label="Blog posts">
        <div className="wrap">
          <div className="posts">
            {BLOGS.map((b) => (
              <article key={b.slug} className="post">
                <Link to={`/blogs/${b.slug}`} className="post-img" tabIndex="-1" aria-hidden="true">
                  <SafeImg path={b.img} alt="" label={b.title} />
                </Link>
                <div className="post-body">
                  <p className="meta">{b.tag}{b.date && <> &middot; <time dateTime={b.date}>{fmtDate(b.date)}</time></>}</p>
                  <h2><Link to={`/blogs/${b.slug}`}>{b.title}</Link></h2>
                  <p>{b.excerpt}</p>
                  <Link className="more" to={`/blogs/${b.slug}`} aria-label={`Read more: ${b.title}`}>Read more</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
