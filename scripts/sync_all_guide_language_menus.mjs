import fs from 'fs';
import path from 'path';

const CORE_SLUGS = [
  'compress-pdf',
  'pdf-utilities',
  'qr-studio',
  'json-formatter',
  'password-generator'
];

function updateHubs() {
  // 1. guides/pt/index.html
  const ptIndexPath = 'guides/pt/index.html';
  if (fs.existsSync(ptIndexPath)) {
    let content = fs.readFileSync(ptIndexPath, 'utf8');
    // Update language switcher capsule
    content = content.replace(
      /<div class="lang-switch-capsule">[\s\S]*?<\/div>/,
      `<div class="lang-switch-capsule">\n          <a href="/guides/" class="lang-btn">EN</a>\n          <a href="/guides/es/" class="lang-btn">ES</a>\n          <a href="/guides/pt/" class="lang-btn active">PT</a>\n          <a href="/guides/de/" class="lang-btn">DE</a>\n          <a href="/guides/fr/" class="lang-btn">FR</a>\n        </div>`
    );
    // Add DE and FR hreflang if missing
    if (!content.includes('hreflang="de"')) {
      content = content.replace(
        /<link rel="alternate" hreflang="pt" href="https:\/\/omnitool\.worldsneed\.com\/guides\/pt\/">/,
        `<link rel="alternate" hreflang="pt" href="https://omnitool.worldsneed.com/guides/pt/">\n  <link rel="alternate" hreflang="de" href="https://omnitool.worldsneed.com/guides/de/">\n  <link rel="alternate" hreflang="fr" href="https://omnitool.worldsneed.com/guides/fr/">`
      );
    }
    fs.writeFileSync(ptIndexPath, content, 'utf8');
    console.log('✓ Updated guides/pt/index.html');
  }

  // 2. guides/es/index.html
  const esIndexPath = 'guides/es/index.html';
  if (fs.existsSync(esIndexPath)) {
    let content = fs.readFileSync(esIndexPath, 'utf8');
    content = content.replace(
      /<div class="lang-switch-capsule">[\s\S]*?<\/div>/,
      `<div class="lang-switch-capsule">\n          <a href="/guides/" class="lang-btn">EN</a>\n          <a href="/guides/es/" class="lang-btn active">ES</a>\n          <a href="/guides/pt/" class="lang-btn">PT</a>\n          <a href="/guides/de/" class="lang-btn">DE</a>\n          <a href="/guides/fr/" class="lang-btn">FR</a>\n        </div>`
    );
    if (!content.includes('hreflang="de"')) {
      content = content.replace(
        /<link rel="alternate" hreflang="pt" href="https:\/\/omnitool\.worldsneed\.com\/guides\/pt\/">/,
        `<link rel="alternate" hreflang="pt" href="https://omnitool.worldsneed.com/guides/pt/">\n  <link rel="alternate" hreflang="de" href="https://omnitool.worldsneed.com/guides/de/">\n  <link rel="alternate" hreflang="fr" href="https://omnitool.worldsneed.com/guides/fr/">`
      );
    }
    fs.writeFileSync(esIndexPath, content, 'utf8');
    console.log('✓ Updated guides/es/index.html');
  }

  // 3. guides/index.html (English)
  const enIndexPath = 'guides/index.html';
  if (fs.existsSync(enIndexPath)) {
    let content = fs.readFileSync(enIndexPath, 'utf8');
    content = content.replace(
      /<div class="lang-switch-capsule">[\s\S]*?<\/div>/,
      `<div class="lang-switch-capsule">\n          <a href="/guides/" class="lang-btn active" title="English">EN</a>\n          <a href="/guides/es/" class="lang-btn" title="Español">ES</a>\n          <a href="/guides/pt/" class="lang-btn" title="Português">PT</a>\n          <a href="/guides/de/" class="lang-btn" title="Deutsch">DE</a>\n          <a href="/guides/fr/" class="lang-btn" title="Français">FR</a>\n        </div>`
    );
    if (!content.includes('hreflang="de"')) {
      content = content.replace(
        /<link rel="alternate" hreflang="pt" href="https:\/\/omnitool\.worldsneed\.com\/guides\/pt\/">/,
        `<link rel="alternate" hreflang="pt" href="https://omnitool.worldsneed.com/guides/pt/">\n  <link rel="alternate" hreflang="de" href="https://omnitool.worldsneed.com/guides/de/">\n  <link rel="alternate" hreflang="fr" href="https://omnitool.worldsneed.com/guides/fr/">`
      );
    }
    fs.writeFileSync(enIndexPath, content, 'utf8');
    console.log('✓ Updated guides/index.html');
  }
}

