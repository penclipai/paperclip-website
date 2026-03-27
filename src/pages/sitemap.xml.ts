import { getAbsoluteUrl, getAlternateLinks } from '../config/site';

export const prerender = true;

export function GET() {
  const homeUrl = getAbsoluteUrl('/');
  const alternates = getAlternateLinks('/');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${homeUrl}</loc>
    ${alternates
      .map(
        (link) =>
          `<xhtml:link rel="alternate" hreflang="${link.hreflang}" href="${link.href}" />`
      )
      .join('\n    ')}
  </url>
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
