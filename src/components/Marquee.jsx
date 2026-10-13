import SafeImg from './SafeImg.jsx';
import { CLIENT_LOGOS } from '../data/assets.js';

export default function Marquee() {
  const rev = [...CLIENT_LOGOS].reverse();
  const row = (list, hidden) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {list.map((p) => (
        <li key={p} className="logo-tile"><SafeImg path={p} alt="" label="Client logo" /></li>
      ))}
    </ul>
  );
  return (
    <div className="marquee marquee-2" role="group" aria-label="Our clients">
      <div className="marquee-track to-right">{row(CLIENT_LOGOS)}{row(CLIENT_LOGOS, true)}</div>
      <div className="marquee-track">{row(rev)}{row(rev, true)}</div>
    </div>
  );
}