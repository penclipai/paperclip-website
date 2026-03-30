import { build } from 'astro';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const VALID_DOMAINS = new Set(['paperclipai.cn', 'penclip.ing']);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function resolveDomain(input) {
  return VALID_DOMAINS.has(input) ? input : 'penclip.ing';
}

export async function buildSite(domain) {
  const targetDomain = resolveDomain(domain);
  const previousDomain = process.env.PUBLIC_DOMAIN;

  process.env.PUBLIC_DOMAIN = targetDomain;

  try {
    await build({
      root: projectRoot
    });
  } finally {
    if (previousDomain === undefined) {
      delete process.env.PUBLIC_DOMAIN;
    } else {
      process.env.PUBLIC_DOMAIN = previousDomain;
    }
  }

  return targetDomain;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
const currentPath = fileURLToPath(import.meta.url);

if (invokedPath === currentPath) {
  try {
    await buildSite(process.argv[2]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
