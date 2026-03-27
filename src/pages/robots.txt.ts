import { CURRENT_SITE, getAbsoluteUrl } from '../config/site';

export const prerender = true;

export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Host: ${CURRENT_SITE.domain}`,
    `Sitemap: ${getAbsoluteUrl('/sitemap.xml')}`
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
