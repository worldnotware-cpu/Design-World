import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import SafeImg from '../components/SafeImg.jsx';
import BlogBody from '../components/BlogBody.jsx';
import NotFound from './NotFound.jsx';
import { BLOGS } from '../data/blogs.js';
import { fmtDate } from './Blogs.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const i = BLOGS.findIndex((b) => b.slug === slug);
  if (i < 0) return <NotFound />;
  const b = BLOGS[i];
  const more = BLOGS.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo title={`${b.title} | Design World`} path={`/blogs/${b.slug}`} og="blogs" type="article" description={b.excerpt} />
      <section className="sec dark page-hero">
        <div className="wrap narrow">
          <p className="crumbs"><Link to="/blogs">Blogs</Link> / {b.tag}</p>
          <h1>{b.title}</h1>
          <p className="lede">{b.excerpt}</p>
          {b.date && <p className="meta"><time dateTime={b.date}>{fmtDate(b.date)}</time></p>}
        </div>
      </section>
      <article className="sec light">
        <div className="wrap narrow">
          <SafeImg className="post-hero" path={b.img} alt={b.title} label={b.title} />
          <div className="prose"><BlogBody text={b.body} /></div>
          <p><Link className="btn btn-black" to="/contact">Contact us</Link></p>
        </div>
      </article>
      <section className="sec dark" aria-labelledby="more-h">
        <div className="wrap">
          <div className="sec-head"><h2 id="more-h">More from our blog</h2></div>
          <ul className="svc-links">{more.map((x) => <li key={x.slug}><Link to={`/blogs/${x.slug}`}>{x.title}</Link></li>)}</ul>
        </div>
      </section>
    </>
  );
}
