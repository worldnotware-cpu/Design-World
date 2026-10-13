import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { NAV, SITE } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-grid">
        <div>
          <Logo />
          <p className="foot-blurb">{SITE.footerBlurb}</p>
          <p className="foot-social">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </p>
        </div>
        <div>
          <h2 className="foot-h">Company</h2>
          <ul className="foot-list">
            {NAV.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="foot-h">Contact us</h2>
          <ul className="foot-list">
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            {SITE.phones.map((p) => <li key={p.tel}><a href={`tel:${p.tel}`}>{p.label}</a></li>)}
            <li><a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">{SITE.address}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-base">&copy; {new Date().getFullYear()} Design World. All rights reserved.</div>
    </footer>
  );
}
