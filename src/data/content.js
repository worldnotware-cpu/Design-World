// All verified company facts come from https://designworldsalem.com (checked October 2026).
export const SITE = {
  name: 'Design World',
  url: import.meta.env?.VITE_SITE_URL || 'https://designworldsalem.com',
  tagline: 'Creative Design, Printing & Branding Solutions',
  description: 'Design World provides professional graphic design, printing, and branding solutions to help businesses build a strong and memorable brand in Salem and beyond.',
  footerBlurb: 'We create thoughtful digital experiences, memorable brands, and beautiful designs that help businesses stand out in a crowded world.',
  email: 'designworldsalem@gmail.com',
  phones: [
    { label: '+91 75503 11411', tel: '+917550311411' },
    { label: '+91 95668 89055', tel: '+919566889055' },
  ],
  address: 'Design World, Shree Lakshmi Complex, 296 & 33/4, Omalur, Swarnapuri, Salem, Tamil Nadu 636004',
  instagram: 'https://www.instagram.com/designworldsalem?igsi=NGV6NWt4ZTZhc25m',
  // TODO: not listed on the old site. Derived from the first phone number - confirm it is a WhatsApp number.
  whatsapp: 'https://wa.me/917550311411',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Design%20World%2C%20Shree%20Lakshmi%20Complex%2C%20296%20%26%2033%2F4%2C%20Omalur%2C%20Swarnapuri%2C%20Salem%2C%20Tamil%20Nadu%20636004',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.3047627464734!2d78.13642449999999!3d11.672800199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf06fe0985aef%3A0xf7d59ce2b211d5ab!2sDesign%20World-Salem!5e0!3m2!1sen!2sin!4v1788080946044!5m2!1sen!2sin',
  geo: { lat: 11.6728, lng: 78.1364 },
  founded: '8 September 2017',
  owner: { name: 'Nagaraj M.', role: 'Managing Director' },
};

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/contact', label: 'Contact Us' },
];

export const STATS = [
  { to: 9, suffix: '+', label: 'Years of experience' },
  { to: 25000, suffix: '+', label: 'Works completed' },
  { to: 500, suffix: '+', label: 'Happy clients' },
];

export const WHY = [
  ['Experience', '9+ years of industry knowledge.'],
  ['Quality', 'We never compromise on print quality.'],
  ['Creativity', 'Fresh ideas tailored to your brand.'],
  ['Reliability', 'On-time delivery every time.'],
  ['Customer focused', 'Your satisfaction is our priority.'],
];

// TODO (owner): Vision and Mission are NOT on the old site. These drafts are derived from its wording - edit or approve.
export const VISION = 'To be the design and printing partner that businesses in Salem and beyond trust to present themselves with confidence. We see a future where every business, big or small, can look professional, communicate clearly and stand out, with design and print quality that earns long-term trust.';
export const VISION_POINTS = ['A trusted creative partner for businesses across Salem and beyond', 'Design and print quality that builds confident, memorable brands', 'Long-term relationships built on honesty and reliability', 'Always growing with new ideas, materials and technology'];
export const MISSION = 'To turn every customer\u2019s idea into creative, practical and effective brand materials through thoughtful design, uncompromising print quality and on-time delivery. We listen first, guide you on the right paper, finish and size, and care for every detail from the first discussion to final delivery.';
export const MISSION_POINTS = ['Listen to your idea and understand your brand', 'Design thoughtfully, with fresh concepts tailored to you', 'Print with uncompromising quality and neat finishing', 'Deliver on time, with support at every step'];

export const FAQ = [
  ['What printing services do you offer?', 'We provide a wide range of printing solutions, including business cards, brochures, flyers, books, magazines, product catalogues, flex & vinyl, wedding invitations, certificates, ID cards, menu cards, stickers, die-cut prints, calendars, and more.'],
  ['Can you help with the design?', 'Yes. Our design team can create a professional, customized design based on your brand, requirements, and preferred style.'],
  ['What printing materials do you use?', 'We offer different paper types, thicknesses, finishes, vinyl materials, and specialty stocks depending on the product and desired result.'],
  ['Can I order customized sizes and designs?', 'Absolutely. We provide custom sizes, shapes, finishes, colours, and quantities to suit your specific requirements.'],
  ['What is the minimum quantity I can order?', 'Minimum quantities vary depending on the product. Contact our team with your requirements, and we\u2019ll recommend the most suitable option.'],
];

