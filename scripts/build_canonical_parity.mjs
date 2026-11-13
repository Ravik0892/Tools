import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

// Helper to escape HTML/XML
const escapeHtml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Tool specifications for the two new powerhouse suites
const toolConfigs = [
  {
    id: "fancy-font-generator",
    fileName: "fancy-font-generator.html",
    title: "Fancy Font & Aesthetic Text Studio Guide | Instagram, Discord & TikTok | OmniTool Hub",
    description: "Convert text into 60+ stylish Unicode fonts, Gothic Fraktur, cursive calligraphy, small caps, and glitch text for Instagram bios, TikTok captions, and Discord names with 100% client-side privacy.",
    h1: "Fancy Font & Bio Text Generator Guide",
    tag: "Unicode Typography",
    categoryPill: "✨ Text & Writing",
    canonicalUrl: "https://omnitool.worldsneed.com/guides/fancy-font-generator",
    diagramSrc: "../social_media_assets/typography_unicode_font_matrix_poster_1200x800.svg",
    diagramAlt: "Unicode typography and aesthetic font reference poster detailing glyph planes, cross-platform compatibility, and bio studio symbol sets",
    diagramCaption: "Unicode Typography & Aesthetic Font Architecture: Mathematical alphanumeric planes, gothic blackletter, enclosed badges, and social media bio matrix.",
    targetModule: "fancy-font-generator.js",
    leadParagraph: "The <strong>Fancy Font &amp; Bio Text Generator</strong> transforms ordinary text into eye-catching Unicode typography, cursive calligraphy, Victorian Fraktur, aesthetic symbols, and formatted social media bios. Because all transformations happen client-side using universal Unicode character points, your generated text can be copied with one click and pasted anywhere on the web with zero font downloads required.",
    tabsTitle: "Popular Typography Styles & Bio Tools",
    tabs: [
      {
        title: "1. Gothic & Medieval Fraktur",
        badge: "𝕲𝖔𝖙𝖍𝖎𝖈",
        desc: "Originating from 12th-century European manuscripts, Gothic and Fraktur fonts are famous for dramatic blackletter strokes. Perfect for gaming clan tags, Discord server channels, and edgy aesthetic profiles."
      },
      {
        title: "2. Cursive & Elegant Calligraphy",
        badge: "𝓒𝓾𝓻𝓼𝓲𝓿𝓮",
        desc: "Flowing handwritten cursive characters that give Instagram bios, love letters, and inspirational quotes an elegant, luxurious touch that stands out from default platform fonts."
      },
      {
        title: "3. Small Capital Letters (Small Caps)",
        badge: "ꜱᴍᴀʟʟ ᴄᴀᴘꜱ",
        desc: "Small caps reduce the height of uppercase characters while maintaining uniform readability. A favorite for modern aesthetic accounts, Twitter/X handles, and clean minimal captions."
      },
      {
        title: "4. Circled Bubbles & Square Badges",
        badge: "Ⓑⓤⓑⓑⓛⓔ",
        desc: "Encloses each letter inside a rounded circle or square badge. Ideal for numbered lists, step-by-step instructions, and prominent comment replies that grab attention."
      },
      {
        title: "5. Tiny Superscript & Subscript",
        badge: "ᵗⁱⁿʸ ˢᶜʳⁱᵖᵗ",
        desc: "Miniature high-index and low-index characters allow you to write compact bio captions, aesthetic footnotes, and brand subheadings that occupy minimal visual space."
      },
      {
        title: "6. Bio Studio & Aesthetic Symbols Palette",
        badge: "Symbols",
        desc: "Includes pre-made social media bio templates, headers, dividers, stars, sparkle glyphs, arrows, and cute Japanese kaomoji emoticons ready for 1-click clipboard copying."
      }
    ],
    proTip: "Because these fonts are native Unicode character points rather than downloadable font files (.ttf/.woff), they render identically across iOS, Android, Windows, macOS, and Linux without needing any font installations.",
    steps: [
      "Type or paste your text into the **Input Text** area on the left panel (supports live preview across all 60+ font styles instantly).",
      "Filter styles by category (All, Popular, Cursive, Gothic, Small Caps, Bubbles, Glitch) or use search to find your preferred aesthetic.",
      "Click any font card to instantly copy the transformed text to your clipboard with automatic toast confirmation.",
      "Click the **Star** icon on any card to pin your favorite styles to the top of the gallery for quick future access.",
      "Switch to the **Bio Studio** tab to insert aesthetic dividers, sparkles, and curated bio templates directly into your profile copy."
    ],
    faqs: [
      {
        q: "How do fancy fonts work on Instagram, Discord, and TikTok?",
        a: "Fancy fonts are generated using the universal Unicode standard. Rather than loading a custom font file, your text is converted into unique Unicode mathematical alphanumeric symbols and characters that are natively recognized by iOS, Android, Windows, and macOS."
      },
      {
        q: "Can I use these fonts in Discord, YouTube titles, and gaming handles?",
        a: "Yes! Because these are standard Unicode characters, they can be copied and pasted directly into Discord usernames, server channels, YouTube video titles, and gaming handles (Fortnite, Roblox, Steam, Free Fire)."
      },
      {
        q: "Is my text private when using this tool?",
        a: "Yes. OmniTool Hub operates 100% client-side in your web browser. No text is ever uploaded to a remote server or logged in any database."
      }
    ],
    ctaHref: "../index.html#tool/fancy-font-generator",
    ctaLabel: "Launch Font Studio",
    related: [
      { href: "text-analyzer.html", icon: "📊", badge: "Text & Writing", title: "Text Readability & Syllable Analyzer" },
      { href: "lorem-generator.html", icon: "📜", badge: "Text & Writing", title: "Smart Lorem Ipsum & Typographic Generator" },
      { href: "text-encoder-suite.html", icon: "🔤", badge: "Text & Writing", title: "Text Cases, Unicode & String Encoder Suite" }
    ]
  },
  {
    id: "finance-calculator",
    fileName: "finance-calculator.html",
    title: "Financial Growth & Loan Calculator Guide | SIP, EMI & Compound Interest | OmniTool Hub",
    description: "Master wealth compounding with OmniTool Hub's client-side Financial Calculator Suite. Calculate SIP returns, compound interest, and loan EMI mortgage amortization schedules with live visual charts.",
    h1: "Financial Growth & Loan Calculator Suite Guide",
    tag: "Financial Math",
    categoryPill: "💰 Math & Time",
    canonicalUrl: "https://omnitool.worldsneed.com/guides/finance-calculator",
    diagramSrc: "../social_media_assets/financial_wealth_growth_matrix_poster_1200x800.svg",
    diagramAlt: "Financial wealth growth and loan amortization poster detailing SIP compounding curves, EMI formulas, and prepayment schedules",
    diagramCaption: "Financial Growth & Loan Architecture: Exponential compounding calculus, reducing balance amortization, step-up accelerators, and inflation parity.",
    targetModule: "finance-calculator.js",
    leadParagraph: "The <strong>Financial Growth &amp; Loan Calculator Suite</strong> brings institutional-grade wealth planning and loan amortization modeling directly into your browser. Unlike traditional financial websites that harvest your salary, loan amounts, and personal portfolio data on remote databases, every single formula, amortization table, and SVG growth curve executes <strong>100% locally on your computer with zero data transmission</strong>.",
    tabsTitle: "The Three Powerhouse Financial Engines",
    tabs: [
      {
        title: "1. Systematic Investment Plan (SIP) & Wealth Accumulator",
        badge: "Wealth Builder",
        desc: "Calculates future wealth accumulation from recurring monthly investments into mutual funds or index funds, utilizing rupee/dollar-cost averaging to eliminate emotional market timing."
      },
      {
        title: "2. Albert Einstein's 8th Wonder: Compound Interest & APY",
        badge: "Compound Growth",
        desc: "Computes compound growth on initial lump-sum deposits with optional regular additions. Supports Daily, Monthly, Quarterly, and Annual compounding frequencies to evaluate true APY."
      },
      {
        title: "3. Loan EMI & Mortgage Amortization Schedule",
        badge: "Debt Elimination",
        desc: "Calculates exact monthly installments under reducing balance loan models. Features prepayment accelerators and generates complete year-by-year and month-by-month repayment schedules."
      },
      {
        title: "4. Step-Up Accelerator & Inflation Purchasing Power Checker",
        badge: "Real Returns",
        desc: "Model annual investment increments (e.g. 10% annual salary raises) and calculate the real inflation-adjusted purchasing power of your final retirement corpus."
      }
    ],
    proTip: "In long-term SIPs (15+ years), enabling a modest 10% annual Step-Up often more than doubles your final maturity corpus due to late-stage exponential compounding.",
    steps: [
      "Select your calculation engine: **SIP Planner**, **Compound Interest**, or **Loan EMI**.",
      "Enter your financial inputs (principal or monthly deposit, expected annual return rate, and tenure) and select your currency ($ USD, ₹ INR, € EUR, £ GBP, ¥ JPY).",
      "Toggle optional accelerators like **Step-Up %** or **Prepayment amounts** to see immediate interest savings and tenure reduction.",
      "Inspect the live interactive **Donut Chart** and **Growth Curve** stage to visualize principal outflow vs accumulated return.",
      "Review the detailed year-by-year or month-by-month amortization schedule and click **Copy Summary** or **Export to CSV**."
    ],
    faqs: [
      {
        q: "What is a Systematic Investment Plan (SIP)?",
        a: "A SIP is an investment strategy where you invest a fixed amount of money at regular intervals (usually monthly) into mutual funds or index funds. This leverages cost averaging and exponential compound interest over long horizons."
      },
      {
        q: "How does compound interest differ from simple interest?",
        a: "Simple interest is calculated solely on the initial principal amount. Compound interest is calculated on the initial principal plus the accumulated interest of prior periods, causing exponential growth over time."
      },
      {
        q: "How do extra prepayments help reduce my loan EMI or tenure?",
        a: "Any extra prepayment goes directly toward reducing the outstanding principal balance. Because interest is charged on the reducing balance, reducing principal instantly slashes total interest owed and can shave years off your loan tenure."
      }
    ],
    ctaHref: "../index.html#tool/finance-calculator",
    ctaLabel: "Launch Financial Engine",
    related: [
      { href: "calculator.html", icon: "🧮", badge: "Math & Time", title: "Scientific Calculator & Arithmetic Engine" },
      { href: "unit-converter.html", icon: "📐", badge: "Math & Time", title: "Universal Unit & Metric Conversion Suite" },
      { href: "datetime-suite.html", icon: "⏱️", badge: "Math & Time", title: "Date Duration, Business Days & Epoch Suite" }
    ]
  }
];

