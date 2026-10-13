// Every image is read from the live site by default. Run `npm run assets` to download
// them into /public, then set VITE_ASSET_BASE= (empty) so they are served from your own host.
const BASE = (import.meta.env?.VITE_ASSET_BASE ?? 'https://designworldsalem.com').replace(/\/$/, '');
export const asset = (p) => `${BASE}/${p}`;

export const LOGO = '_astro/favicon.D7J2WjGa.ico';
export const FOUNDER = 'founder.webp';
export const CLIENT_LOGOS = Array.from({ length: 19 }, (_, i) => `clients/${i + 1}.webp`);
// Order matches the original gallery page
export const DESIGN_IDS = [17,18,26,27,31,34,40,41,47,1,2,5,6,7,8,9,10,19,21,22,23,29,30,37,38,43,44,53,54,55,56,3,4,11,12,13,14,15,16,20,24,25,28,32,33,35,36,39,42,45,46,48,49,50,51,52];
export const SERVICE_IMAGES = ['books-and-magazines','business-cards','certificates','diaries-and-calendars','foil-prints','id-cards','in-shop-branding','letterheads','newsletters','product-catalogues','screen-prints','stationery-printing','stickers','sunpack-sheet','vinyl-and-flex','wedding-invitations'];
export const PROCESS_IMAGES = ['welcome','discussion','qa','designing','proofing','production','packing','delivery'];
export const BLOG_IMAGES = ['logo-design','business-card','flyers-vs-brochures','needs-for-printing','professional-printing-strengths'];
export const OG_IMAGES = ['index','about','services','gallery','blogs','contact'];

export const ALL_ASSET_PATHS = [
  LOGO, FOUNDER, ...CLIENT_LOGOS,
  ...DESIGN_IDS.map((i) => `designs/${i}.webp`),
  ...SERVICE_IMAGES.map((s) => `services/${s}.webp`),
  ...PROCESS_IMAGES.map((s) => `workflow/s-process-${s}.webp`),
  ...BLOG_IMAGES.map((s) => `blogs/cards/blogs-${s}.webp`),
  ...OG_IMAGES.map((s) => `og/${s}.png`),
];
