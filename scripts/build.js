const esbuild = require('esbuild');
const { exec } = require('child_process');
const path = require('path');

exec(
  'npx tailwindcss -i ./src/styles/tailwind.css -o ./data/dist/styles.css --minify',
  () => {
    console.log('Tailwind CSS built.');
  }
);

esbuild
  .build({
    entryPoints: [path.resolve(__dirname, '../src/main.ts')],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: path.resolve(__dirname, '../data/dist/bundle.js'), // Output langsung ke data/
  })
  .then(() => {
    console.log('Build complete!');
  })
  .catch((err) => {
    console.error('Build failed:', err);
    process.exit(1);
  });
