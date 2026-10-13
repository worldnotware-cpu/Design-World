import { motion } from 'framer-motion';

const ease = [0.2, 0.8, 0.2, 1];

export default function Reveal({ children, delay = 0, y = 36, className = '', as = 'div' }) {
  const M = motion[as];
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.8, delay, ease }}>
      {children}
    </M>
  );
}

/** Word-by-word masked heading reveal. */
export function Words({ text, className = '' }) {
  return (
    <motion.span className={className} aria-label={text} initial="h" whileInView="s"
      viewport={{ once: true, margin: '-40px' }} transition={{ staggerChildren: 0.06 }}>
      {text.split(' ').map((w, i) => (
        <span className="w-mask" key={i} aria-hidden="true">
          <motion.span className="w-in" variants={{ h: { y: '115%' }, s: { y: 0, transition: { duration: 0.7, ease } } }}>{w}&nbsp;</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Centered section heading: eyebrow, animated title, optional paragraph. */
export function SecHead({ eyebrow, title, id, children }) {
  return (
    <div className="sec-head">
      {eyebrow && <Reveal as="span" y={14} className="eyebrow">{eyebrow}</Reveal>}
      <h2 id={id}><Words text={title} /></h2>
      {children && <Reveal delay={0.15} y={20}>{children}</Reveal>}
    </div>
  );
}
