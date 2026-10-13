import { DESIGN_IDS } from './assets.js';
import { SERVICES, ALL_PRINTS } from './services.js';

export const CATEGORIES = [
  { id: 'banners', label: 'Banners', service: 'banners' },
  { id: 'brochures', label: 'Brochures', service: 'brochures' },
  { id: 'wedding-cards', label: 'Wedding Cards', service: 'wedding-cards' },
  { id: 'visiting-cards', label: 'Visiting Cards', service: 'visiting-cards' },
  { id: 'packaging', label: 'Packaging', service: 'packaging' },
  { id: 'posters', label: 'Posters', service: 'posters' },
  { id: 'logos', label: 'Logos', service: 'logo-design' },
  { id: 'tshirts', label: 'T-Shirt Designs', service: 't-shirt-design' },
];

// TODO (owner): the old gallery has 56 designs but no categories, so none are tagged yet.
// Tag a design by its number, e.g.  17: 'banners', 18: 'logos'.  Valid ids are the `id` values above.
export const TAGS = {};

const label = Object.fromEntries(ALL_PRINTS);
const designs = DESIGN_IDS.map((n) => ({
  id: `d${n}`, path: `designs/${n}.webp`, alt: `Design World work sample ${n}`, cat: TAGS[n] || null,
}));
// Service photos whose file name proves their category are included so those filters work out of the box.
const fromServices = SERVICES.filter((s) => s.cat).flatMap((s) =>
  s.imgs.map((img) => ({ id: `s-${img}`, path: `services/${img}.webp`, alt: `${label[img]} by Design World`, cat: s.cat })));

export const GALLERY = [...designs, ...fromServices];
export const FEATURED = designs.slice(0, 12);
