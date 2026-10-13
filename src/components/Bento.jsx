import { motion } from 'framer-motion';
import SafeImg from './SafeImg.jsx';

/** Three images: one large, two stacked. `flip` mirrors the layout. */
export default function Bento({ items, onOpen, flip = false }) {
  return (
    <div className={`bento ${flip ? 'flip' : ''}`}>
      {items.map((g, i) => (
        <motion.button key={g.id} className={`bento-i b${i}`} onClick={() => onOpen(i)} aria-label={`Enlarge: ${g.alt}`}
          initial={{ opacity: 0, clipPath: 'inset(14% 14% 14% 14% round 26px)', scale: 0.95 }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 26px)', scale: 1 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay: i * 0.13, ease: [0.2, 0.8, 0.2, 1] }}>
          <SafeImg path={g.path} alt="" label={g.alt} />
        </motion.button>
      ))}
    </div>
  );
}
