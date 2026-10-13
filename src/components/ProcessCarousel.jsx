import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import SafeImg from './SafeImg.jsx';

const ease = [0.2, 0.8, 0.2, 1];
const AUTOPLAY_MS = 3800;

/**
 * 3D "coverflow" carousel for the 8 process steps.
 * - cards fan out of one stack when scrolled into view
 * - centre card is large, side cards rotate in 3D, shrink and fade
 * - autoplay (pauses on hover / touch / keyboard focus) with a progress ring
 * - drag / swipe, arrow buttons, dots, keyboard arrows, click a side card to jump to it
 * steps = [[label, file], ...]   image = /assets/process/<file>.jpg
 */
export default function ProcessCarousel({ steps }) {
  const reduce = useReducedMotion();
  const n = steps.length;
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const inView = useInView(rootRef, { once: true, margin: '-15% 0px' });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const [cw, setCw] = useState(320);        // card width, measured from the stage
  const [intro, setIntro] = useState(true);  // true while the cards are fanning out the first time

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setCw(Math.max(220, Math.min(340, el.clientWidth * 0.62)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = useCallback((to, d) => {
    setDir(d ?? (to > active ? 1 : -1));
    setActive(((to % n) + n) % n);
  }, [active, n]);
  const next = useCallback(() => go(active + 1, 1), [active, go]);
  const prev = useCallback(() => go(active - 1, -1), [active, go]);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setIntro(false), 1600);
    return () => clearTimeout(t);
  }, [inView]);

  // autoplay
  useEffect(() => {
    if (!inView || paused || reduce) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [inView, paused, reduce, next, active]);

  // shortest circular distance from the active card: -n/2 ... +n/2
  const offsetOf = (i) => {
    let o = i - active;
    if (o > n / 2) o -= n;
    if (o < -n / 2) o += n;
    return o;
  };

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const step = cw * 0.64;   // horizontal gap between cards

  return (
    <div className="pc" ref={rootRef} role="region" aria-roledescription="carousel" aria-label="Our process"
      tabIndex={0} onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)} onTouchEnd={() => setTimeout(() => setPaused(false), 2500)}>

      {/* soft glow that changes with the active step */}
      <motion.div className="pc-glow" aria-hidden="true" animate={{ rotate: active * 45, scale: [1, 1.12, 1] }}
        transition={{ rotate: { duration: 1.2, ease }, scale: { duration: 4, repeat: Infinity } }} />

      <motion.div className="pc-stage" ref={stageRef} style={{ height: cw * 1.12 + 40 }}
        drag={reduce ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.18}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60 || info.velocity.x < -450) next();
          else if (info.offset.x > 60 || info.velocity.x > 450) prev();
        }}>
        {steps.map(([label, file], i) => {
          const o = offsetOf(i);
          const a = Math.abs(o);
          const visible = a <= 2;
          const isActive = o === 0;
          // before it scrolls into view every card sits stacked in the middle
          const state = !inView
            ? { x: 0, scale: 0.5, rotateY: 0, opacity: 0, filter: 'blur(8px)' }
            : {
                x: o * step,
                scale: isActive ? 1 : Math.max(0.6, 0.86 - (a - 1) * 0.12),
                rotateY: Math.max(-48, Math.min(48, -o * 34)),
                opacity: visible ? (isActive ? 1 : 0.7 - (a - 1) * 0.35) : 0,
                filter: isActive ? 'blur(0px)' : `blur(${Math.min(a, 3) * 1.4}px)`,
              };
          return (
            <motion.figure
              key={file}
              className={`pc-card${isActive ? ' is-active' : ''}`}
              style={{ width: cw, height: cw * 1.12, zIndex: 20 - Math.round(a * 2), pointerEvents: visible ? 'auto' : 'none' }}
              initial={false}
              animate={state}
              transition={{ type: 'spring', stiffness: 130, damping: 20, mass: 0.9, delay: intro && !reduce ? a * 0.12 : 0 }}
              onClick={() => !isActive && go(i)}
              aria-hidden={!isActive}
              aria-label={`${i + 1} of ${n}: ${label}`}
            >
              <motion.div className="pc-img" animate={isActive && !reduce ? { scale: [1, 1.08] } : { scale: 1 }}
                transition={isActive ? { duration: AUTOPLAY_MS / 1000 + 1, ease: 'linear' } : { duration: 0.6 }}
                key={isActive ? `a-${active}` : 'i'}>
                <SafeImg path={`/assets/process/${file}.jpg`} alt={isActive ? label : ''} label={label} draggable={false} />
              </motion.div>
              <span className="pc-shine" aria-hidden="true" />
              <motion.span className="pc-n" animate={isActive ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: -20 }}
                transition={{ type: 'spring', stiffness: 320, damping: 14 }}>{i + 1}</motion.span>
              <figcaption>{label}</figcaption>
            </motion.figure>
          );
        })}
      </motion.div>

      {/* big title of the active step */}
      <div className="pc-title" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h3 key={active}
            initial={{ opacity: 0, y: 26 * dir, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -26 * dir, filter: 'blur(6px)' }} transition={{ duration: 0.4, ease }}>
            <small>Step {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</small>
            {steps[active][0]}
          </motion.h3>
        </AnimatePresence>
      </div>

      {/* controls */}
      <div className="pc-ctrl">
        <button type="button" className="pc-btn" onClick={prev} aria-label="Previous step">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        <div className="pc-dots" role="tablist" aria-label="Choose step">
          {steps.map(([label], i) => (
            <button key={label} type="button" role="tab" aria-selected={i === active} aria-label={`Go to ${label}`}
              className={i === active ? 'on' : ''} onClick={() => go(i)}>
              {i === active && !paused && !reduce && inView && (
                <motion.span key={active} className="fill" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }} />
              )}
            </button>
          ))}
        </div>

        <button type="button" className="pc-btn" onClick={next} aria-label="Next step">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}