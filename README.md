# Design World, Salem: React website

Redesign of https://designworldsalem.com built with **React 19, Vite, React Router, Framer Motion** and hand-written CSS.
Black / press-green / white theme, Bricolage Grotesque + Manrope (self-hosted via Fontsource, no Google Fonts request).

## Run it

```bash
npm install
cp .env.example .env     # then fill in the form key (see "Contact form")
npm run dev              # http://localhost:5173
npm run build            # production build in /dist (also regenerates sitemap.xml + robots.txt)
npm run preview          # test the production build locally
```
Requires Node 18+.

## Project structure

```
src/
  data/        content.js (company facts, FAQ, reviews, stats) · services.js · gallery.js · blogs.js · assets.js
  components/  Navbar, Footer, CtaBand, Marquee (client slider), Faq, Lightbox, GalleryGrid, Counter,
               ServiceCard, Testimonials, SafeImg (image + labelled placeholder), Seo, BlogBody, PageHero
  pages/       Home, About, Work, Services, ServiceDetail (/services/:slug), Blogs, BlogPost (/blogs/:slug), Contact, NotFound
scripts/       sitemap.mjs (runs before build) · download-assets.mjs
```
Routes: `/` `/about` `/work` `/services` `/services/:slug` `/blogs` `/blogs/:slug` `/contact`. The old `/gallery` URL redirects to `/work`.
**Almost all copy and images live in `src/data/`: edit there, not in the pages.**

## Contact form (required before launch)
The form never reports success unless a form service accepted it. Until one is connected it tells the visitor to call / WhatsApp / email.
1. **Web3Forms** (easiest): get a free access key at web3forms.com for designworldsalem@gmail.com, then set `VITE_WEB3FORMS_KEY=` in `.env`.
2. **or Formspree**: create a form, set `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx`.

On Netlify/Vercel, add the same variable in the dashboard (env vars are baked in at build time, so redeploy after changing).

## Images: moving off the old site
By default every image loads from `designworldsalem.com`, so the redesign works immediately. **Before you point your domain at the new site**
(which will take the old images away):
```bash
npm run assets           # downloads all ~150 images into /public, same paths
# in .env:  VITE_ASSET_BASE=      (empty)
npm run build
```

## Things you must review (placeholders and assumptions)
| Item | Where | What to do |
|---|---|---|
| Vision and Mission | `content.js` | Not on the old site. Drafted from its wording; edit or approve. |
| WhatsApp link | `content.js` (`whatsapp`) | Built from +91 75503 11411; confirm that number is on WhatsApp. |
| Logo | `assets.js` (`LOGO`) | Only the favicon was available. Drop a proper logo into `/public` and change the path. |
| Gallery categories | `gallery.js` (`TAGS`) | The 56 old gallery images have no categories. Add `17: 'banners'` etc. Until then they show under **All** only. Banners, Brochures, Wedding Cards, Visiting Cards and Packaging already have one photo each from the old Services page. |
| Posters, Logo Design, T-Shirt Design, Packaging photos | `services.js` | No matching photos on the old site; these show labelled placeholders. |
| Service-to-photo matching | `services.js` (`imgs`) | Matched by file name (e.g. Brochures uses the catalogue photo). Check each. |
| Service descriptions | `services.js` | Short draft copy based on the old site and blog; refine. |
| Blog dates and URLs | `blogs.js` | Not exposed on the old site. Add `date: '2026-01-15'` per post. Slugs are new; if old URLs matter, set 301 redirects. |
| Client logo alt text | `Marquee.jsx` | Client names are unknown, so alt text is "Client logo N". |
| "Hoarding" card | `Home.jsx` | Opens the Banners & Hoardings page. |
| Reviews | `content.js` | 25 real reviews from the old site, duplicates removed. |

## Deploy
Build output is static (`dist/`). It needs one rule: send every unknown path to `index.html` (already provided for each host).
- **Netlify**: build `npm run build`, publish `dist` (uses `public/_redirects`).
- **Vercel**: framework Vite (uses `vercel.json`).
- **Cloudflare Pages**: build `npm run build`, output `dist`. Add a `_redirects` rule as above (already in `public/`).
- **cPanel / Apache hosting**: run `npm run build`, upload the *contents* of `dist/` to `public_html` (includes `.htaccess`).

Set `VITE_SITE_URL` to your final domain so canonical URLs, OG tags and the sitemap are right.
After launch: submit `https://yourdomain/sitemap.xml` in Google Search Console and add the Google Business Profile link.

## SEO and accessibility notes
- Per-page `<title>`, description, canonical, Open Graph and LocalBusiness JSON-LD (Home).
- Client-rendered React: Google renders it, but other crawlers and link previews may not see page-specific tags.
  If link previews matter (WhatsApp/Facebook), add pre-rendering later (for example `vite-react-ssg`).
- Skip link, landmarks, visible focus, labelled form fields, keyboard-operable lightbox and accordion, `prefers-reduced-motion` respected.
- Images are lazy-loaded (hero eager) and already WebP.
