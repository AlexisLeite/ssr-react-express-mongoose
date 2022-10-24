const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['client/index.tsx'],
    outfile: 'build/client/index.js',
    bundle: true,
    plugins: [],
    external: ['*.woff', '*.woff2'],
    watch: true,
  })
  .then(() => console.log('⚡ Client build complete! ⚡'))
  .catch((e) => {
    console.log('Client error');
    console.error(e);
    process.exit(1);
  });

esbuild
  .build({
    entryPoints: ['server/index.ts'],
    outfile: 'build/server/index.js',
    bundle: true,
    platform: 'node',
    external: ['*.woff', '*.woff2'],
    watch: true,
  })
  .then(() => console.log('⚡ Server build complete! ⚡'))
  .catch((e) => {
    console.log('Server error');
    console.error(e);
    process.exit(1);
  });
