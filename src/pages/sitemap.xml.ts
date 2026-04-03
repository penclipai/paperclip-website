import { BRAND } from '../config/brand';
import { CURRENT_SITE, getAbsoluteUrl, getAlternateLinks } from '../config/site';
import { getChineseSeoAlternateLinks, SEO_GUIDES } from '../config/seo';

export const prerender = true;

export function GET() {
  const lastmod = new Date().toISOString();
  const urls =
    CURRENT_SITE.domain === BRAND.chineseDomain
      ? ['/', ...SEO_GUIDES.map((guide) => guide.href)]
      : ['/'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls
    .map((pathname) => {
      const alternates = SEO_GUIDES.some((guide) => guide.href === pathname)
        ? getChineseSeoAlternateLinks(pathname)
        : getAlternateLinks(pathname);
      return `<url>
    <loc>${getAbsoluteUrl(pathname)}</loc>
    <lastmod>${lastmod}</lastmod>
    ${alternates
      .map(
        (link) =>
          `<xhtml:link rel="alternate" hreflang="${link.hreflang}" href="${link.href}" />`
      )
      .join('\n    ')}
  </url>`;
    })
    .join('\n  ')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
