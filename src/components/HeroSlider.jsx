import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SafeImg from './SafeImg.jsx';
import { PORTFOLIO } from '../data/portfolio.js';

const SLIDES = PORTFOLIO.map((c) => ({ id: c.id, path: c.items[0].path, label: c.tag }));
const POS = [
  { x: '0%', y: 0, scale: 1, rotate: 0, opacity: 1 },
  { x: '9%', y: 14, scale: 0.93, rotate: 4, opacity: 0.9 },
  { x: '17%', y: 28, scale: 0.86, rotate: 8, opacity: 0.6 },
];
const GONE = { x: '-115%', y: -20, scale: 0.9, rotate: -14, opacity: 0 };
const BACK = { x: '22%', y: 40, scale: 0.8, rotate: 10, opacity: 0 };

/** Cards move one by one automatically; pauses on hover; dots jump to a slide. */
export default function HeroSlider() {
  const n = SLIDES.length;
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (hold) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 1000);
    return () => clearInterval(t);
  }, [hold, n]);

  return (
    <div className="slider" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} role="group" aria-label="Featured work">
      <div className="slider-stack">
        {SLIDES.map((s, idx) => {
          const off = (idx - i + n) % n;
          const to = off < 3 ? POS[off] : off === n - 1 ? GONE : BACK;
          return (
            <motion.figure key={s.id} className="slide" style={{ zIndex: off === n - 1 ? 5 : 4 - off }} initial={false}
              animate={to} transition={{ duration: 0.6, ease: [0.22, 0.9, 0.25, 1] }}>
              <SafeImg path={s.path} alt={off === 0 ? `${s.label} sample` : ''} label={s.label} loading="eager" />
              <figcaption>{s.label}</figcaption>
            </motion.figure>
          );
        })}
      </div>
      <div className="dots">
        {SLIDES.map((s, k) => (
          <button key={s.id} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Show ${s.label}`} aria-current={k === i} />
        ))}
      </div>
      <span className="count">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
    </div>
  );
}
