const { exec } = require('child_process');

const repoUrl = 'https://github.com/slametsampon/SmartSenseLink.git'; // URL GitHub Repo

const commands = [
  'cd public',
  'rmdir /s /q .git', // Hapus repository lama
  'git init', // Inisialisasi repository baru
  'git branch -M main', // Ganti branch default ke main
  `git remote add origin ${repoUrl}`, // Tambahkan remote GitHub
  'git add .', // Tambahkan semua file
  'git commit -m "Deploy to GitHub Pages2"', // Buat commit
  'git push -f origin main:gh-pages', // Push ke gh-pages
];

// Jalankan perintah satu per satu
commands.forEach((cmd, index) => {
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error on command: ${cmd}`);
      console.error(stderr);
      process.exit(1); // Hentikan jika ada error
    } else if (index === commands.length - 1) {
      console.log('Deployed to GitHub Pages.');
    }
  });
});
