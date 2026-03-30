import { cpSync, existsSync, mkdirSync, renameSync, rmSync, symlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSite } from './build-site.mjs';

const SITE_TARGETS = {
  'paperclipai.cn': 'cn',
  'penclip.ing': 'intl'
};

function releaseId() {
  if (process.env.PENCLIP_RELEASE_ID) {
    return process.env.PENCLIP_RELEASE_ID;
  }

  return new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function syncRelease(domain) {
  const target = SITE_TARGETS[domain];
  if (!target) {
    throw new Error(`Unsupported domain: ${domain}`);
  }

  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const distDir = path.join(repoRoot, 'dist');
  const releaseRoot = '/var/www/penclip-website/releases';
  const currentLink = `/var/www/penclip-website/current-${target}`;
  const currentReleaseId = releaseId();
  const releaseDir = path.join(releaseRoot, currentReleaseId, target);
  const tempLink = `${currentLink}.next`;

  if (!existsSync(distDir)) {
    throw new Error('dist/ not found after build');
  }

  ensureDir(path.dirname(releaseDir));
  rmSync(releaseDir, { recursive: true, force: true });
  cpSync(distDir, releaseDir, { recursive: true });

  rmSync(tempLink, { recursive: true, force: true });
  symlinkSync(releaseDir, tempLink, 'dir');
  renameSync(tempLink, currentLink);

  return {
    currentLink,
    domain,
    releaseDir
  };
}

const domain = await buildSite(process.argv[2]);
const result = syncRelease(domain);

process.stdout.write(
  `Deployed ${result.domain} to ${result.releaseDir} and updated ${result.currentLink}\n`
);
