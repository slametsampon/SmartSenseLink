const { exec } = require('child_process');
exec(
  `
  cd public &&
  git init &&
  git remote add origin https://github.com/slametsampon/SmartSenseLink.git &&
  git add . &&
  git commit -m "Deploy to GitHub Pages" &&
  git push -f origin main:gh-pages
`,
  (err) => {
    if (err) console.error('Deploy error:', err);
    else console.log('Deployed to GitHub Pages.');
  }
);
