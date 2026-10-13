import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';
import Lightbox from '../components/Lightbox.jsx';
import NotFound from './NotFound.jsx';
import { SERVICES, ALL_PRINTS, bySlug } from '../data/services.js';
import { GALLERY } from '../data/gallery.js';
import { photosFor } from '../data/portfolio.js';

const label = Object.fromEntries(ALL_PRINTS);

export default function ServiceDetail() {
  const { slug } = useParams();
  const [lb, setLb] = useState(null);
  const s = bySlug(slug);
  if (!s) return <NotFound />;

  const local = photosFor(s.slug);
  const items = local.length ? local : s.cat
    ? GALLERY.filter((g) => g.cat === s.cat)
    : s.imgs.map((img) => ({ id: `s-${img}`, path: `services/${img}.webp`, alt: `${label[img]} by Design World` }));

  return (
    <>
      <Seo title={`${s.title} in Salem | Design World`} path={`/services/${s.slug}`} og="services" description={`${s.short} ${s.long}`} />
      <section className="sec dark page-hero">
        <div className="wrap">
          <p className="crumbs"><Link to="/services">Services</Link> / {s.title}</p>
          <h1>{s.title}</h1>
          <div className="lede">
            <p>{s.long}</p>
            <ul className="ticks">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <Link className="btn btn-green" to={`/contact?service=${s.slug}`}>Request a quote</Link>
          </div>
        </div>
      </section>

      <section className="sec deep" aria-labelledby="g-h">
        <div className="wrap">
          <div className="sec-head"><h2 id="g-h">{s.title} gallery</h2></div>
          {items.length ? (
            <GalleryGrid items={items} onOpen={(i) => setLb({ items, index: i })} />
          ) : (
            <div className="ph empty"><span>Placeholder: sample {s.title.toLowerCase()} work is coming soon.</span></div>
          )}
          <p className="center"><Link className="btn btn-green" to={`/contact?service=${s.slug}`}>Request a quote</Link></p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="o-h">
        <div className="wrap">
          <div className="sec-head"><h2 id="o-h">Other services</h2></div>
          <ul className="svc-links svc-links-light">
            {SERVICES.filter((x) => x.slug !== s.slug).map((x) => <li key={x.slug}><Link to={`/services/${x.slug}`}>{x.title}</Link></li>)}
          </ul>
        </div>
      </section>
      {lb && <Lightbox items={lb.items} index={lb.index} onClose={() => setLb(null)} onIndex={(i) => setLb({ ...lb, index: i })} />}
    </>
  );
}
