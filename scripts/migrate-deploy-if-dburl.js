const { spawnSync } = require('node:child_process');

if (!process.env.DATABASE_URL) {
  console.log('[postbuild] DATABASE_URL is not set. Skipping prisma migrate deploy.');
  process.exit(0);
}

console.log('[postbuild] DATABASE_URL detected. Running prisma migrate deploy...');
const result = spawnSync('npx', ['prisma', 'migrate', 'deploy'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.error) {
  console.error('[postbuild] Failed to execute prisma migrate deploy:', result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
