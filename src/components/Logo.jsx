import { Link } from 'react-router-dom';
import { asset, LOGO } from '../data/assets.js';

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Design World, home">
      <img src={asset(LOGO)} width="34" height="34" alt="" />
      <span>Design World</span>
    </Link>
  );
}
