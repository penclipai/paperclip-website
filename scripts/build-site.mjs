import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const VALID_DOMAINS = new Set(['paperclipai.cn', 'penclip.ing']);

function resolveDomain(input) {
  return VALID_DOMAINS.has(input) ? input : 'penclip.ing';
}

export function buildSite(domain) {
  const targetDomain = resolveDomain(domain);
  const command =
    process.platform === 'win32'
      ? { file: 'cmd.exe', args: ['/c', 'npx astro build'] }
      : { file: 'npx', args: ['astro', 'build'] };
  const result = spawnSync(
    command.file,
    command.args,
    {
      stdio: 'inherit',
      cwd: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
      env: {
        ...process.env,
        PUBLIC_DOMAIN: targetDomain
      }
    }
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return targetDomain;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
const currentPath = fileURLToPath(import.meta.url);

if (invokedPath === currentPath) {
  buildSite(process.argv[2]);
}
