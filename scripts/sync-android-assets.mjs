import fs from 'fs';
import path from 'path';

const SRC_DIR = '.';
const DEST_DIR = 'omnitool-android-app/app/src/main/assets/web';

function copyDirRecursive(src, dest, excludeDirs = []) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (excludeDirs.includes(entry.name)) continue;
      copyDirRecursive(srcPath, destPath, excludeDirs);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('🔄 Starting sync to Android assets...');

// 1. Ensure target dir exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// 2. Copy root files
const rootFiles = [
  'index.html',
  'style.css',
  'app.js',
  'ga-guard.js',
  'ad-config.json',
  'manifest.json',
  'sw.js',
  'app-ads.txt',
  'favicon.ico'
];

for (const file of rootFiles) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(DEST_DIR, file));
    console.log(`  ✓ Copied ${file}`);
  }
}

// 3. Copy tools/
console.log('  📂 Syncing tools/ ...');
copyDirRecursive('tools', path.join(DEST_DIR, 'tools'), ['archive']);
console.log('  ✓ tools/ synced');

// 4. Copy guides/
console.log('  📂 Syncing guides/ ...');
if (fs.existsSync('guides')) {
  copyDirRecursive('guides', path.join(DEST_DIR, 'guides'));
  console.log('  ✓ guides/ synced');
}

// 5. Copy assets/
console.log('  📂 Syncing assets/ ...');
if (fs.existsSync('assets')) {
  copyDirRecursive('assets', path.join(DEST_DIR, 'assets'));
  console.log('  ✓ assets/ synced');
}

// 6. Copy social_media_assets/
console.log('  📂 Syncing social_media_assets/ ...');
if (fs.existsSync('social_media_assets')) {
  copyDirRecursive('social_media_assets', path.join(DEST_DIR, 'social_media_assets'));
  console.log('  ✓ social_media_assets/ synced');
}

console.log('🎉 Android assets synchronization complete!');