function updateCoreLocalizedGuides() {
  for (const slug of CORE_SLUGS) {
    // Spanish
    const esFile = `guides/es/${slug}.html`;
    if (fs.existsSync(esFile)) {
      let content = fs.readFileSync(esFile, 'utf8');
      content = content.replace(
        /<div class="lang-switch-capsule">[\s\S]*?<\/div>/,
        `<div class="lang-switch-capsule">\n          <a href="/guides/${slug}" class="lang-btn" title="English">EN</a>\n          <a href="/guides/es/${slug}" class="lang-btn active" title="Español">ES</a>\n          <a href="/guides/pt/${slug}" class="lang-btn" title="Português">PT</a>\n          <a href="/guides/de/${slug}" class="lang-btn" title="Deutsch">DE</a>\n          <a href="/guides/fr/${slug}" class="lang-btn" title="Français">FR</a>\n        </div>`
      );
      if (!content.includes('hreflang="de"')) {
        content = content.replace(
          new RegExp(`<link rel="alternate" hreflang="pt" href="https://omnitool\\.worldsneed\\.com/guides/pt/${slug}">`),
          `<link rel="alternate" hreflang="pt" href="https://omnitool.worldsneed.com/guides/pt/${slug}">\n  <link rel="alternate" hreflang="de" href="https://omnitool.worldsneed.com/guides/de/${slug}">\n  <link rel="alternate" hreflang="fr" href="https://omnitool.worldsneed.com/guides/fr/${slug}">`
        );
      }
      fs.writeFileSync(esFile, content, 'utf8');
      console.log(`✓ Updated ${esFile}`);
    }

    // Portuguese
    const ptFile = `guides/pt/${slug}.html`;
    if (fs.existsSync(ptFile)) {
      let content = fs.readFileSync(ptFile, 'utf8');
      content = content.replace(
        /<div class="lang-switch-capsule">[\s\S]*?<\/div>/,
        `<div class="lang-switch-capsule">\n          <a href="/guides/${slug}" class="lang-btn" title="English">EN</a>\n          <a href="/guides/es/${slug}" class="lang-btn" title="Español">ES</a>\n          <a href="/guides/pt/${slug}" class="lang-btn active" title="Português">PT</a>\n          <a href="/guides/de/${slug}" class="lang-btn" title="Deutsch">DE</a>\n          <a href="/guides/fr/${slug}" class="lang-btn" title="Français">FR</a>\n        </div>`
      );
      if (!content.includes('hreflang="de"')) {
        content = content.replace(
          new RegExp(`<link rel="alternate" hreflang="pt" href="https://omnitool\\.worldsneed\\.com/guides/pt/${slug}">`),
          `<link rel="alternate" hreflang="pt" href="https://omnitool.worldsneed.com/guides/pt/${slug}">\n  <link rel="alternate" hreflang="de" href="https://omnitool.worldsneed.com/guides/de/${slug}">\n  <link rel="alternate" hreflang="fr" href="https://omnitool.worldsneed.com/guides/fr/${slug}">`
        );
      }
      fs.writeFileSync(ptFile, content, 'utf8');
      console.log(`✓ Updated ${ptFile}`);
    }

    // English
    const enFile = `guides/${slug}.html`;
    if (fs.existsSync(enFile)) {
      let content = fs.readFileSync(enFile, 'utf8');
      content = content.replace(
        /<div class="lang-switch-capsule">[\s\S]*?<\/div>/,
        `<div class="lang-switch-capsule">\n          <a href="/guides/${slug}" class="lang-btn active" title="English">EN</a>\n          <a href="/guides/es/${slug}" class="lang-btn" title="Español">ES</a>\n          <a href="/guides/pt/${slug}" class="lang-btn" title="Português">PT</a>\n          <a href="/guides/de/${slug}" class="lang-btn" title="Deutsch">DE</a>\n          <a href="/guides/fr/${slug}" class="lang-btn" title="Français">FR</a>\n        </div>`
      );
      if (!content.includes('hreflang="de"')) {
        content = content.replace(
          new RegExp(`<link rel="alternate" hreflang="pt" href="https://omnitool\\.worldsneed\\.com/guides/pt/${slug}">`),
          `<link rel="alternate" hreflang="pt" href="https://omnitool.worldsneed.com/guides/pt/${slug}">\n  <link rel="alternate" hreflang="de" href="https://omnitool.worldsneed.com/guides/de/${slug}">\n  <link rel="alternate" hreflang="fr" href="https://omnitool.worldsneed.com/guides/fr/${slug}">`
        );
      }
      fs.writeFileSync(enFile, content, 'utf8');
      console.log(`✓ Updated ${enFile}`);
    }
  }
}

function updateGeneralEnglishGuides() {
  const guideFiles = fs.readdirSync('guides').filter(f => f.endsWith('.html') && f !== 'index.html' && !CORE_SLUGS.includes(f.replace('.html', '')));
  for (const f of guideFiles) {
    const fullPath = path.join('guides', f);
    const slug = f.replace('.html', '');
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('<div class="lang-switch-capsule">')) {
      content = content.replace(
        /<div class="lang-switch-capsule">[\s\S]*?<\/div>/,
        `<div class="lang-switch-capsule">\n          <a href="/guides/${slug}" class="lang-btn active" title="English">EN</a>\n          <a href="/guides/es/" class="lang-btn" title="Español">ES</a>\n          <a href="/guides/pt/" class="lang-btn" title="Português">PT</a>\n          <a href="/guides/de/" class="lang-btn" title="Deutsch">DE</a>\n          <a href="/guides/fr/" class="lang-btn" title="Français">FR</a>\n        </div>`
      );
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
  console.log(`✓ Updated ${guideFiles.length} general English guides with DE & FR links in language menu.`);
}

console.log('Synchronizing all Guide Menus to include EN, ES, PT, DE, FR...');
updateHubs();
updateCoreLocalizedGuides();
updateGeneralEnglishGuides();
console.log('🎉 All menus successfully synchronized across all guides!');
