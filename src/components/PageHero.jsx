import { Words } from './Reveal.jsx';

export default function PageHero({ title, children, corner }) {
  return (
    <section className="sec dark page-hero">
      <div className="glow" aria-hidden="true" />
      {corner}
      <div className="wrap">
        <h1><Words text={title} /></h1>
        {children && <div className="lede">{children}</div>}
      </div>
    </section>
  );
}