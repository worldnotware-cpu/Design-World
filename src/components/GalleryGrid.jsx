import SafeImg from './SafeImg.jsx';

export default function GalleryGrid({ items, onOpen }) {
  return (
    <ul className="masonry">
      {items.map((g, i) => (
        <li key={g.id}>
          <button className="tile crop" onClick={() => onOpen(i)} aria-label={`Enlarge: ${g.alt}`}>
            <SafeImg path={g.path} alt="" label={g.alt} />
          </button>
        </li>
      ))}
    </ul>
  );
}
