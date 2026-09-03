const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const filesToCopy = [
  'index.html',
  'style.css',
  'app.js',
  'robots.txt',
  'sitemap.xml',
  'google85046404b5d4abe9.html'
];

filesToCopy.forEach(file => {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file));
  }
});

// Copiar carpeta assets
const assetsSrc = path.join(__dirname, 'assets');
const assetsDist = path.join(distDir, 'assets');
if (fs.existsSync(assetsSrc)) {
  fs.cpSync(assetsSrc, assetsDist, { recursive: true });
}

console.log('Build completado con éxito en carpeta dist/');
