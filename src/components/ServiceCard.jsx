import { Link } from 'react-router-dom';
import SafeImg from './SafeImg.jsx';
import { photosFor, COVER } from '../data/portfolio.js';

export default function ServiceCard({ service, title }) {
  const local = photosFor(service.slug)[0]?.path || COVER[service.slug];
  const first = service.imgs[0];
  const name = title || service.title;
  return (
    <Link to={`/services/${service.slug}`} className="card">
      <div className="thumb">
        <SafeImg path={local || (first && `services/${first}.webp`)} alt="" label="Sample image to be added" />
      </div>
      <div className="card-body">
        <h3>{name}</h3>
        <p>{service.short}</p>
        <span className="more">View {name}</span>
      </div>
    </Link>
  );
}
