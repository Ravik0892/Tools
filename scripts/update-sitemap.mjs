import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Helper to escape XML special entities
const escapeXml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Dynamic ISO date (YYYY-MM-DD)
const TODAY = new Date().toISOString().slice(0, 10);

// 1. Core Landing, Virtual Views & Legal Pages
const mainPages = [
  {
    loc: 'https://omnitool.worldsneed.com/',
    lastmod: TODAY,
    changefreq: 'daily',
    priority: '1.0',
    comment: 'Main Landing and Live Workstation App'
  },
  {
    loc: 'https://omnitool.worldsneed.com/landing',
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: '0.95',
    comment: 'Features Showcase and Welcome Landing'
  },
  {
    loc: 'https://omnitool.worldsneed.com/plans',
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: '0.90',
    comment: 'PRO Membership Plans and Instant License Checkout'
  },
    {
    loc: 'https://omnitool.worldsneed.com/privacy',
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.70',
    comment: 'Privacy Policy and Zero-Data-Transmission Guarantee'
  },
  {
    loc: 'https://omnitool.worldsneed.com/about',
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.70',
    comment: 'About OmniTool Hub and Engineering Architecture'
  },
  {
    loc: 'https://omnitool.worldsneed.com/contact',
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.70',
    comment: 'Contact, Developer Support and Issue Reporting'
  },
  {
    loc: 'https://omnitool.worldsneed.com/terms',
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.70',
    comment: 'Terms of Service and Licensing Conditions'
  }
];

// 2. Category Hub Pages
const categoryPages = [
  {
    loc: 'https://omnitool.worldsneed.com/category/dev',
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: '0.85',
    comment: 'Developer and Code Utilities Category Hub'
  },
  {
    loc: 'https://omnitool.worldsneed.com/category/text',
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: '0.85',
    comment: 'Text, Writing and Document Tools Category Hub'
  },
  {
    loc: 'https://omnitool.worldsneed.com/category/design',
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: '0.85',
    comment: 'Design, CSS, Graphics and Media Studio Category Hub'
  },
  {
    loc: 'https://omnitool.worldsneed.com/category/math',
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: '0.85',
    comment: 'Math, Time, Security and Network Calculators Category Hub'
  }
];

// 3. Guides Hub & Payment Guide
const guidesHub = [
  {
    loc: 'https://omnitool.worldsneed.com/guides/',
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: '0.90',
    comment: 'Guides and Documentation Master Hub'
  },
  {
    loc: 'https://omnitool.worldsneed.com/guides/payment-guide',
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: '0.85',
    comment: 'Step-by-Step Payment and Activation Guide'
  }
];

// 4. Map each guide to its dedicated SVG poster for Google Image indexing
const posterMap = {};

