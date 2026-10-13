import { useState } from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import SafeImg from '../components/SafeImg.jsx';
import Lightbox from '../components/Lightbox.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Reveal, { SecHead } from '../components/Reveal.jsx';
import { CatNav } from '../components/CategorySections.jsx';
import { GALLERY } from '../data/gallery.js';

// The first 33 works are the category photos already shown above (PORTFOLIO). The archive shows works 34-89,
// which are the 56 design samples (ids start with "d").
const ARCHIVE = GALLERY.filter((g) => g.id.startsWith('d'));

export default function Work() {
  const [lb, setLb] = useState(null);
  return (
    <>
      <Seo title="Our Work | Design Gallery | Design World" path="/work" og="gallery"
        description="Explore selected design, branding, and creative works by Design World." />
      <PageHero title="Work we are proud of">
        <p>Business cards, wedding invitations, banners, brochures and more &mdash; a selection of what we have designed and printed for businesses and families across Salem and beyond.</p>
        <CatNav />
      </PageHero>

      <section className="sec" aria-labelledby="arc-h">
        <div className="wrap wide">
          <SecHead eyebrow="Archive" title="More from our studio" id="arc-h" />
          <ul className="archive">
            {ARCHIVE.map((g, i) => (
              <motion.li key={g.id} initial={{ opacity: 0, y: 60, scale: 0.92 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: (i % 4) * 0.09, ease: [0.2, 0.8, 0.2, 1] }}>
                <button className="arc-card" onClick={() => setLb({ items: ARCHIVE, index: i })} aria-label={`Enlarge: ${g.alt}`}>
                  <SafeImg path={g.path} alt="" label={g.alt} />
                  <span className="arc-no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="arc-zoom" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22"><path d="M11 4a7 7 0 105 12l4 4 1.4-1.4-4-4A7 7 0 0011 4zm-1 3h2v3h3v2h-3v3h-2v-3H7v-2h3z" fill="currentColor" /></svg>
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" aria-labelledby="t-h">
        <div className="wrap">
          <SecHead eyebrow="Reviews" title="What our customers say" id="t-h" />
          <Reveal><Testimonials /></Reveal>
        </div>
      </section>
      {lb && <Lightbox items={lb.items} index={lb.index} onClose={() => setLb(null)} onIndex={(i) => setLb({ ...lb, index: i })} />}
    </>
  );
}