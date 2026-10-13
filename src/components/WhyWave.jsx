import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * "Why choose us" cards with a wave animation.
 *  1. On scroll the cards fly up one after another (left -> right) with a spring.
 *  2. They settle into a wave shape (up / down / up / down ...).
 *  3. After that each card keeps floating, phase-shifted, so the wave keeps travelling.
 *  4. Hovering a card lifts it and its neighbours (a ripple), and a light follows the mouse.
 *  5. A wavy gold line is drawn behind the cards while you scroll.
 */
export default function WhyWave({ items }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px' });
  const [settled, setSettled] = useState(false);   // true after the entrance finished
  const [hover, setHover] = useState(-1);
  const [amp, setAmp] = useState(26);              // wave height, smaller on small screens

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1001px)');
    const set = () => setAmp(mq.matches ? 26 : 0);  // 2 / 1 column layouts have no wave offset
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setSettled(true), 1700);
    return () => clearTimeout(t);
  }, [inView]);

  // scroll-linked wavy line
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 85%', 'center 45%'] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const restY = (i) => Math.sin((i * Math.PI) / 2) * -amp;   // 0, -26, 0, +26, 0
  const ripple = (i) => (hover < 0 ? 0 : -22 * Math.max(0, 1 - Math.abs(i - hover) * 0.55));

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div className="why-wave" ref={sectionRef}>
      <svg className="why-line" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
        <motion.path d="M0 60 C 90 -10, 160 -10, 250 60 S 410 130, 500 60 S 660 -10, 750 60 S 910 130, 1000 60"
          fill="none" stroke="url(#whyGrad)" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: reduce ? 1 : draw }} />
        <defs>
          <linearGradient id="whyGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#d9b873" stopOpacity="0" />
            <stop offset=".5" stopColor="#d9b873" />
            <stop offset="1" stopColor="#1fcf68" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <ul className="why-grid">
        {items.map(([title, text], i) => (
          <motion.li
            key={title}
            className="why-card"
            initial={reduce ? false : { opacity: 0, y: 150, scale: 0.7, rotate: i % 2 ? 8 : -8 }}
            animate={inView || reduce
              ? { opacity: 1, y: restY(i) + ripple(i), scale: hover === i ? 1.04 : 1, rotate: 0 }
              : undefined}
            transition={settled
              ? { type: 'spring', stiffness: 260, damping: 18 }
              : { type: 'spring', stiffness: 90, damping: 11, mass: 0.9, delay: i * 0.14 }}
            onHoverStart={() => setHover(i)}
            onHoverEnd={() => setHover(-1)}
            onMouseMove={onMove}
          >
            {/* inner layer keeps bobbing so the wave travels across the cards */}
            <motion.div
              className="why-inner"
              animate={settled && !reduce ? { y: [0, -9, 0, 9, 0] } : { y: 0 }}
              transition={settled && !reduce ? { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 } : { duration: 0.3 }}
            >
              <motion.span className="num" initial={{ scale: 0 }} animate={inView ? { scale: 1 } : undefined}
                transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.5 + i * 0.14 }}>
                0{i + 1}
              </motion.span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="why-bar" aria-hidden="true" />
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}