// Load original toolsData from generate-guides.mjs
const genScript = fs.readFileSync(path.join(projectRoot, 'scripts', 'generate-guides.mjs'), 'utf8');
const diagRegex = /\{\s*id:\s*["']([^"']+)["'][\s\S]*?src:\s*["']([^"']+)["'][\s\S]*?caption:\s*["']([^"']+)["']/g;
let dm;
while ((dm = diagRegex.exec(genScript)) !== null) {
  posterMap[dm[1]] = {
    src: dm[2].replace(/^\.\.\//, ''),
    caption: dm[3]
  };
}

// Load newToolsData
try {
  const newToolsPath = path.join(projectRoot, 'scripts', 'new-tools-data.mjs');
  const { newToolsData } = await import('file:///' + newToolsPath.replace(/\\/g, '/'));
  newToolsData.forEach(t => {
    if (t.diagram) {
      posterMap[t.id] = {
        src: t.diagram.src.replace(/^\.\.\//, ''),
        caption: t.diagram.caption
      };
    }
  });
} catch (e) {
  console.warn('[Sitemap] Notice loading newToolsData:', e.message);
}

// Read all HTML guides from disk
const guidesDir = path.join(projectRoot, 'guides');
const guideHtmlFiles = fs.existsSync(guidesDir)
  ? fs.readdirSync(guidesDir)
      .filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'payment-guide.html')
      .sort()
  : [];

const guideEntries = guideHtmlFiles.map((file, idx) => {
  const toolId = file.replace('.html', '');
  const poster = posterMap[toolId];

  return {
    loc: `https://omnitool.worldsneed.com/guides/${toolId}`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.80',
    comment: idx === 0 ? 'Individual Tool Guides with Dedicated Technical Posters' : null,
    image: poster ? {
      loc: `https://omnitool.worldsneed.com/${poster.src}`,
      title: `${toolId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} Technical Reference Poster`,
      caption: poster.caption
    } : null
  };
});

// 4.1 Scan Multilingual Localized Guides (Spanish, Portuguese, etc.)
const localizedDirs = ['es', 'pt'];
const localizedGuideEntries = [];
localizedDirs.forEach(lang => {
  const langDir = path.join(guidesDir, lang);
  if (fs.existsSync(langDir)) {
    localizedGuideEntries.push({
      loc: `https://omnitool.worldsneed.com/guides/${lang}/`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.85',
      comment: lang === 'es' ? 'Multilingual International SEO Guides (Spanish / Español)' : 'Multilingual International SEO Guides (Portuguese / Português)'
    });

    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.html') && f !== 'index.html').sort();
    files.forEach(file => {
      const toolId = file.replace('.html', '');
      localizedGuideEntries.push({
        loc: `https://omnitool.worldsneed.com/guides/${lang}/${toolId}`,
        lastmod: TODAY,
        changefreq: 'monthly',
        priority: '0.80'
      });
    });
  }
});

// 5. Primary Tools from app.js
const appJsPath = path.join(projectRoot, 'app.js');
const appJs = fs.readFileSync(appJsPath, 'utf8');
const appTools = [];
for (const m of appJs.matchAll(/\{\s*id:\s*["']([a-z0-9-]+)["'],\s*name:\s*["']/g)) {
  if (m[1] !== 'admin-settings') {
    appTools.push(m[1]);
  }
}

// 6. Sub-Tool & Feature Aliases from toolRedirects
const idx = appJs.indexOf('toolRedirects: {');
let aliasKeys = [];
if (idx !== -1) {
  const end = appJs.indexOf('_activeTabSwitchers:', idx);
  const redirectsStr = end !== -1 ? appJs.slice(idx, end) : appJs.slice(idx, idx + 5000);
  for (const m of redirectsStr.matchAll(/["']([a-z0-9-]+)["']\s*:\s*\{/g)) {
    aliasKeys.push(m[1]);
  }
}

const primaryToolEntries = appTools.map((id, index) => ({
  loc: `https://omnitool.worldsneed.com/tool/${id}`,
  lastmod: TODAY,
  changefreq: 'weekly',
  priority: '0.85',
  comment: index === 0 ? 'Direct Clean Primary Tool URLs for Maximum Google Search Indexing' : null
}));

const filteredAliases = [...new Set(aliasKeys.filter(id => !appTools.includes(id)))];

const aliasEntries = filteredAliases.map((id, index) => ({
  loc: `https://omnitool.worldsneed.com/tool/${id}`,
  lastmod: TODAY,
  changefreq: 'weekly',
  priority: '0.80',
  comment: index === 0 ? 'Consolidated Sub-Tool and Feature Deep-Link Aliases' : null
}));

// Build XML document with standard sitemap and Google Image sitemap namespaces
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

function appendEntries(entries) {
  for (const e of entries) {
    if (e.comment) {
      xml += `\n  <!-- ${e.comment} -->\n`;
    }
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(e.loc)}</loc>\n`;
    xml += `    <lastmod>${e.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${e.changefreq}</changefreq>\n`;
    xml += `    <priority>${e.priority}</priority>\n`;
    if (e.image) {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${escapeXml(e.image.loc)}</image:loc>\n`;
      if (e.image.title) {
        xml += `      <image:title>${escapeXml(e.image.title)}</image:title>\n`;
      }
      if (e.image.caption) {
        xml += `      <image:caption>${escapeXml(e.image.caption)}</image:caption>\n`;
      }
      xml += '    </image:image>\n';
    }
    xml += '  </url>\n';
  }
}

appendEntries(mainPages);
appendEntries(categoryPages);
appendEntries(guidesHub);
appendEntries(guideEntries);
appendEntries(localizedGuideEntries);
appendEntries(primaryToolEntries);
appendEntries(aliasEntries);

xml += '</urlset>\n';

// Write root sitemap.xml
const rootSitemapPath = path.join(projectRoot, 'sitemap.xml');
fs.writeFileSync(rootSitemapPath, xml, 'utf8');

// Write Android asset mirror
const androidSitemapPath = path.join(projectRoot, 'omnitool-android-app', 'app', 'src', 'main', 'assets', 'web', 'sitemap.xml');
if (fs.existsSync(path.dirname(androidSitemapPath))) {
  fs.writeFileSync(androidSitemapPath, xml, 'utf8');
}

const totalCount = mainPages.length + categoryPages.length + guidesHub.length + guideEntries.length + localizedGuideEntries.length + primaryToolEntries.length + aliasEntries.length;
const totalImages = guideEntries.filter(e => e.image).length;
console.log(`[Sitemap] Successfully updated sitemap.xml with ${totalCount} URLs (including ${localizedGuideEntries.length} localized guides) and ${totalImages} Google Image poster indices on date ${TODAY}.`);
