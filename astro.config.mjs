// @ts-check
import { defineConfig } from 'astro/config';

const validDomains = new Set(['paperclipai.cn', 'penclip.ing']);
const configuredDomain = validDomains.has(process.env.PUBLIC_DOMAIN ?? '')
  ? process.env.PUBLIC_DOMAIN
  : 'penclip.ing';

// https://astro.build/config
export default defineConfig({
  site: `https://${configuredDomain}`,
  server: {
    host: true,
    port: 4321,
    strictPort: true
  }
});