function generateCanonicalGuideHtml(tool) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(tool.title)}</title>
  <meta name="description" content="${escapeHtml(tool.description)}">
  <meta name="keywords" content="${escapeHtml(tool.tag)}, ${escapeHtml(tool.h1)}, OmniTool Hub, developer tools, client-side, offline, privacy">
  <link rel="canonical" href="${tool.canonicalUrl}">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(tool.title)}">
  <meta property="og:description" content="${escapeHtml(tool.description)}">
  <meta property="og:url" content="${tool.canonicalUrl}">
  <meta property="og:site_name" content="OmniTool Hub">
  <meta property="og:image" content="https://omnitool.worldsneed.com/${tool.diagramSrc.replace(/^\.\.\//, '')}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(tool.title)}">
  <meta name="twitter:description" content="${escapeHtml(tool.description)}">
  <meta name="twitter:image" content="https://omnitool.worldsneed.com/${tool.diagramSrc.replace(/^\.\.\//, '')}">

  <!-- Google Analytics (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-7FG02T8BFR"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    if (window.location.protocol.startsWith('http') && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      gtag('config', 'G-7FG02T8BFR', { anonymize_ip: true });
    }
  </script>

  <!-- Typography & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css?v=2.1.5">

  <!-- JSON-LD Structured Data for Rich Search Snippets -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "OmniTool Hub",
            "item": "https://omnitool.worldsneed.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Guides Hub",
            "item": "https://omnitool.worldsneed.com/guides/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "${escapeHtml(tool.h1)}",
            "item": "${tool.canonicalUrl}"
          }
        ]
      },
      {
        "@type": "TechArticle",
        "headline": "${escapeHtml(tool.h1)}",
        "description": "${escapeHtml(tool.description)}",
        "author": {
          "@type": "Organization",
          "name": "OmniTool Hub"
        },
        "publisher": {
          "@type": "Organization",
          "name": "OmniTool Hub",
          "logo": {
            "@type": "ImageObject",
            "url": "https://omnitool.worldsneed.com/social_media_assets/profile_avatar_icon_1080x1080.svg"
          }
        },
        "image": {
          "@type": "ImageObject",
          "url": "https://omnitool.worldsneed.com/${tool.diagramSrc.replace(/^\.\.\//, '')}",
          "width": 1200,
          "height": 800,
          "caption": "${escapeHtml(tool.diagramCaption)}"
        },
        "datePublished": "2026-06-27",
        "dateModified": "2026-11-09",
        "mainEntityOfPage": "${tool.canonicalUrl}"
      },
      {
        "@type": "HowTo",
        "name": "How to Use ${escapeHtml(tool.h1.replace(/ Guide$/i, ''))}",
        "description": "${escapeHtml(tool.description)}",
        "step": [
          ${tool.steps.map((step, idx) => `{
            "@type": "HowToStep",
            "position": ${idx + 1},
            "name": "Step ${idx + 1}",
            "text": "${step.replace(/"/g, '\\"').replace(/\*\*/g, '')}"
          }`).join(',\n          ')}
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          ${tool.faqs.map(faq => `{
            "@type": "Question",
            "name": "${faq.q.replace(/"/g, '\\"')}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${faq.a.replace(/"/g, '\\"')}"
            }
          }`).join(',\n          ')}
        ]
      }
    ]
  }
  </script>

  <style>
    :root {
      --bg-app: #07090e;
      --bg-card: rgba(18, 24, 38, 0.65);
      --border-color: rgba(255, 255, 255, 0.08);
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --accent-cyan: #00f2fe;
      --accent-purple: #9d4edd;
      --accent-emerald: #10b981;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-app);
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(0, 242, 254, 0.06) 0%, transparent 40%),
        radial-gradient(circle at 85% 85%, rgba(157, 78, 221, 0.06) 0%, transparent 40%);
      color: var(--text-main);
      font-family: var(--font-sans);
      line-height: 1.65;
      padding: 0 0 60px 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* Top Navigation Bar */
    .top-nav {
      width: 100%;
      background: rgba(7, 9, 14, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 14px 24px;
    }

    .top-nav-inner {
      max-width: 1240px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      width: 100%;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text-main);
      font-weight: 800;
      font-size: 16px;
      flex-shrink: 0;
    }

    .nav-brand svg {
      width: 22px;
      height: 22px;
      color: var(--accent-cyan);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .nav-link-btn {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      transition: all 0.2s ease;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .nav-link-btn:hover {
      color: var(--accent-cyan);
      border-color: rgba(0, 242, 254, 0.3);
      background: rgba(0, 242, 254, 0.04);
    }

    .nav-launch-btn {
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      text-decoration: none;
      font-size: 13px;
      font-weight: 800;
      padding: 7px 16px;
      border-radius: 6px;
      transition: all 0.2s ease;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .nav-launch-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0, 242, 254, 0.4);
    }

    /* Breadcrumbs */
    .breadcrumbs-wrap {
      width: 100%;
      max-width: 1240px;
      margin: 20px auto 0 auto;
      padding: 0 20px;
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 13px;
      color: var(--text-muted);
    }

    .breadcrumbs a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s;
    }

    .breadcrumbs a:hover {
      color: var(--accent-cyan);
    }

    .breadcrumbs .current {
      color: var(--text-main);
      font-weight: 600;
    }

    /* Main Container */
    .container {
      max-width: 860px;
      margin: 30px auto 0 auto;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 40px;
      backdrop-filter: blur(12px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      width: 100%;
    }

    header {
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 24px;
      margin-bottom: 32px;
      text-align: center;
    }

    .category-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 242, 254, 0.08);
      border: 1px solid rgba(0, 242, 254, 0.25);
      color: var(--accent-cyan);
      font-size: 12px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 14px;
    }

    h1 {
      font-size: 32px;
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 14px;
      letter-spacing: -0.5px;
      line-height: 1.25;
    }

    .meta {
      font-size: 13px;
      color: var(--text-muted);
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .meta-tag {
      background: rgba(255, 255, 255, 0.04);
      padding: 4px 12px;
      border-radius: 20px;
      border: 1px solid var(--border-color);
    }

    article h2 {
      font-size: 22px;
      font-weight: 700;
      margin-top: 36px;
      margin-bottom: 16px;
      color: var(--text-main);
      border-left: 3px solid var(--accent-cyan);
      padding-left: 12px;
    }

    article p {
      margin-bottom: 18px;
      color: var(--text-muted);
      font-size: 15.5px;
      line-height: 1.7;
    }

    article ul, article ol {
      margin-bottom: 18px;
      padding-left: 24px;
      color: var(--text-muted);
      font-size: 15px;
    }

    article li {
      margin-bottom: 8px;
    }

    .info-box {
      background: rgba(0, 242, 254, 0.04);
      border: 1px solid rgba(0, 242, 254, 0.2);
      border-radius: 10px;
      padding: 18px;
      margin: 28px 0;
    }

    .info-box strong {
      color: var(--accent-cyan);
      display: block;
      margin-bottom: 6px;
      font-size: 14.5px;
    }

    .tab-section {
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .tab-title {
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .tab-badge {
      font-size: 11px;
      background: var(--accent-purple);
      color: #fff;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      font-weight: 700;
    }

    .cta-container {
      text-align: center;
      margin-top: 40px;
      padding: 32px 24px;
      background: rgba(0, 0, 0, 0.35);
      border-radius: 12px;
      border: 1px solid var(--border-color);
    }

    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      font-weight: 800;
      font-size: 16px;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      box-shadow: 0 4px 18px rgba(0, 242, 254, 0.35);
      transition: all 0.2s ease;
    }

    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(0, 242, 254, 0.55);
      color: #000;
    }

    .all-guides-cta {
      display: inline-block;
      margin-top: 18px;
      color: var(--accent-cyan);
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
    }

    .all-guides-cta:hover {
      text-decoration: underline;
    }

    /* Related Guides Section */
    .related-section {
      margin-top: 50px;
      padding-top: 36px;
      border-top: 1px solid var(--border-color);
    }

    .related-heading {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .related-heading a {
      font-size: 13px;
      color: var(--accent-cyan);
      text-decoration: none;
      font-weight: 600;
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }

    .related-card {
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 18px;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
    }

    .related-card:hover {
      transform: translateY(-2px);
      border-color: rgba(0, 242, 254, 0.4);
      background: rgba(0, 242, 254, 0.03);
    }

    .related-badge {
      font-size: 11px;
      font-weight: 700;
      color: var(--accent-cyan);
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .related-title {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 8px;
      line-height: 1.35;
    }

    .related-read {
      font-size: 12.5px;
      color: var(--text-muted);
      margin-top: auto;
      font-weight: 600;
    }

    .related-card:hover .related-read {
      color: var(--accent-cyan);
    }

    footer.guide-footer {
      max-width: 860px;
      margin: 40px auto 0 auto;
      text-align: center;
      font-size: 13px;
      color: var(--text-muted);
      padding: 0 20px;
    }

    footer.guide-footer a {
      color: var(--text-muted);
      text-decoration: none;
      margin: 0 8px;
      transition: color 0.2s;
    }

    footer.guide-footer a:hover {
      color: var(--accent-cyan);
    }

    /* Live Interactive Tool Card */
    .live-tool-embed-card {
      background: rgba(10, 14, 23, 0.75);
      border: 1px solid rgba(0, 242, 254, 0.25);
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 36px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 242, 254, 0.08);
    }

    .live-tool-embed-header {
      background: rgba(18, 24, 38, 0.85);
      border-bottom: 1px solid var(--border-color);
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .live-status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text-main);
    }

    .pulse-dot {
      width: 9px;
      height: 9px;
      background: var(--accent-emerald);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--accent-emerald);
      animation: pulseGlow 2s infinite ease-in-out;
    }

    @keyframes pulseGlow {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.7; }
    }

    .live-fullscreen-link {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--accent-cyan);
      text-decoration: none;
      padding: 5px 12px;
      border-radius: 6px;
      border: 1px solid rgba(0, 242, 254, 0.3);
      background: rgba(0, 242, 254, 0.06);
      transition: all 0.2s ease;
    }

    .live-fullscreen-link:hover {
      background: rgba(0, 242, 254, 0.15);
      border-color: var(--accent-cyan);
      transform: translateY(-1px);
    }

    .live-guide-tool-viewport {
      padding: 20px;
      position: relative;
      max-height: 580px;
      overflow: hidden;
      background: rgba(8, 12, 20, 0.4);
      transition: all 0.25s ease;
    }

    .live-guide-tool-viewport .tool-guide-card,
    .live-guide-tool-viewport .split-view-resizer,
    .live-guide-tool-viewport .guide-scroll-arrow,
    .live-guide-tool-viewport .tool-panel-ad,
    .live-guide-tool-viewport .adjust-settings-fab,
    .live-guide-tool-viewport .split-view-backdrop,
    .live-guide-tool-viewport .drawer-close-btn,
    .live-guide-tool-viewport .tool-panel:first-of-type::after {
      display: none !important;
    }

    /* Embedded Live Playground Contained Viewport Standard with Internal Panel Scrolling */
    .live-guide-tool-viewport .tool-content-layout.split-view {
      display: grid !important;
      grid-template-columns: 1fr 1.08fr !important;
      gap: 20px !important;
      position: static !important;
      width: 100% !important;
      height: 520px !important;
      max-height: 520px !important;
      overflow: hidden !important;
      align-items: stretch !important;
      box-sizing: border-box !important;
    }

    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel,
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel:first-of-type,
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel:nth-of-type(2) {
      position: static !important;
      transform: none !important;
      width: 100% !important;
      max-width: 100% !important;
      height: 100% !important;
      max-height: 520px !important;
      min-height: 0 !important;
      box-shadow: none !important;
      border-radius: 12px !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      scrollbar-width: thin;
      padding: 18px !important;
      background: rgba(13, 17, 27, 0.75) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      box-sizing: border-box !important;
    }

    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel::-webkit-scrollbar-track {
      background: transparent;
    }
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
    }
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 242, 254, 0.4);
    }

    @media (max-width: 960px) {
      .live-guide-tool-viewport {
        max-height: 820px;
        overflow-y: auto;
      }
      .live-guide-tool-viewport .tool-content-layout.split-view {
        display: flex !important;
        flex-direction: column !important;
        height: auto !important;
        max-height: none !important;
        gap: 16px !important;
      }

      .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel,
      .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel:first-of-type,
      .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel:nth-of-type(2) {
        height: auto !important;
        max-height: 380px !important;
        overflow-y: auto !important;
      }
    }

    .skip-to-guide-link {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      padding: 5px 12px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      background: rgba(255, 255, 255, 0.04);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .skip-to-guide-link:hover {
      color: var(--accent-cyan);
      border-color: rgba(0, 242, 254, 0.35);
      background: rgba(0, 242, 254, 0.08);
      transform: translateY(-1px);
    }

    .toggle-tool-collapse-btn {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-color);
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .toggle-tool-collapse-btn:hover {
      color: var(--text-main);
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
    }

    .toggle-tool-collapse-btn .toggle-icon {
      display: inline-block;
      transition: transform 0.2s ease;
    }

    .toggle-tool-collapse-btn.is-collapsed .toggle-icon {
      transform: rotate(-90deg);
    }

    #guide-article {
      scroll-margin-top: 85px;
    }

    .guide-tool-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      color: var(--text-muted);
      gap: 12px;
      font-size: 13.5px;
    }

    .guide-tool-spinner {
      width: 30px;
      height: 30px;
      border: 3px solid rgba(0, 242, 254, 0.15);
      border-top-color: var(--accent-cyan);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Guide Toast Notification */
    .guide-toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: rgba(18, 24, 38, 0.95);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      opacity: 0;
      pointer-events: none;
      transform: translateY(10px);
      transition: all 0.25s ease;
      z-index: 9999;
    }

    .guide-toast.show {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .guide-toast.success { border-color: var(--accent-emerald); color: #34d399; }
    .guide-toast.error { border-color: var(--accent-rose); color: #f87171; }
    .guide-toast.info { border-color: var(--accent-cyan); color: #38bdf8; }

    @media (max-width: 640px) {
      .container {
        padding: 24px 18px;
        border-radius: 12px;
      }
      h1 {
        font-size: 26px;
      }
      .nav-actions {
        display: none;
      }
    }

    /* Interactive Poster & Pan-Zoom Lightbox */
    .poster-interactive-container {
      position: relative;
      cursor: zoom-in;
      overflow: hidden;
      background: #080c14;
    }
    .poster-interactive-container:hover .poster-zoom-hint {
      opacity: 1;
      transform: translateY(0);
    }
    .poster-zoom-hint {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: rgba(14, 19, 31, 0.9);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 242, 254, 0.4);
      color: var(--accent-cyan);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 11.5px;
      font-weight: 700;
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0.9;
      transform: translateY(0);
      transition: all 0.25s ease;
      box-shadow: 0 4px 16px rgba(0,0,0,0.5);
    }
    .poster-btn {
      background: rgba(0, 242, 254, 0.1);
      border: 1px solid rgba(0, 242, 254, 0.35);
      color: var(--accent-cyan);
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .poster-btn:hover {
      background: rgba(0, 242, 254, 0.2);
      border-color: var(--accent-cyan);
      transform: translateY(-1px);
    }
    .poster-zoom-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999999;
      background: rgba(5, 7, 12, 0.97);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      flex-direction: column;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .poster-zoom-modal.active {
      display: flex;
      opacity: 1;
    }
    .zoom-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      border-bottom: 1px solid var(--border-color);
      background: rgba(14, 19, 31, 0.95);
      z-index: 10;
      gap: 12px;
      flex-wrap: wrap;
    }
    .zoom-ctrl-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #f3f4f6;
      border-radius: 6px;
      cursor: pointer;
      font-family: inherit;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    .zoom-ctrl-btn:hover {
      background: rgba(255, 255, 255, 0.18);
      border-color: rgba(255, 255, 255, 0.35);
      color: #fff;
    }
    .zoom-stage-viewport {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
    }
    .zoom-stage-viewport:active {
      cursor: grabbing;
    }
    .zoom-stage-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 1200px;
      height: 800px;
      transform-origin: 0 0;
      will-change: transform;
      pointer-events: none;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  </style>
</head>
<body>

  <!-- Top Sticky Navigation -->
  <nav class="top-nav">
    <div class="top-nav-inner">
      <a href="../index.html" class="nav-brand">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21L14.907 18M21 3L13.882 10.118M3 21L10.118 13.882M10.118 10.118L13.882 13.882M10.118 10.118L3 3M13.882 10.118L21 21" />
        </svg>
        <span>OmniTool Hub</span>
      </a>
      <div class="nav-actions">
        <a href="index.html" class="nav-link-btn">📚 All Guides</a>
        <a href="../index.html#dashboard" class="nav-link-btn">🏠 Suite Dashboard</a>
        <a href="${tool.ctaHref}" class="nav-launch-btn">🚀 ${escapeHtml(tool.ctaLabel)}</a>
      </div>
    </div>
  </nav>

  <!-- Breadcrumbs -->
  <div class="breadcrumbs-wrap">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="../index.html">🏠 Home</a>
      <span>/</span>
      <a href="index.html">Guides Hub</a>
      <span>/</span>
      <span class="current">${escapeHtml(tool.h1.replace(/ Guide$/i, ''))}</span>
    </nav>
  </div>

  <main class="container">
    <header>
      <div class="category-pill">${tool.categoryPill}</div>
      <h1>${escapeHtml(tool.h1)}</h1>
      <div class="meta">
        <span class="meta-tag">📅 Updated Nov 2026</span>
        <span class="meta-tag">🔒 100% Offline-Safe</span>
        <span class="meta-tag">🛠️ ${escapeHtml(tool.tag)}</span>
        <span class="meta-tag">⚡ Zero Server Uploads</span>
      </div>
    </header>

    <!-- LIVE INTERACTIVE EMBEDDED TOOL WORKSPACE -->
    <section class="live-tool-embed-card">
      <div class="live-tool-embed-header">
        <div class="live-status-indicator">
          <span class="pulse-dot"></span>
          <span><strong>Live In-Browser Tool</strong> — 100% Private, Zero Server Uploads</span>
        </div>
        <div class="live-tool-quick-links">
          <a href="#guide-article" class="skip-to-guide-link" title="Jump straight to comprehensive written guide">📖 Skip to Guide &darr;</a>
          <button type="button" class="toggle-tool-collapse-btn" id="toggle-tool-collapse-btn" title="Toggle Live Tool Viewport" aria-expanded="true">
            <span class="toggle-icon">▾</span> <span class="toggle-text">Collapse Tool</span>
          </button>
          <a href="${tool.ctaHref}" class="live-fullscreen-link">🚀 Open Fullscreen in Main Suite</a>
        </div>
      </div>
      <div id="live-guide-tool-viewport" class="live-guide-tool-viewport">
        <div class="guide-tool-loading">
          <div class="guide-tool-spinner"></div>
          <span>Loading ${escapeHtml(tool.h1.replace(/ Guide$/i, ''))}...</span>
        </div>
      </div>
    </section>

    <article id="guide-article">
      <p>
        ${tool.leadParagraph}
      </p>

      <!-- Dedicated Technical Reference Poster & Cheat Sheet (With Pan & Zoom) -->
      <figure class="guide-diagram-figure" style="margin: 32px 0 36px 0; border-radius: 14px; overflow: hidden; border: 1px solid var(--border-color); background: rgba(10, 14, 23, 0.85); box-shadow: 0 14px 36px rgba(0, 0, 0, 0.5);">
        <div class="poster-interactive-container" title="Click to Open Interactive Pan & Zoom Viewer">
          <img src="${tool.diagramSrc}" 
               alt="${escapeHtml(tool.diagramAlt)}" 
               width="1200" 
               height="800" 
               loading="lazy" 
               decoding="async" 
               style="width: 100%; height: auto; display: block; max-width: 100%;">
          <div class="poster-zoom-hint">
            <span>🔍</span> Click to Pan &amp; Zoom
          </div>
        </div>
        <figcaption style="padding: 12px 20px; font-size: 13px; color: var(--text-muted); border-top: 1px solid var(--border-color); background: rgba(14, 19, 31, 0.95); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <span>⚡ <strong>Quick Reference:</strong> ${escapeHtml(tool.diagramCaption)}</span>
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <button type="button" class="poster-btn poster-open-zoom-btn">🔍 Interactive Zoom &amp; Pan</button>
            <a href="${tool.diagramSrc}" download target="_blank" rel="noopener noreferrer" class="poster-btn" style="color: var(--accent-cyan); text-decoration: none;">⬇️ Download Poster</a>
          </div>
        </figcaption>
      </figure>

      <h2>${escapeHtml(tool.tabsTitle)}</h2>
      <p>
        Here is a detailed breakdown of the capabilities, algorithms, and configurations available within this tool suite:
      </p>

      ${tool.tabs.map(tab => `
      <div class="tab-section">
        <div class="tab-title">
          <span>${escapeHtml(tab.title)}</span>
          <span class="tab-badge">${escapeHtml(tab.badge)}</span>
        </div>
        <p>
          ${escapeHtml(tab.desc)}
        </p>
      </div>
      `).join('')}

      <div class="info-box">
        <strong>💡 Pro-Tip on Security & Utility:</strong>
        ${escapeHtml(tool.proTip)}
      </div>

      <h2>Step-by-Step Usage Guide</h2>
      <ol>
        ${tool.steps.map(step => `<li>${step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join('')}
      </ol>

      <h2>Frequently Asked Questions (FAQ)</h2>
      <div class="faq-accordion" style="margin-top: 16px;">
        ${tool.faqs.map(faq => `
        <div class="faq-item" style="margin-bottom: 16px; border: 1px solid var(--border-color); border-radius: 10px; padding: 18px 20px; background: rgba(255, 255, 255, 0.02);">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--accent-cyan); margin-bottom: 8px;">${escapeHtml(faq.q)}</h3>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6; margin: 0;">${escapeHtml(faq.a)}</p>
        </div>
        `).join('')}
      </div>
    </article>

    <!-- Call to Action Banner -->
    <div class="cta-container">
      <h3 style="font-size: 20px; font-weight: 800; margin-bottom: 8px;">Try this tool right now in your browser</h3>
      <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 20px;">Zero server uploads. 100% private, instant execution.</p>
      <a href="${tool.ctaHref}" class="cta-btn">🚀 ${escapeHtml(tool.ctaLabel)}</a>
      <br>
      <a href="index.html" class="all-guides-cta">📚 Browse All Guides Hub &rarr;</a>
    </div>

    <!-- Related Guides & Internal Links -->
    <section class="related-section">
      <div class="related-heading">
        <span>Explore Related Guides</span>
        <a href="index.html">View All Guides &rarr;</a>
      </div>
      <div class="related-grid">
        ${tool.related.map(rel => `
          <a href="${rel.href}" class="related-card">
            <div>
              <div class="related-badge">${rel.icon} ${escapeHtml(rel.badge)}</div>
              <div class="related-title">${escapeHtml(rel.title)}</div>
            </div>
            <div class="related-read">Read Guide &rarr;</div>
          </a>
        `).join('')}
      </div>
    </section>
  </main>

  <footer class="guide-footer">
    <p>&copy; 2026 OmniTool Hub. All operations run 100% locally in your browser.</p>
    <p style="margin-top: 8px;">
      <a href="../index.html">Home</a> &bull;
      <a href="index.html">Guides Hub</a> &bull;
      <a href="../index.html#privacy">Privacy Policy</a> &bull;
      <a href="../index.html#terms">Terms of Service</a> &bull;
      <a href="../index.html#refund">Refund Policy</a> &bull;
      <a href="../index.html#cookies">Cookie Policy</a> &bull;
      <a href="https://github.com/Ravik0892/Tools" target="_blank" rel="noopener">GitHub</a>
    </p>
  </footer>

  <!-- Fullscreen Interactive Pan & Zoom Modal -->
  <div id="poster-zoom-modal" class="poster-zoom-modal" role="dialog" aria-modal="true" aria-label="Interactive Poster Viewer">
    <div class="zoom-modal-header">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 13.5px; font-weight: 700; color: #f3f4f6;">${escapeHtml(tool.h1.replace(/ Guide$/i, ''))} &bull; Interactive Cheat Sheet</span>
        <span style="font-size: 11px; color: #9ca3af; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.1); padding: 3px 8px; border-radius: 4px;">🖱️ Mouse Wheel to Zoom &bull; Drag to Pan &bull; Double-click to Reset</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <button id="zoom-out-btn" class="zoom-ctrl-btn" title="Zoom Out (-)" style="width: 34px; height: 34px; font-size: 18px;">&minus;</button>
        <span id="zoom-level-badge" style="font-size: 12px; font-weight: 700; color: #00f2fe; min-width: 48px; text-align: center; font-family: monospace;">100%</span>
        <button id="zoom-in-btn" class="zoom-ctrl-btn" title="Zoom In (+)" style="width: 34px; height: 34px; font-size: 18px;">&#43;</button>
        <button id="zoom-reset-btn" class="zoom-ctrl-btn" title="Reset View" style="padding: 0 10px; height: 34px; font-size: 12px;">↺ Reset</button>
        <a href="${tool.diagramSrc}" download class="zoom-ctrl-btn" style="padding: 0 12px; height: 34px; font-size: 12px; text-decoration: none; color: #00f2fe; background: rgba(0, 242, 254, 0.12); border-color: rgba(0, 242, 254, 0.3);">⬇️ Save</a>
        <button id="zoom-close-btn" class="zoom-ctrl-btn" title="Close (Esc)" style="width: 34px; height: 34px; font-size: 20px; color: #f87171; background: rgba(239, 68, 68, 0.12); border-color: rgba(239, 68, 68, 0.3); margin-left: 6px;">&times;</button>
      </div>
    </div>
    <div id="zoom-stage-viewport" class="zoom-stage-viewport">
      <img id="zoom-stage-img" class="zoom-stage-img" src="${tool.diagramSrc}" width="1200" height="800" alt="${escapeHtml(tool.diagramAlt)}">
    </div>
  </div>

  <!-- Client-side adapter & dynamic tool mounter -->
  <script type="module">
    const guideApp = {
      activeSubtab: null,
      showToast(msg, type = 'info') {
        let t = document.getElementById('guide-toast');
        if (!t) {
          t = document.createElement('div');
          t.id = 'guide-toast';
          t.className = 'guide-toast';
          document.body.appendChild(t);
        }
        t.innerText = msg;
        t.className = 'guide-toast show ' + type;
        setTimeout(() => { if (t) t.className = 'guide-toast'; }, 3200);
      },
      async copyText(text) {
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          this.showToast('Copied to clipboard!', 'success');
        } catch {
          this.showToast('Failed to copy', 'error');
        }
      },
      playSynthSound() {},
      getConfigValue(k, d) { return localStorage.getItem(k) || d; },
      navigateToTool(id) { window.location.href = '../index.html#tool/' + id; }
    };

    const targetModule = '${tool.targetModule}';
    try {
      const module = await import('../tools/' + targetModule);
      const toolInstance = module.default;
      const viewport = document.getElementById('live-guide-tool-viewport');
      if (toolInstance && typeof toolInstance.renderUI === 'function' && viewport) {
        viewport.innerHTML = toolInstance.renderUI();
        if (typeof toolInstance.init === 'function') {
          await toolInstance.init(viewport, guideApp);
        }
      }
    } catch (err) {
      console.warn('[OmniTool Guide] Live tool initialization notice:', err);
      const viewport = document.getElementById('live-guide-tool-viewport');
      if (viewport) {
        viewport.innerHTML = \`
          <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 14px;">
            <p style="margin-bottom: 12px;">This tool is ready to use in the full application workspace.</p>
            <a href="${tool.ctaHref}" class="cta-btn" style="display: inline-block;">🚀 Launch Tool in Main Suite</a>
          </div>
        \`;
      }
    }
  </script>

  <!-- Live Tool Viewport Collapse / Expand Handler -->
  <script>
    (function initLiveToolCollapse() {
      const toggleBtn = document.getElementById('toggle-tool-collapse-btn');
      const viewport = document.getElementById('live-guide-tool-viewport');
      if (!toggleBtn || !viewport) return;
      toggleBtn.addEventListener('click', () => {
        const isCollapsed = viewport.style.display === 'none';
        viewport.style.display = isCollapsed ? 'block' : 'none';
        toggleBtn.classList.toggle('is-collapsed', !isCollapsed);
        toggleBtn.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
        const label = toggleBtn.querySelector('.toggle-text');
        if (label) label.textContent = isCollapsed ? 'Collapse Tool' : 'Expand Tool';
      });
    })();
  </script>

  <!-- Interactive Pan & Zoom Script -->
  <script>
    (function initPanZoomViewer() {
      const trigger = document.querySelector('.poster-interactive-container');
      const openBtn = document.querySelector('.poster-open-zoom-btn');
      const modal = document.getElementById('poster-zoom-modal');
      if (!trigger || !modal) return;

      const viewport = document.getElementById('zoom-stage-viewport');
      const img = document.getElementById('zoom-stage-img');
      const badge = document.getElementById('zoom-level-badge');
      const btnIn = document.getElementById('zoom-in-btn');
      const btnOut = document.getElementById('zoom-out-btn');
      const btnReset = document.getElementById('zoom-reset-btn');
      const btnClose = document.getElementById('zoom-close-btn');

      let scale = 1;
      let posX = 0;
      let posY = 0;
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let naturalW = 1200;
      let naturalH = 800;

      function centerAndFit() {
        if (!viewport || !img) return;
        const vw = viewport.clientWidth || window.innerWidth;
        const vh = viewport.clientHeight || (window.innerHeight - 60);
        if (vw <= 0 || vh <= 0) return;
        const targetW = naturalW || 1200;
        const targetH = naturalH || 800;
        const fitScale = Math.min((vw * 0.92) / targetW, (vh * 0.92) / targetH, 1.25);
        scale = Math.max(fitScale, 0.2);
        posX = (vw - targetW * scale) / 2;
        posY = (vh - targetH * scale) / 2;
        applyTransform();
      }

      function applyTransform() {
        if (!img) return;
        img.style.transform = 'translate(' + posX + 'px, ' + posY + 'px) scale(' + scale + ')';
        if (badge) badge.innerText = Math.round(scale * 100) + '%';
      }

      function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        naturalW = img.naturalWidth || 1200;
        naturalH = img.naturalHeight || 800;
        requestAnimationFrame(function() {
          centerAndFit();
          setTimeout(centerAndFit, 60);
        });
      }

      function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        isDragging = false;
      }

      window.addEventListener('resize', function() {
        if (modal.classList.contains('active')) {
          centerAndFit();
        }
      });

      trigger.addEventListener('click', openModal);
      if (openBtn) openBtn.addEventListener('click', openModal);
      if (btnClose) btnClose.addEventListener('click', closeModal);

      // Keyboard Shortcuts
      window.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        else if (e.key === '+' || e.key === '=') zoomBy(1.2);
        else if (e.key === '-' || e.key === '_') zoomBy(0.8);
        else if (e.key === '0' || e.key === 'r') centerAndFit();
      });

      // Zooming
      function zoomBy(factor, clientX, clientY) {
        const newScale = Math.min(Math.max(scale * factor, 0.35), 6.0);
        const rect = viewport.getBoundingClientRect();
        const vw = viewport.clientWidth;
        const vh = viewport.clientHeight;
        const focalX = clientX !== undefined ? (clientX - rect.left) : (vw / 2);
        const focalY = clientY !== undefined ? (clientY - rect.top) : (vh / 2);

        posX = focalX - (focalX - posX) * (newScale / scale);
        posY = focalY - (focalY - posY) * (newScale / scale);
        scale = newScale;
        applyTransform();
      }

      if (btnIn) btnIn.addEventListener('click', function() { zoomBy(1.25); });
      if (btnOut) btnOut.addEventListener('click', function() { zoomBy(0.8); });
      if (btnReset) btnReset.addEventListener('click', centerAndFit);

      // Wheel Zoom
      viewport.addEventListener('wheel', function(e) {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.15 : 0.85;
        zoomBy(factor, e.clientX, e.clientY);
      }, { passive: false });

      // Mouse Dragging (pan)
      viewport.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        isDragging = true;
        startX = e.clientX - posX;
        startY = e.clientY - posY;
        viewport.style.cursor = 'grabbing';
      });

      window.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        posX = e.clientX - startX;
        posY = e.clientY - startY;
        applyTransform();
      });

      window.addEventListener('mouseup', function() {
        if (isDragging) {
          isDragging = false;
          viewport.style.cursor = 'grab';
        }
      });

      // Double Click to toggle between fit and 2.0x detail zoom
      viewport.addEventListener('dblclick', function(e) {
        if (scale > 1.3) {
          centerAndFit();
        } else {
          zoomBy(2.2, e.clientX, e.clientY);
        }
      });

      // Touch Support
      let touchStartDist = 0;
      let touchStartScale = 1;
      viewport.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
          isDragging = true;
          startX = e.touches[0].clientX - posX;
          startY = e.touches[0].clientY - posY;
        } else if (e.touches.length === 2) {
          isDragging = false;
          touchStartDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          touchStartScale = scale;
        }
      }, { passive: true });

      viewport.addEventListener('touchmove', function(e) {
        if (e.touches.length === 1 && isDragging) {
          posX = e.touches[0].clientX - startX;
          posY = e.touches[0].clientY - startY;
          applyTransform();
        } else if (e.touches.length === 2 && touchStartDist > 0) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          const factor = dist / touchStartDist;
          const newScale = Math.min(Math.max(touchStartScale * factor, 0.35), 6.0);
          const rect = viewport.getBoundingClientRect();
          const focalX = midX - rect.left;
          const focalY = midY - rect.top;
          posX = focalX - (focalX - posX) * (newScale / scale);
          posY = focalY - (focalY - posY) * (newScale / scale);
          scale = newScale;
          applyTransform();
        }
      }, { passive: true });

      viewport.addEventListener('touchend', function() {
        isDragging = false;
        touchStartDist = 0;
      }, { passive: true });
    })();
  </script>

  <!-- Cloudflare Web Analytics -->
  <script>
    if (window.location.protocol.startsWith('http') && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      const cfScript = document.createElement('script');
      cfScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      cfScript.setAttribute('data-cf-beacon', '{"token": "04e4415908c74ea3b38523f900e7a225"}');
      cfScript.defer = true;
      document.body.appendChild(cfScript);
    }
  </script>
</body>
</html>`;
}

// 1. Generate the 2 canonical guides
const guidesDir = path.join(root, 'guides');
const androidGuidesDir = path.join(root, 'omnitool-android-app', 'app', 'src', 'main', 'assets', 'web', 'guides');

for (const cfg of toolConfigs) {
  const html = generateCanonicalGuideHtml(cfg);
  fs.writeFileSync(path.join(guidesDir, cfg.fileName), html, 'utf8');
  if (fs.existsSync(androidGuidesDir)) {
    fs.writeFileSync(path.join(androidGuidesDir, cfg.fileName), html, 'utf8');
  }
  console.log(`[PASS] Generated canonical guide: guides/${cfg.fileName}`);
}

// 2. Restore guides/index.html from 760a293
console.log('Restoring 92 guides baseline from commit 760a293...');
let indexContent = execSync('git show 760a293:guides/index.html', { maxBuffer: 15 * 1024 * 1024 }).toString('utf8');

// Update total count mentions from 92/90+ to 94+
indexContent = indexContent
  .replace(/92 In-Browser Guides/g, '94 In-Browser Guides')
  .replace(/90\+ In-Browser Guides/g, '94 In-Browser Guides')
  .replace(/92 Guides/g, '94 Guides')
  .replace(/"numberOfItems": 92/g, '"numberOfItems": 94');

// Insert new schema items before closing itemListElement
const schemaInsertion = `          {
            "@type": "ListItem",
            "position": 93,
            "name": "Fancy Font & Bio Text Generator Guide",
            "url": "https://omnitool.worldsneed.com/guides/fancy-font-generator"
          },
          {
            "@type": "ListItem",
            "position": 94,
            "name": "Financial Growth & Loan Calculator Suite Guide",
            "url": "https://omnitool.worldsneed.com/guides/finance-calculator"
          }
        ];`;

// Check where itemListElement ends
if (indexContent.includes('"url": "https://omnitool.worldsneed.com/guides/payment-guide"\n          }')) {
  // Let's insert cleanly after the last item
}

// Let's also insert the two new guide cards into the Primary Suites grid in indexContent
const newCardsHtml = `
      <article class="guide-card" 
        data-category="text" 
        data-title="fancy font & aesthetic text studio guide" 
        data-tag="unicode typography" 
        data-desc="convert text into 60+ stylish unicode fonts, gothic fraktur, cursive calligraphy, small caps, and glitch text for instagram bios, tiktok captions, and discord names.">
        <div class="card-top">
          <div class="card-meta-bar">
            <div class="card-category">
              <span>✨</span>
              <span>Text &amp; Writing</span>
            </div>
            <span class="card-badge">Unicode Typography</span>
          </div>
          <h2 class="card-title">
            <a href="fancy-font-generator.html">Fancy Font &amp; Bio Text Generator</a>
          </h2>
          <p class="card-desc">Convert text into 60+ stylish Unicode fonts, Gothic Fraktur, cursive calligraphy, small caps, and bio layouts for Instagram, TikTok, and Discord.</p>
          <div class="card-features">
            <span class="card-feature-pill">60+ Fonts</span><span class="card-feature-pill">Cursive</span><span class="card-feature-pill">Gothic</span><span class="card-feature-pill">Bio Studio</span>
          </div>
        </div>
        <div class="card-footer-actions">
          <a href="fancy-font-generator.html" class="read-guide-btn">
            <span>📖 Read Guide</span>
          </a>
          <a href="/tool/fancy-font-generator" class="launch-tool-icon-btn" title="Launch Fancy Font &amp; Bio Text Generator">
            <span>🚀 Run Tool</span>
          </a>
        </div>
      </article>

      <article class="guide-card" 
        data-category="math" 
        data-title="financial growth & loan calculator suite guide" 
        data-tag="financial math" 
        data-desc="master wealth compounding with client-side sip wealth accumulation, compound interest apy calculators, and reducing balance loan emi amortization schedules.">
        <div class="card-top">
          <div class="card-meta-bar">
            <div class="card-category">
              <span>💰</span>
              <span>Math &amp; Time</span>
            </div>
            <span class="card-badge">Financial Math</span>
          </div>
          <h2 class="card-title">
            <a href="finance-calculator.html">Financial Growth &amp; Loan Calculator Suite</a>
          </h2>
          <p class="card-desc">Master wealth compounding with client-side SIP wealth accumulation, compound interest APY calculators, and reducing balance loan EMI amortization schedules.</p>
          <div class="card-features">
            <span class="card-feature-pill">SIP Planner</span><span class="card-feature-pill">Compound APY</span><span class="card-feature-pill">Loan EMI</span><span class="card-feature-pill">Amortization</span>
          </div>
        </div>
        <div class="card-footer-actions">
          <a href="finance-calculator.html" class="read-guide-btn">
            <span>📖 Read Guide</span>
          </a>
          <a href="/tool/finance-calculator" class="launch-tool-icon-btn" title="Launch Financial Growth &amp; Loan Calculator Suite">
            <span>🚀 Run Tool</span>
          </a>
        </div>
      </article>
`;

// Insert the cards into the main guides-grid right before the #no-results message
const noResultsMarker = '<div class="no-results-msg" id="no-results">';
if (indexContent.includes(noResultsMarker)) {
  indexContent = indexContent.replace(noResultsMarker, newCardsHtml + '\n      ' + noResultsMarker);
  console.log('[PASS] Added 2 new guide cards to guides/index.html before #no-results');
} else {
  console.warn('[WARN] Could not find #no-results marker in indexContent');
}

// Add the two schema items into the Schema ItemList
const schemaTarget = `          {
            "@type": "ListItem",
            "position": 92,`;

if (indexContent.includes(schemaTarget)) {
  // Let's find the end of item 92
  const item92End = indexContent.indexOf('}', indexContent.indexOf(schemaTarget)) + 1;
  const addition = `,\n          {\n            "@type": "ListItem",\n            "position": 93,\n            "name": "Fancy Font & Bio Text Generator Guide",\n            "url": "https://omnitool.worldsneed.com/guides/fancy-font-generator"\n          },\n          {\n            "@type": "ListItem",\n            "position": 94,\n            "name": "Financial Growth & Loan Calculator Suite Guide",\n            "url": "https://omnitool.worldsneed.com/guides/finance-calculator"\n          }`;
  indexContent = indexContent.slice(0, item92End) + addition + indexContent.slice(item92End);
  console.log('[PASS] Added 2 new schema items to guides/index.html (total 94 items)');
}

fs.writeFileSync(path.join(guidesDir, 'index.html'), indexContent, 'utf8');
if (fs.existsSync(androidGuidesDir)) {
  fs.writeFileSync(path.join(androidGuidesDir, 'index.html'), indexContent, 'utf8');
}
console.log('[PASS] guides/index.html successfully updated with 94 guides and mirrored to Android!');
