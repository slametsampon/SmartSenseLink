const { exec } = require('child_process');

const repoUrl = 'https://github.com/slametsampon/SmartSenseLink.git'; // URL GitHub Repo

exec(
  `
  cd public &&
  rm -rf .git &&                                   # Hapus repository lama (opsional)
  git init &&                                      # Inisialisasi Git baru
  git branch -M main &&                            # Pastikan branch default adalah "main"
  git remote add origin ${repoUrl} &&              # Tambahkan remote GitHub
  git add . &&                                     # Tambahkan semua file ke staging
  git commit -m "Deploy to GitHub Pages" &&        # Commit file
  git push -f origin main:gh-pages                 # Push ke branch gh-pages
  `,
  (err, stdout, stderr) => {
    if (err) {
      console.error('Deploy error:', err);
      console.error(stderr);
    } else {
      console.log('Deployed to GitHub Pages.');
      console.log(stdout);
    }
  }
);
