// Local images in /public/assets, grouped by category. Add or remove files here and every section updates.
const mk = (folder, files, alt) => files.map((f, i) => ({ id: `${folder}-${i}`, path: `/assets/${folder}/${f}`, alt: `${alt} ${i + 1} by Design World` }));

export const PORTFOLIO = [
  { id: 'banners', title: 'Banners & Hoardings', tag: 'Banners', service: 'banners', blurb: 'Large-format flex and hoardings that read from across the road.', items: mk('banners', ['banner1.jpg', 'banner2.jpg', 'banner3.jpg'], 'Banner design') },
  { id: 'books', title: 'Books & Magazines', tag: 'Books', service: 'book-printing', blurb: 'Clean layouts, consistent colour and neat binding, page after page.', items: mk('book&mag', ['book1.jpg', 'book2.jpg', 'book3.jpg'], 'Book and magazine') },
  { id: 'brochures', title: 'Brochures', tag: 'Brochures', service: 'brochures', blurb: 'Bi-fold and tri-fold brochures that explain your business clearly.', items: mk('brochures', ['collage.jpg', 'desert.jpg', 'green2.jpg'], 'Brochure design') },
  { id: 'calendars', title: 'Calendars & Diaries', tag: 'Calendars', service: 'book-printing', blurb: 'Desk, daily and monthly calendars your customers keep all year.', items: mk('calendar', ['custom.jpg', 'daily.jpg', 'monthly.jpg'], 'Calendar design') },
  { id: 'certificates', title: 'Certificates', tag: 'Certificates', service: 'branding', blurb: 'Formal certificates with a premium look and sharp finishing.', items: mk('certificate', ['certificate1.jpg', 'certificate2.jpg', 'certificate3.jpg'], 'Certificate design') },
  { id: 'id-cards', title: 'ID Cards', tag: 'ID Cards', service: 'branding', blurb: 'Durable, neatly printed ID cards and lanyards for teams and schools.', items: mk('id cards', ['id1.jpg', 'id2.jpg', 'id3.jpg'], 'ID card design') },
  { id: 'packaging', title: 'Packaging Design', tag: 'Packaging', service: 'packaging', blurb: 'Boxes, pouches and labels that carry your brand onto the shelf.', items: mk('package', ['pack1.jpg', 'pack2.jpg', 'pack3.jpg'], 'Packaging design') },
  { id: 'posters', title: 'Posters', tag: 'Posters', service: 'posters', blurb: 'One clear message and a strong call to action, printed to stand out.', items: mk('poster', ['post1.jpg', 'post2.jpg', 'post3.jpg'], 'Poster design') },
  { id: 'catalogues', title: 'Product Catalogues', tag: 'Catalogues', service: 'brochures', blurb: 'Catalogues that show your range with a clear hierarchy.', items: mk('product cat', ['cat1.jpg', 'cat2.jpg', 'cat3.jpg'], 'Product catalogue') },
  { id: 'visiting-cards', title: 'Visiting Cards', tag: 'Visiting Cards', service: 'visiting-cards', blurb: 'Business cards on quality stock with matte, gloss or gold finishing.', items: mk('visiting', ['blue.jpg', 'gold.jpg', 'green.jpg'], 'Visiting card') },
  { id: 'wedding-cards', title: 'Wedding Cards', tag: 'Wedding Cards', service: 'wedding-cards', blurb: 'Invitations with beautiful paper, artwork and finishing.', items: mk('wedding', ['god.jpg', 'royalblue.jpg', 'sandal.jpg'], 'Wedding invitation') },
];

export const photosFor = (slug) => PORTFOLIO.filter((c) => c.service === slug).flatMap((c) => c.items);
// Services with no photo of their own borrow a related one (change freely).
export const COVER = { 'logo-design': '/assets/visiting/blue.jpg' };
