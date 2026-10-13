import { useState } from 'react';
import { asset } from '../data/assets.js';

/** Lazy image with a clearly labelled placeholder when there is no path or the file fails to load. */
export default function SafeImg({ path, alt = '', label = 'Image to be added', className = '', ...rest }) {
  const [bad, setBad] = useState(false);
  if (!path || bad) {
    return (
      <div className={`ph ${className}`} role="img" aria-label={alt || label}>
        <span>{label}</span>
      </div>
    );
  }
  return <img className={className} src={path.startsWith('/') ? encodeURI(path) : asset(path)} alt={alt} loading="lazy" decoding="async" onError={() => setBad(true)} {...rest} />;
}
