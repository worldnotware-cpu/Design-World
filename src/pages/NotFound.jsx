import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <section className="sec dark page-hero">
      <Seo title="Page not found | Design World" path="/404" />
      <meta name="robots" content="noindex" />
      <div className="wrap">
        <h1>We couldn&rsquo;t find that page.</h1>
        <div className="lede">
          <p>The link may be old or mistyped. Try one of these instead.</p>
          <div className="btn-row">
            <Link className="btn btn-green" to="/">Go home</Link>
            <Link className="btn btn-line" to="/services">View services</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
