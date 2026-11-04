import fs from 'fs';

const files = fs.readdirSync('tools').filter(f => f.endsWith('.js'));

function checkPdfToImage() {
  const c = fs.readFileSync('tools/pdf-utilities.js', 'utf8');
  return {
    hasPdfToImage: c.includes('pdf-to-image') || c.includes('renderPage') || c.includes('toDataURL'),
    occurrences: [...c.matchAll(/pdf[- ]to[- ]image/gi)].map(m => m[0])
  };
}

function checkBarcodeGen() {
  const c = fs.readFileSync('tools/qr-generator.js', 'utf8');
  const has1DBarcode = c.includes('JsBarcode') || c.includes('Code128') || c.includes('EAN') || c.includes('UPC');
  return { has1DBarcode, snippet: c.slice(0, 300) };
}

function checkNumberBase() {
  for (const f of files) {
    const c = fs.readFileSync('tools/' + f, 'utf8');
    if ((c.includes('hexadecimal') || c.includes('binary')) && c.includes('octal') && c.includes('decimal')) {
      return { file: f, match: true };
    }
  }
  return { match: false };
}

function checkAsciiArt() {
  for (const f of files) {
    const c = fs.readFileSync('tools/' + f, 'utf8');
    if (c.toLowerCase().includes('ascii art') || c.includes('figlet')) {
      return { file: f, match: true };
    }
  }
  return { match: false };
}

function checkHtmlEntity() {
  for (const f of files) {
    const c = fs.readFileSync('tools/' + f, 'utf8');
    if (c.toLowerCase().includes('html entity') || c.includes('&quot;') || c.includes('&#') || (c.includes('&amp;') && c.includes('entity'))) {
      return { file: f, match: true };
    }
  }
  return { match: false };
}

function checkSvgOptimizer() {
  for (const f of files) {
    const c = fs.readFileSync('tools/' + f, 'utf8');
    if (c.toLowerCase().includes('svg optimizer') || c.toLowerCase().includes('svgo') || (c.includes('svg') && c.includes('optimize'))) {
      return { file: f, match: true };
    }
  }
  return { match: false };
}

function checkXmlFormatter() {
  for (const f of files) {
    const c = fs.readFileSync('tools/' + f, 'utf8');
    if (c.toLowerCase().includes('xml formatter') || (c.toLowerCase().includes('xml') && c.toLowerCase().includes('pretty'))) {
      return { file: f, match: true };
    }
  }
  return { match: false };
}

function checkJsCssMinifier() {
  for (const f of files) {
    const c = fs.readFileSync('tools/' + f, 'utf8');
    if (c.toLowerCase().includes('minifier') || (c.toLowerCase().includes('minify') && c.includes('javascript') && c.includes('css'))) {
      return { file: f, match: true };
    }
  }
  return { match: false };
}

function checkTimezone() {
  const c = fs.readFileSync('tools/datetime-suite.js', 'utf8');
  return {
    hasTimezone: c.toLowerCase().includes('timezone'),
    hasWorldClock: c.toLowerCase().includes('world clock') || c.toLowerCase().includes('cities'),
    subtools: [...c.matchAll(/id:\s*["']([^"']+)["']/g)].map(m => m[1])
  };
}

function checkPomodoro() {
  for (const f of files) {
    const c = fs.readFileSync('tools/' + f, 'utf8');
    if (c.toLowerCase().includes('pomodoro')) {
      return { file: f, match: true };
    }
  }
  return { match: false };
}

console.log('PDF to Image in pdf-utilities:', checkPdfToImage());
console.log('Barcode Gen in qr-generator:', checkBarcodeGen());
console.log('Number Base in tools:', checkNumberBase());
console.log('ASCII Art in tools:', checkAsciiArt());
console.log('HTML Entity in tools:', checkHtmlEntity());
console.log('SVG Optimizer in tools:', checkSvgOptimizer());
console.log('XML Formatter in tools:', checkXmlFormatter());
console.log('JS/CSS Minifier in tools:', checkJsCssMinifier());
console.log('Timezone in datetime-suite:', checkTimezone());
console.log('Pomodoro in tools:', checkPomodoro());
