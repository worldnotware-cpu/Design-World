import { motion, useReducedMotion } from 'framer-motion';

/**
 * Animated location pin for the top-right corner of the hero.
 * Pin drops in, then bobs; pulsing rings spread from its tip; a "Find us" label slides out on hover.
 * Clicking opens Google Maps.
 */
export default function LocationPin({ href, label = 'Find us on the map' }) {
  const reduce = useReducedMotion();
  return (
    <motion.a className="loc-pin" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      initial={reduce ? false : { opacity: 0, y: -80, scale: 0.4 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 9, delay: 0.7 }} whileHover="hover" whileTap={{ scale: 0.92 }}>
      <motion.span className="loc-text" variants={{ hover: { opacity: 1, x: 0, scale: 1 } }}
        initial={{ opacity: 0, x: 18, scale: 0.9 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        Find us
      </motion.span>

      <span className="loc-art" aria-hidden="true">
        <span className="loc-ring" /><span className="loc-ring r2" /><span className="loc-ring r3" />
        <span className="loc-shadow" />
        <motion.svg viewBox="0 0 48 64" width="46" height="62"
          animate={reduce ? undefined : { y: [0, -9, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          variants={{ hover: { scale: 1.15, rotate: [0, -8, 8, 0] } }}>
          <defs>
            <linearGradient id="pinG" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#f0d58f" /><stop offset="1" stopColor="#d9b873" /></linearGradient>
          </defs>
          <path d="M24 2C12 2 3 11 3 23c0 16 21 38 21 38s21-22 21-38C45 11 36 2 24 2z" fill="url(#pinG)" stroke="#1a1405" strokeOpacity=".25" strokeWidth="1.5" />
          <circle cx="24" cy="22" r="8.5" fill="#0a2a24" />
          <circle cx="24" cy="22" r="3.6" fill="#1fcf68" />
        </motion.svg>
      </span>
    </motion.a>
  );
}