import { SITE } from '../data/content.js';

/** React 19 hoists <title>, <meta> and <link> rendered anywhere into <head>. */
export default function Seo({ title, description = SITE.description, path = '/', og = 'index', type = 'website' }) {
  const url = `${SITE.url}${path}`;
  const image = `${SITE.url}/og/${og}.png`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