export const PROCESS = [
  ['Welcome', 'welcome'], ['Discussion & planning', 'discussion'], ['Quotation approval', 'qa'], ['Designing', 'designing'],
  ['Proofing', 'proofing'], ['Printing', 'production'], ['Packing', 'packing'], ['Delivery', 'delivery'],
];

// Real customer reviews copied from the live site (its duplicate list removed). [text, name, place, stars]
export const TESTIMONIALS = [
  ['Excellent printing quality and very professional finishing. Our business cards came out perfectly.', 'Arun Kumar', 'Salem', 5],
  ['Very good service from design to final printing. The team understood our requirements well.', 'Priya S.', 'Dharmapuri', 4],
  ['We ordered flyers for our business and were very happy with the print quality and timely delivery.', 'Karthik R.', 'Omalur', 5],
  ['Good quality brochures with excellent finishing. A reliable printing service for our business.', 'Suresh Kumar', 'Mettur', 4],
  ['Our wedding invitations looked beautiful. The printing and finishing were exactly what we wanted.', 'Vignesh & Deepa', 'Harur', 5],
  ['Professional service and good attention to detail. Highly satisfied with our catalogue printing.', 'Manoj P.', 'Pennagaram', 4],
  ['The business cards look premium and the print quality is excellent.', 'Ramesh K.', 'Attur', 5],
  ['We regularly order our business printing here. Consistent quality every time.', 'Dinesh M.', 'Sankari', 5],
  ['Great printing quality for our promotional flyers. The colours came out really well.', 'Naveen R.', 'Edappadi', 4],
  ['Very helpful team and smooth ordering process. Our brochures were delivered on time.', 'Mohanraj S.', 'Salem', 5],
  ['The menu cards were printed beautifully with a professional finish.', 'Kavitha R.', 'Dharmapuri', 4],
  ['Good quality stickers and excellent cutting. We were impressed with the final result.', 'Prakash V.', 'Omalur', 3],
  ['Our product catalogues look professional and represent our brand perfectly.', 'Saravanan P.', 'Mettur', 5],
  ['Excellent service for our bulk printing requirement. Everything was handled professionally.', 'Ravi Kumar', 'Salem', 4],
  ['The certificates were printed neatly with a premium look and excellent finishing.', 'Lakshmi S.', 'Dharmapuri', 5],
  ['Very satisfied with the quality of our flex and vinyl printing. Sharp and attractive output.', 'Bala Murugan', 'Harur', 4],
  ['They helped us with the design as well as printing. The complete process was hassle-free.', 'Sathish R.', 'Palacode', 5],
  ['Good customer service, quality materials and timely delivery. Definitely a dependable printing partner.', 'Gowtham K.', 'Karimangalam', 3],
  ['Our calendars were printed with excellent colour quality and finishing.', 'Vijay S.', 'Pennagaram', 5],
  ['Professional-looking ID cards with neat printing and finishing.', 'Anand Kumar', 'Salem', 4],
  ['The flyers and posters helped us present our business much more professionally.', 'Sivakumar R.', 'Attur', 5],
  ['Excellent quality and reasonable service for our regular printing requirements.', 'Deepak M.', 'Dharmapuri', 4],
  ['Our die-cut prints came out exactly as planned. Great attention to detail.', 'Hari Prasad', 'Omalur', 5],
  ['Fast response, good quality and professional finishing. Very happy with the overall experience.', 'Rajesh K.', 'Mettur', 5],
  ['A convenient local printing solution for our business. Quality has been consistently good.', 'Ajith Kumar', 'Salem', 4],
];
