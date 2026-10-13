import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SafeImg from './SafeImg.jsx';

export default function Lightbox({ items, index, onClose, onIndex }) {
  const closeRef = useRef(null);
  const n = items.length;

  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; prev?.focus?.(); };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onIndex((index - 1 + n) % n);
      if (e.key === 'ArrowRight') onIndex((index + 1) % n);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, n, onClose, onIndex]);

  const item = items[index];
  const go = (d) => (e) => { e.stopPropagation(); onIndex((index + d + n) % n); };

  return (
    <motion.div className="lb" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }}>
      <button ref={closeRef} className="lb-btn lb-x" onClick={onClose} aria-label="Close viewer">&times;</button>
      <button className="lb-btn lb-prev" onClick={go(-1)} aria-label="Previous image">&lsaquo;</button>
      <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
        <SafeImg key={item.id} path={item.path} alt={item.alt} loading="eager" />
        <figcaption>{index + 1} of {n}</figcaption>
      </figure>
      <button className="lb-btn lb-next" onClick={go(1)} aria-label="Next image">&rsaquo;</button>
    </motion.div>
  );
}
