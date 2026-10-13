import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import SafeImg from '../components/SafeImg.jsx';
import Counter from '../components/Counter.jsx';
import { SecHead } from '../components/Reveal.jsx';
import { SITE, STATS, VISION, MISSION, VISION_POINTS, MISSION_POINTS } from '../data/content.js';
import { FOUNDER } from '../data/assets.js';

export default function About() {
  return (
    <>
      <Seo title="About Design World | Design & Printing" path="/about" og="about"
        description="Learn about Design World, our journey, experience, and approach to helping businesses bring their ideas to life through design, printing, and branding." />
      <PageHero title="Welcome to Design World">
        <p>Thoughtful design and quality printing for businesses and individuals, since {SITE.founded}.</p>
      </PageHero>

      <section className="sec dark about-story" aria-labelledby="story-h">
        <div className="wrap split split-img">
          <figure className="founder crop">
            <SafeImg path={FOUNDER} alt={`${SITE.owner.name}, ${SITE.owner.role}, Design World`} label="Owner photo to be added" />
            <figcaption><strong>{SITE.owner.name}</strong><br />{SITE.owner.role}, Design World</figcaption>
          </figure>
          <div>
            <h2 id="story-h">Our story</h2>
            <p>Design World began its journey on 08 September 2017, founded by M. Nagaraj, Managing Director, with a clear vision and the determination to build something meaningful. With experience as his strongest foundation and determination as his driving force, Nagaraj started the journey as a lone warrior, taking on every challenge personally and learning from every opportunity.</p>
            <p>Our first office was established opposite Chennai Silks. It was a modest beginning, but it became the starting point of a journey that would grow through experience, hard work, relationships, and perseverance.</p>
            <p>For over 9 years, Design World has helped businesses and individuals bring their ideas to life with thoughtful design and quality printing. What started as a small passion has grown into a trusted partner for branding, printing and design solutions that make an impact.</p>
            <dl className="facts">
              <div><dt>Founder</dt><dd>{SITE.owner.name}, {SITE.owner.role}</dd></div>
              <div><dt>Established</dt><dd>{SITE.founded}</dd></div>
              <div><dt>Today</dt><dd>{SITE.address.replace('Design World, ', '')}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="vm-h">
        <div className="wrap">
      <SecHead eyebrow="Our purpose" title="Vision & mission" id="vm-h"><p>Where we are headed, and how we get there every day.</p></SecHead>
          <div className="vm">
         <article><h3>Our vision</h3><p>{VISION}</p><ul className="ticks">{VISION_POINTS.map((t) => <li key={t}>{t}</li>)}</ul></article>
<article><h3>Our mission</h3><p>{MISSION}</p><ul className="ticks">{MISSION_POINTS.map((t) => <li key={t}>{t}</li>)}</ul></article>
          </div>
        </div>
      </section>

      <section className="sec green" aria-labelledby="stats-h">
        <div className="wrap">
          <h2 id="stats-h" className="sr-only">Design World in numbers</h2>
          <ul className="stats">
            {STATS.map((s) => (
              <li key={s.label} className="stat">
                <strong><Counter to={s.to} suffix={s.suffix} /></strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec dark" aria-labelledby="mot-h">
        <div className="wrap split">
          <h2 id="mot-h">Where you start does not define where you go.</h2>
          <div>
            <p>Every journey has its challenges. What matters is the determination to continue. Design World&rsquo;s story began with one person taking a courageous first step. There was no certainty about how far the journey would go &mdash; only the belief that hard work, experience, and persistence could create something meaningful.</p>
            <p>We believe that small beginnings can lead to great possibilities. We believe every challenge has something to teach us. We believe every experience can make us better. And we believe that success is built through thousands of small efforts made consistently over time.</p>
            <p>The journey from the first office opposite Chennai Silks to Lakshmi Complex is a reminder that progress takes patience. The same place where our Managing Director once worked earlier in his career later became part of the Design World journey.</p>
            <Link className="btn btn-green" to="/work">See our work</Link>
          </div>
        </div>
      </section>
    </>
  );
}