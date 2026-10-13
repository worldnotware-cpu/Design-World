import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../components/Seo.jsx';
import SafeImg from '../components/SafeImg.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Marquee from '../components/Marquee.jsx';
import Faq from '../components/Faq.jsx';
import Counter from '../components/Counter.jsx';
import Reveal, { SecHead, Words } from '../components/Reveal.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import Bento from '../components/Bento.jsx';
import Lightbox from '../components/Lightbox.jsx';
import { PORTFOLIO } from '../data/portfolio.js';
// import { SITE, WHY, FAQ, STATS } from '../data/content.js';
import { bySlug } from '../data/services.js';
import { SITE, WHY, FAQ, STATS, VISION, MISSION, VISION_POINTS, MISSION_POINTS } from '../data/content.js';
   import WhyWave from '../components/WhyWave.jsx';

// [service slug, card title]. "Hoarding" opens the Banners & Hoardings page.
const HOME_CARDS = [
  ['banners', 'Hoarding'], ['visiting-cards', 'Visiting Cards'], ['logo-design', 'Logo Design'],
  ['brochures', 'Brochures'], ['book-printing', 'Book Printing / Publishing'], ['wedding-cards', 'Wedding Cards'],
];

const LD = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness', name: SITE.name, url: SITE.url,
  description: SITE.description, telephone: SITE.phones[0].tel, email: SITE.email, foundingDate: '2017-09-08',
  address: { '@type': 'PostalAddress', streetAddress: 'Shree Lakshmi Complex, 296 & 33/4, Omalur, Swarnapuri', addressLocality: 'Salem', addressRegion: 'Tamil Nadu', postalCode: '636004', addressCountry: 'IN' },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  sameAs: [SITE.instagram],
};

export default function Home() {
  const [tab, setTab] = useState(0);
  const [lb, setLb] = useState(null);
  const cat = PORTFOLIO[tab];
  return (
    <>
      <Seo title="Design World | Design, Printing & Branding in Salem" path="/" og="index" />
      <script type="application/ld+json">{JSON.stringify(LD)}</script>

      <section className="sec dark hero" aria-labelledby="hero-h">
        <div className="glow" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Reveal as="span" y={14} className="eyebrow">Salem &middot; Since 2017</Reveal>
            <h1 id="hero-h"><Words text="Creative design, printing & branding solutions" /></h1>
            <Reveal delay={0.35} className="lede"><p>We help businesses build a strong visual identity through thoughtful design, quality printing, and effective branding.</p></Reveal>
            <Reveal delay={0.5} className="btn-row">
              <Link className="btn btn-green" to="/contact">Get a quote</Link>
              <Link className="btn btn-line" to="/work">View our work</Link>
            </Reveal>
            <Reveal delay={0.65} className="hero-stats">
              {STATS.map((x) => <div key={x.label}><strong><Counter to={x.to} suffix={x.suffix} /></strong><span>{x.label}</span></div>)}
            </Reveal>
          </div>
          <HeroSlider />
        </div>
       
      </section>

      <section className="sec light" aria-labelledby="svc-h">
        <div className="wrap">
          <SecHead eyebrow="What we do" title="Our creative services" id="svc-h"><p>From a single business card to complete in-shop branding, design and print under one roof.</p></SecHead>
          <div className="cards">
            {HOME_CARDS.map(([slug, title], i) => <Reveal key={slug} delay={(i % 3) * 0.1}><ServiceCard service={bySlug(slug)} title={title} /></Reveal>)}
          </div>
          <p className="center"><Link className="btn btn-black" to="/services">Explore all services</Link></p>
        </div>
      </section>

      <section className="sec dark" aria-labelledby="show-h">
        <div className="wrap">
          <SecHead eyebrow="Portfolio" title="Our work, by category" id="show-h"><p>Pick a category to see what we have designed and printed.</p></SecHead>
          <Reveal className="chips" delay={0.1}>
            {PORTFOLIO.map((c, i) => (
              <button key={c.id} className="chip" aria-pressed={tab === i} onClick={() => setTab(i)}>
                {tab === i && <motion.span layoutId="pill" className="pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span>{c.tag}</span>
              </button>
            ))}
          </Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <p className="cat-blurb">{cat.blurb}</p>
              <Bento items={cat.items} flip={tab % 2 === 1} onOpen={(i) => setLb({ items: cat.items, index: i })} />
            </motion.div>
          </AnimatePresence>
          <p className="center"><Link className="btn btn-green" to="/work">See all work</Link></p>
        </div>
      </section>
{/* 
      <section className="sec green" aria-labelledby="about-h">
        <div className="wrap">
          <SecHead eyebrow="About us" title="Built on experience. Driven by quality." id="about-h">
            <p className="big">Design World has helped businesses and individuals bring their ideas to life with thoughtful design and quality printing since 2017. From a business card to complete in-shop branding, we bring design, printing and branding together.</p>
          </SecHead>
          <div className="stats">
            {STATS.map((x, i) => <Reveal key={x.label} delay={i * 0.12} className="stat"><strong><Counter to={x.to} suffix={x.suffix} /></strong><span>{x.label}</span></Reveal>)}
          </div>
          <div className="vm vm-home">
  <Reveal as="article"><h3>Our vision</h3><p>{VISION}</p><ul className="ticks">{VISION_POINTS.map((t) => <li key={t}>{t}</li>)}</ul></Reveal>
  <Reveal as="article" delay={0.12}><h3>Our mission</h3><p>{MISSION}</p><ul className="ticks">{MISSION_POINTS.map((t) => <li key={t}>{t}</li>)}</ul></Reveal>
</div>
          <p className="center"><Link className="btn btn-black" to="/about">Learn more about us</Link></p>
        </div>
      </section> */}

      <section className="sec light" aria-labelledby="why-h">
        <div className="wrap">
          <SecHead eyebrow="Why Design World" title="Why choose us" id="why-h"><p>Great design helps businesses communicate, build trust, and stand out. This is how we work.</p></SecHead>
           <WhyWave items={WHY} />
        </div>
      </section>

      <section className="sec dark clients" aria-labelledby="cl-h">
        <div className="wrap"><SecHead eyebrow="Clients" title="Happy clients, trusted by businesses" id="cl-h" /></div>
        <Marquee />
      </section>

      <section className="sec light" aria-labelledby="faq-h">
        <div className="wrap">
          <SecHead eyebrow="FAQ" title="Frequently asked questions" id="faq-h"><p>Can&rsquo;t find your answer? <Link className="ulink" to="/contact">Ask our team</Link>.</p></SecHead>
          <Reveal delay={0.1}><Faq items={FAQ} /></Reveal>
        </div>
      </section>
      {lb && <Lightbox items={lb.items} index={lb.index} onClose={() => setLb(null)} onIndex={(i) => setLb({ ...lb, index: i })} />}
    </>
  );
}
