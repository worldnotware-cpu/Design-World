import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import LocationPin from '../components/LocationPin.jsx';
import { SITE } from '../data/content.js';
import { SERVICES, bySlug } from '../data/services.js';

// Form backend: set VITE_WEB3FORMS_KEY (Web3Forms) or VITE_FORM_ENDPOINT (e.g. Formspree). See README.
const KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const ease = [0.2, 0.8, 0.2, 1];
const list = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || (KEY ? 'https://api.web3forms.com/submit' : '');

export default function Contact() {
  const [params] = useSearchParams();
  const q = params.get('service') || '';
  const preset = bySlug(q)?.title || q;
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | unconfigured

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // honeypot
    if (!ENDPOINT) {
      console.warn('Contact form is not connected. Set VITE_WEB3FORMS_KEY or VITE_FORM_ENDPOINT.');
      setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    try {
      const body = { ...data, subject: `New enquiry from ${data.name}: ${data.service}` };
      if (KEY) body.access_key = KEY;
      const res = await fetch(ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success !== false && json.ok !== false) { setStatus('success'); form.reset(); } else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  const fallback = (
    <>Please call <a href={`tel:${SITE.phones[0].tel}`}>{SITE.phones[0].label}</a>, message us on <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</>
  );

  return (
    <>
      <Seo title="Contact Design World" path="/contact" og="contact"
        description="Get in touch with Design World for professional design, printing, branding, and creative services." />
      <PageHero title="Let&rsquo;s talk about your project" corner={<LocationPin href={SITE.mapsLink} />}>
        <p>Tell us what you need and our team will get back to you with the right options and a quote.</p>
      </PageHero>

      <section className="sec light" aria-label="Contact details and form">
        <div className="wrap contact-grid">
          <motion.form className="form" onSubmit={onSubmit} noValidate={false} variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <motion.div className="field" variants={item}><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" required /></motion.div>
            <motion.div className="row2" variants={item}>
              <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+\-\s()]{7,18}" title="Enter a valid phone number" required /></div>
              <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
            </motion.div>
            <motion.div className="field" variants={item}>
              <label htmlFor="service">Service required</label>
              <select id="service" name="service" required defaultValue={preset || ''}>
                <option value="" disabled>Choose a service</option>
                {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
                {preset && !SERVICES.some((s) => s.title === preset) && <option>{preset}</option>}
                <option>Other</option>
              </select>
            </motion.div>
            <motion.div className="field" variants={item}><label htmlFor="message">Project description</label><textarea id="message" name="message" rows="5" required /></motion.div>
            <input className="hp" name="botcheck" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <motion.div variants={item}>
              <motion.button className="btn btn-black send-btn" type="submit" disabled={status === 'sending'} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <span>{status === 'sending' ? 'Sending\u2026' : 'Send message'}</span>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M3 11.5L21 3l-6.5 18-3-7.5L3 11.5z" fill="currentColor" /></svg>
              </motion.button>
            </motion.div>
            <div className="status" role="status" aria-live="polite">
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.p key="ok" className="ok" initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
                    <motion.svg viewBox="0 0 24 24" width="22" height="22" className="tick" aria-hidden="true">
                      <motion.path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.15 }} />
                    </motion.svg>
                    Thank you. Your message has been sent and we will contact you soon.
                  </motion.p>
                )}
                {status === 'error' && <motion.p key="bad" className="bad" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}>Your message could not be sent. {fallback}</motion.p>}
                {status === 'unconfigured' && <motion.p key="un" className="bad" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}>The online form is not connected yet, so nothing was sent. {fallback}</motion.p>}
              </AnimatePresence>
            </div>
          </motion.form>

          <motion.aside className="info" aria-label="Company contact details" variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <motion.h2 variants={item} className="info-h">
              <motion.svg className="info-pin" viewBox="0 0 48 64" width="26" height="34" aria-hidden="true" animate={{ y: [0, -6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
                <path d="M24 2C12 2 3 11 3 23c0 16 21 38 21 38s21-22 21-38C45 11 36 2 24 2z" fill="currentColor" />
                <circle cx="24" cy="22" r="8" fill="#0a2a24" />
              </motion.svg>
              Visit or call us
            </motion.h2>
            <dl>
              <motion.div variants={item}><dt>Address</dt><dd><a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">{SITE.address}</a></dd></motion.div>
              <motion.div variants={item}><dt>Phone</dt><dd>{SITE.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`}>{p.label}</a>)}</dd></motion.div>
              <motion.div variants={item}><dt>Email</dt><dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd></motion.div>
              <motion.div variants={item}><dt>WhatsApp</dt><dd><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">Chat with us</a></dd></motion.div>
              <motion.div variants={item}><dt>Instagram</dt><dd><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">@designworldsalem</a></dd></motion.div>
            </dl>
          </motion.aside>
        </div>

        <motion.div className="wrap map" initial={{ opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0 round 22px)' }}
          whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0 round 22px)' }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1, ease }}>
          <iframe title="Design World on Google Maps" src={SITE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </motion.div>
      </section>
    </>
  );
}