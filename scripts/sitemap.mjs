// Runs automatically before `npm run build`: writes public/sitemap.xml and public/robots.txt
import { writeFileSync } from 'node:fs';
import { SERVICES } from '../src/data/services.js';
import { BLOGS } from '../src/data/blogs.js';

const base = (process.env.VITE_SITE_URL || 'https://designworldsalem.com').replace(/\/$/, '');
const paths = ['/', '/about', '/work', '/services', '/blogs', '/contact',
  ...SERVICES.map((s) => `/services/${s.slug}`), ...BLOGS.map((b) => `/blogs/${b.slug}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync('public/sitemap.xml', xml);
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
console.log(`sitemap.xml: ${paths.length} URLs`);
