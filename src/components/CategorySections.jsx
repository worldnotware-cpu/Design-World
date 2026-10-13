import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Bento from './Bento.jsx';
import Lightbox from './Lightbox.jsx';
import { SecHead } from './Reveal.jsx';
import { PORTFOLIO } from '../data/portfolio.js';

export function CatNav() {
  return (
    <nav className="catnav" aria-label="Jump to category">
      {PORTFOLIO.map((c) => <Link key={c.id} to={`/services#${c.id}`}>{c.tag}</Link>)}
    </nav>
  );
}

export default function CategorySections() {
  const [lb, setLb] = useState(null);
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350);
    return () => clearTimeout(t);
  }, [hash]);
  return (
    <>
      {PORTFOLIO.map((c, i) => (
        <section key={c.id} id={c.id} className="sec cat-sec" aria-labelledby={`${c.id}-h`}>
          <div className="wrap">
            <SecHead eyebrow={`${String(i + 1).padStart(2, '0')} / ${PORTFOLIO.length}`} title={c.title} id={`${c.id}-h`}><p>{c.blurb}</p></SecHead>
            <Bento items={c.items} flip={i % 2 === 1} onOpen={(k) => setLb({ items: c.items, index: k })} />
            <p className="center"><Link className="btn btn-green" to={`/contact?service=${c.service}`}>Request {c.tag.toLowerCase()} quote</Link></p>
          </div>
        </section>
      ))}
      {lb && <Lightbox items={lb.items} index={lb.index} onClose={() => setLb(null)} onIndex={(i) => setLb({ ...lb, index: i })} />}
    </>
  );
}