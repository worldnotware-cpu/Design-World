import { useState } from 'react';
import { TESTIMONIALS } from '../data/content.js';

export default function Testimonials({ initial = 6 }) {
  const [all, setAll] = useState(false);
  const list = all ? TESTIMONIALS : TESTIMONIALS.slice(0, initial);
  return (
    <>
      <ul className="quotes">
        {list.map(([text, name, place, stars]) => (
          <li key={name + text} className="quote">
            <p className="stars" role="img" aria-label={`${stars} out of 5 stars`}>{'\u2605'.repeat(stars)}<span>{'\u2605'.repeat(5 - stars)}</span></p>
            <blockquote>{text}</blockquote>
            <p className="who">{name}, {place}</p>
          </li>
        ))}
      </ul>
      {TESTIMONIALS.length > initial && (
        <p className="center">
          <button className="btn btn-line" onClick={() => setAll((a) => !a)} aria-expanded={all}>
            {all ? 'Show fewer reviews' : `Show all ${TESTIMONIALS.length} reviews`}
          </button>
        </p>
      )}
    </>
  );
}
