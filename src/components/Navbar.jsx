import { useEffect, useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV, SITE } from '../data/content.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <header className={`nav ${solid || open ? 'solid' : ''}`}>
      <Link to="/" className="corner-logo" aria-label="Design World, home"><img src="/logo-icon.png" alt="" /><span>Design World</span></Link>
<div className="wrap nav-in">
        <nav className="nav-links" aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}>{n.label}</NavLink>
          ))}
        </nav>
        <a className="btn btn-green nav-cta" href={`tel:${SITE.phones[0].tel}`}>Call us</a>
        <button
          className="burger" aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu" className="mobile" aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}
          >
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'}>{n.label}</NavLink>
            ))}
            <a className="btn btn-green" href={`tel:${SITE.phones[0].tel}`}>Call {SITE.phones[0].label}</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
