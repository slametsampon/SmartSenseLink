const esbuild = require('esbuild');
const liveServer = require('live-server');
const { exec } = require('child_process');

// Build CSS menggunakan Tailwind
const buildTailwind = () => {
  exec(
    'npx tailwindcss -i ./src/styles/tailwind.css -o ./public/dist/styles.css --watch',
    (err, stdout, stderr) => {
      if (err) {
        console.error('Tailwind CSS Error:', stderr);
      } else {
        console.log('Tailwind CSS Updated:', stdout);
      }
    }
  );
};

// Build dan Watch menggunakan API baru esbuild
esbuild
  .context({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    sourcemap: true,
    outfile: './public/dist/bundle.js',
  })
  .then((ctx) => {
    // Aktifkan mode watch
    ctx
      .watch()
      .then(() => {
        console.log('Watching for changes...');
      })
      .catch((err) => {
        console.error('Watch Error:', err);
      });
  })
  .catch((err) => {
    console.error('Build Error:', err);
    process.exit(1);
  });

// Jalankan Live Server
liveServer.start({
  root: './public',
  file: 'index.html',
  port: 8080,
  open: true,
});

// Build Tailwind
buildTailwind();
