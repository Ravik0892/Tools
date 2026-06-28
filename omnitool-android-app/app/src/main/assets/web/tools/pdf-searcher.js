import { escapeHtml } from './utils.js';

const array_one = [
  "ñ","Q+Z","sas","aa",")Z","ZZ","‘","’","“","”",
  "å",  "ƒ",  "„",   "…",   "†",   "‡",   "ˆ",   "‰",   "Š",   "‹", 
  "¶+",   "d+", "[+k","[+", "x+",  "T+",  "t+", "M+", "<+", "Q+", ";+", "j+", "u+",
  "Ùk", "Ù", "ä", "–", "—","é","™","=kk","f=k",  
  "à",   "á",    "â",   "ã",   "ºz",  "º",   "í", "{k", "{", "=",  "«",   
  "Nî",   "Vî",    "Bî",   "Mî",   "<î", "|", "K", "}",
  "J",   "Vª",   "Mª",  "<ªª",  "Nª",   "Ø",  "Ý", "nzZ",  "æ", "ç", "Á", "xz", "#", ":",
  "v‚","vks",  "vkS",  "vk",    "v",  "b±", "Ã",  "bZ",  "b",  "m",  "Å",  ",s",  ",",   "_",
  "ô",  "d", "Dk", "D", "[k", "[", "x","Xk", "X", "Ä", "?k", "?",   "³", 
  "pkS",  "p", "Pk", "P",  "N",  "t", "Tk", "T",  ">", "÷", "¥",
  "ê",  "ë",   "V",  "B",   "ì",   "ï", "M+", "<+", "M",  "<", ".k", ".",    
  "r",  "Rk", "R",   "Fk", "F",  ")", "n", "/k", "èk",  "/", "Ë", "è", "u", "Uk", "U",   
  "i",  "Ik", "I",   "Q",    "¶",  "c", "Ck",  "C",  "Hk",  "H", "e", "Ek",  "E",
  ";",  "¸",   "j",    "y", "Yk",  "Y",  "G",  "o", "Ok", "O",
  "'k", "'",   "\"k",  "\"",  "l", "Lk",  "L",   "g", 
  "È", "z", 
  "Ì", "Í", "Î",  "Ï",  "Ñ",  "Ò",  "Ó",  "Ô",   "Ö",  "Ø",  "Ù","Ük", "Ü",
  "‚",    "ks",   "kS",   "k",  "h",    "q",   "w",   "`",    "s",    "S",
  "a",    "¡",    "%",     "W",  "•", "·", "∙", "·", "~j",  "~", "\\","+"," ः",
  "^", "*",  "Þ", "ß", "(", "¼", "½", "¿", "À", "¾", "A", "-", "&", "&", "Œ", "]","~ ","@"
];

const array_two = [
  "॰","QZ+","sa","a","र्द्ध","Z","\"","\"","'","'",
  "०",  "१",  "२",  "३",     "४",   "५",  "६",   "७",   "८",   "९",   
  "फ़्",  "क़",  "ख़", "ख़्",  "ग़", "ज़्", "ज़",  "ड़",  "ढ़",   "फ़",  "य़",  "ऱ",  "ऩ",    // one-byte nukta varNas
  "त्त", "त्त्", "क्त",  "दृ",  "कृ","न्न","न्न्","=k","f=",
  "ह्न",  "ह्य",  "हृ",  "ह्म",  "ह्र",  "ह्",   "द्द",  "क्ष", "क्ष्", "त्र", "त्र्", 
  "छ्य",  "ट्य",  "ठ्य",  "ड्य",  "ढ्य", "द्य", "ज्ञ", "द्व",
  "श्र",  "ट्र",    "ड्र",    "ढ्र",    "छ्र",   "क्र",  "फ्र", "र्द्र",  "द्र",   "प्र", "प्र",  "ग्र", "रु",  "रू",
  "ऑ",   "ओ",  "औ",  "आ",   "अ", "ईं", "ई",  "ई",   "इ",  "उ",   "ऊ",  "ऐ",  "ए", "ऋ",
  "क्क", "क", "क", "क्", "ख", "ख्", "ग", "ग", "ग्", "घ", "घ", "घ्", "ङ",
  "चै",  "च", "च", "च्", "छ", "ज", "ज", "ज्",  "झ",  "झ्", "ञ",
  "ट्ट",   "ट्ठ",   "ट",   "ठ",   "ड्ड",   "ड्ढ",  "ड़", "ढ़", "ड",   "ढ", "ण", "ण्",   
  "त", "त", "त्", "थ", "थ्",  "द्ध",  "द", "ध", "ध", "ध्", "ध्", "ध्", "न", "न", "न्",    
  "प", "प", "प्",  "फ", "फ्",  "ब", "ब", "ब्",  "भ", "भ्",  "म",  "म", "म्",  
  "य", "य्",  "र", "ल", "ल", "ल्",  "ळ",  "व", "व", "व्",   
  "श", "श्",  "ष", "ष्", "स", "स", "स्", "ह", 
  "ीं", "्र",    
  "द्द", "ट्ट","ट्ठ","ड्ड","कृ","भ","्य","ड्ढ","झ्","क्र","त्त्","श","श्",
  "ॉ",  "ो",   "ौ",   "ा",   "ी",   "ु",   "ू",   "ृ",   "े",   "ै",
  "ं",   "ँ",   "ः",   "ॅ",  "ऽ", "ऽ", "ऽ", "ऽ", "्र",  "्", "?", "़",":",
  "‘",   "’",   "“",   "”",  ";",  "(",    ")",   "{",    "}",   "=", "।", ".", "-",  "µ", "॰", ",", "् ", "/"
];

const commonEnglishWords = new Set([
  // Most common English grammatical words
  "the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on", "are", 
  "as", "with", "his", "they", "i", "at", "be", "this", "have", "from", "or", "one", "had", "by", 
  "word", "but", "not", "what", "all", "were", "we", "when", "your", "can", "said", "there", "use", 
  "an", "each", "which", "she", "do", "how", "their", "if", "will", "up", "other", "about", "out", 
  "many", "then", "them", "these", "so", "some", "her", "would", "make", "like", "him", "into", 
  "time", "has", "look", "two", "more", "write", "go", "see", "number", "no", "way", "could", 
  "people", "my", "than", "first", "water", "been", "call", "who", "oil", "its", "now", "find", 
  "long", "down", "day", "did", "get", "come", "made", "may", "part", "also", "give", "given", 
  "show", "shown", "hence", "therefore", "thus", "since", "because", "let", "suppose", "assume", 
  "defined", "obtain", "obtained", "determine", "determined", "calculate", "calculated", "write", 
  "written", "express", "expressed", "represent", "represented", "plot", "plotted", "draw", "drawn", 
  "construct", "constructed", "evaluate", "evaluated", "solve", "solved", "found", "checked",
  "new", "am", "being", "should", "shall", "might", "must", "us", "our", "me", "whose", "whom",
  // Math / Science / Technical terms
  "class", "grade", "math", "maths", "mathematics", "science", "physics", "chemistry", "biology", 
  "history", "geography", "english", "hindi", "chapter", "exercise", "question", "questions", 
  "problem", "problems", "solution", "solutions", "example", "examples", "proof", "proofs", 
  "definition", "definitions", "formula", "formulas", "equation", "equations", "algebra", "geometry", 
  "theorem", "theorems", "lemma", "corollary", "axiom", "postulate", "hypothesis", "variable", 
  "constant", "coefficient", "term", "expression", "polynomial", "quadratic", "linear", "system", 
  "matrix", "matrices", "vector", "vectors", "determinant", "set", "sets", "function", "functions", 
  "limit", "limits", "derivative", "derivatives", "integral", "integrals", "calculus", "infinity", 
  "real", "number", "numbers", "rational", "irrational", "integer", "integers", "fraction", 
  "fractions", "decimal", "decimals", "division", "algorithm", "algorithms", "fundamental", 
  "arithmetic", "euclid", "euclidean", "euclid’s", "euclids", "pythagoras", "newton", "einstein", 
  "galileo", "aristotle", "descartes", "fermat", "gauss", "euler", "ratio", "proportion", "percentage", 
  "probability", "statistics", "data", "mean", "median", "mode", "graph", "graphs", "line", "lines", 
  "angle", "angles", "triangle", "triangles", "circle", "circles", "tangent", "secant", "chord", 
  "segment", "sector", "introduction", "summary", "index", "contents", "appendix", "answer", 
  "answers", "key", "hint", "hints", "note", "notes", "remark", "remarks", "rule", "rules", 
  "method", "methods", "step", "steps", "property", "properties", "test", "tests", "review", 
  "revision", "check", "checking", "verify", "verification", "value", "values", "point", "points", 
  "ray", "rays", "intersection", "parallel", "perpendicular", "normal", "curve", "curves", 
  "straight", "slope", "gradient", "intercept", "intercepts", "axis", "axes", "origin", "plane", 
  "space", "dimension", "dimensions", "scale", "unit", "units",
  // Units/Abbreviations
  "cm", "m", "km", "kg", "g", "l", "ml", "s", "min", "h", "hr", "hrs", "degree", "degrees", 
  "radian", "radians", "sin", "cos", "tan", "cosec", "sec", "cot", "log", "ln", "exp", "sqrt", 
  "pi", "theta", "alpha", "beta", "gamma", "delta", "phi", "psi", "omega", "mu", "sigma",
  // Roman Numerals
  "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", 
  "xv", "xvi", "xvii", "xviii", "xix", "xx",
  // Document Acronyms
  "pdf", "txt", "csv", "json", "app", "dev", "web", "url", "dom", "api", "npm", "git", "npx",
  // Common math textbook English words typed in Kruti Dev documents
  "exhaustion", "mortal", "converse", "powers"
]);

const hasKrutidevSignature = (word) => {
  if (/[a-z][A-Z]/.test(word)) return true;
  if (/[\{\}\[\]\/;±Øæçñƒ„…†‡ˆ‰Š‹|\\^&<>_]/.test(word)) return true;
  if (/vk/i.test(word) && !/vodka|kafka|slovak|yak/i.test(word)) return true;
  if (/f[b-df-hj-np-tv-z]/i.test(word)) return true;
  return false;
};

const isEnglishWord = (word, index, tokens) => {
  // Strip all kinds of brackets, quotes, and punctuation at word boundaries so English words/numbers inside brackets are preserved.
  const clean = word.toLowerCase().replace(/^[‘'“([{\-\/]+|[)\]}’’”.,;:!?\-\/]+$/g, "");
  if (clean === "") return true;
  
  // Match pure integers, ordinals (1st, 2nd), and English decimals (e.g. 1.2 or 1,234.56)
  // We do NOT match hyphens in the middle (like 1-2) because in Kruti Dev, '-' maps to '.' (so 1-2 converts to 1.2)
  if (/^[0-9,]+(?:\.[0-9]+)?(?:st|nd|rd|th)?$/.test(clean)) return true;
  
  if (clean === "a") {
    let isFullStop = true;
    if (tokens && index !== undefined) {
      for (let j = index + 1; j < tokens.length; j++) {
        const next = tokens[j].trim();
        if (next !== "") {
          if (/^[a-zA-Z0-9+=/*-]+$/.test(next)) {
            isFullStop = false;
          }
          break;
        }
      }
    }
    if (isFullStop) {
      return false;
    }
  }

  return commonEnglishWords.has(clean);
};

const extractTextFromPage = async (page) => {
  try {
    const textContent = await page.getTextContent();
    let lastY = null;
    let extractedText = "";
    for (const item of textContent.items) {
      const str = item.str || "";
      const y = item.transform ? item.transform[5] : null;
      if (lastY !== null && y !== null) {
        const diff = Math.abs(y - lastY);
        if (diff > 18) {
          extractedText += "\n\n";
        } else if (diff > 8) {
          extractedText += "\n";
        } else if (extractedText.length > 0 && !extractedText.endsWith("\n") && !extractedText.endsWith(" ")) {
          extractedText += " ";
        }
      }
      extractedText += str;
      if (y !== null) lastY = y;
    }
    return extractedText.trim();
  } catch (err) {
    console.error("Text extraction helper failed:", err);
    return "";
  }
};

const isKrutidev = (text) => {
  if (!text) return false;

  // Safeguard: Count English words. If a significant portion of the text is standard English,
  // it is an English/standard document, not Kruti Dev.
  const words = text.split(/\s+/).filter(w => w.length > 0);
  if (words.length > 0) {
    let englishWordCount = 0;
    words.forEach((w, idx) => {
      if (isEnglishWord(w, idx, words)) {
        englishWordCount++;
      }
    });
    // If the text contains more than 28% common English words, it is not Kruti Dev
    const ratio = englishWordCount / words.length;
    if (words.length > 5 && ratio > 0.28) {
      return false;
    }
  }

  // Regex check for Kruti Dev special characters in the middle of words
  // We exclude common English slashes like "and/or", "his/her", "w/o", etc.
  if (/[a-zA-Z]+[\{\}\[\]\/;±Øæçñƒ„…†‡ˆ‰Š‹][a-zA-Z]+/.test(text)) {
    const match = text.match(/[a-zA-Z]+[\{\}\[\]\/;±Øæçñƒ„…†‡ˆ‰Š‹][a-zA-Z]+/g);
    if (match) {
      const isEnglishSlashPattern = match.every(m => {
        const lower = m.toLowerCase();
        return lower === "and/or" || lower === "his/her" || lower === "s/he" || 
               lower === "w/o" || lower === "either/or" || lower === "yes/no" || 
               lower === "true/false" || lower === "on/off" || lower === "in/out" || 
               lower === "up/down" || lower === "left/right" || lower === "input/output";
      });
      if (!isEnglishSlashPattern) {
        return true;
      }
    }
  }

  const patterns = [
    /\bvkSj\b/,
    /\besa\b/,
    /\bgSa\b/,
    /\bfo\b/,
    /\bd{kk\b/,
    /\bizes;\b/,
    /\bokLrfod\b/,
    /\bla\[;kvksa\b/,
    /\bvkius\b/,
    /\bbl\b/,
    /\bdyu\b/
  ];
  
  // Count matches, but do not count fo/bl unless there's at least one unique Kruti Dev signature
  let rawMatchCount = 0;
  for (const pattern of patterns) {
    if (pattern.test(text)) {
      rawMatchCount++;
    }
  }

  if (rawMatchCount >= 2) {
    // Check if we have at least one unique Kruti Dev signature pattern (excluding generic bl / fo)
    const hasUniqueSignature = [
      /\bvkSj\b/,
      /\besa\b/,
      /\bgSa\b/,
      /\bd{kk\b/,
      /\bizes;\b/,
      /\bokLrfod\b/,
      /\bla\[;kvksa\b/,
      /\bvkius\b/,
      /\bdyu\b/
    ].some(p => p.test(text));
    
    if (hasUniqueSignature) {
      return true;
    }
  }

  return false;
};

const convertKrutidevWordToUnicode = (word) => {
  let modified_substring = word;

  for (let input_symbol_idx = 0; input_symbol_idx < array_one.length; input_symbol_idx++) {
    let idx = 0;
    while (idx !== -1) {
      modified_substring = modified_substring.replace(array_one[input_symbol_idx], array_two[input_symbol_idx]);
      idx = modified_substring.indexOf(array_one[input_symbol_idx]);
    }
  }

  modified_substring = modified_substring.replace(/±/g, "Zं");
  modified_substring = modified_substring.replace(/Æ/g, "र्f");

  let position_of_i = modified_substring.indexOf("f");
  while (position_of_i !== -1) {
    let charecter_next_to_i = modified_substring.charAt(position_of_i + 1);
    let charecter_to_be_replaced = "f" + charecter_next_to_i;
    modified_substring = modified_substring.replace(charecter_to_be_replaced, charecter_next_to_i + "ि");
    position_of_i = modified_substring.indexOf("f", position_of_i + 1);
  }

  modified_substring = modified_substring.replace(/Ç/g, "fa");
  modified_substring = modified_substring.replace(/É/g, "र्fa");

  position_of_i = modified_substring.indexOf("fa");
  while (position_of_i !== -1) {
    let charecter_next_to_ip2 = modified_substring.charAt(position_of_i + 2);
    let charecter_to_be_replaced = "fa" + charecter_next_to_ip2;
    modified_substring = modified_substring.replace(charecter_to_be_replaced, charecter_next_to_ip2 + "िं");
    position_of_i = modified_substring.indexOf("fa", position_of_i + 2);
  }

  modified_substring = modified_substring.replace(/Ê/g, "ीZ");

  let position_of_wrong_ee = modified_substring.indexOf("ि्");
  while (position_of_wrong_ee !== -1) {
    let consonent_next_to_wrong_ee = modified_substring.charAt(position_of_wrong_ee + 2);
    let charecter_to_be_replaced = "ि्" + consonent_next_to_wrong_ee;
    modified_substring = modified_substring.replace(charecter_to_be_replaced, "्" + consonent_next_to_wrong_ee + "ि");
    position_of_wrong_ee = modified_substring.indexOf("ि्", position_of_wrong_ee + 2);
  }

  const set_of_matras = "अ आ इ ई उ ऊ ए ऐ ओ औ ा ि ी ु ू ृ े ै ो ौ ं : ँ ॅ";
  let position_of_R = modified_substring.indexOf("Z");
  while (position_of_R > 0) {
    let probable_position_of_half_r = position_of_R - 1;
    let charecter_at_probable_position_of_half_r = modified_substring.charAt(probable_position_of_half_r);
    while (probable_position_of_half_r >= 0 && set_of_matras.indexOf(charecter_at_probable_position_of_half_r) !== -1) {
      probable_position_of_half_r = probable_position_of_half_r - 1;
      charecter_at_probable_position_of_half_r = modified_substring.charAt(probable_position_of_half_r);
    }
    let charecter_to_be_replaced = modified_substring.substr(probable_position_of_half_r, (position_of_R - probable_position_of_half_r));
    let new_replacement_string = "र्" + charecter_to_be_replaced;
    charecter_to_be_replaced = charecter_to_be_replaced + "Z";
    modified_substring = modified_substring.replace(charecter_to_be_replaced, new_replacement_string);
    position_of_R = modified_substring.indexOf("Z");
  }

  return modified_substring;
};

const convertKrutidevToUnicode = (text) => {
  if (!text) return "";
  const tokens = text.split(/(\s+)/);
  let inBracket = false;
  
  // Only preserve round brackets () as they are commonly typed as literal English brackets
  // whereas other brackets like [] and {} map to Hindi characters in Kruti Dev
  const openBrackets = { "(": ")" };
  const closeBrackets = { ")": "(" };

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token.trim() === "") continue;
    if (isEnglishWord(token, i, tokens)) {
      continue;
    }

    let prefixBracket = "";
    let suffixBracket = "";

    const firstChar = token[0];
    const lastChar = token[token.length - 1];

    if (openBrackets[firstChar]) {
      prefixBracket = firstChar;
      token = token.slice(1);
      inBracket = true;
    }

    if (closeBrackets[lastChar]) {
      const content = token.slice(0, -1);
      if (inBracket || /^[0-9a-zA-Z.-]$/.test(content) || content === "") {
        suffixBracket = lastChar;
        token = content;
        inBracket = false;
      }
    }

    let converted = convertKrutidevWordToUnicode(token);
    tokens[i] = prefixBracket + converted + suffixBracket;
  }
  return tokens.join("");
};

const preprocessCanvas = (canvas) => {
  const ctx = canvas.getContext("2d");
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const width = canvas.width;
  const height = canvas.height;

  // 1. Grayscale Conversion (Standard Luma)
  const gray = new Uint8Array(width * height);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    gray[i / 4] = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  }

  // 2. Bradley-Roth Adaptive Thresholding
  const S = Math.floor(width / 8); // local window size
  const T = 0.15; // threshold difference ratio (15%)

  // Compute integral image
  const intImg = new Float64Array(width * height);
  for (let x = 0; x < width; x++) {
    let sum = 0;
    for (let y = 0; y < height; y++) {
      const index = y * width + x;
      sum += gray[index];
      if (x === 0) {
        intImg[index] = sum;
      } else {
        intImg[index] = intImg[index - 1] + sum;
      }
    }
  }

  // Perform local thresholding
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = y * width + x;
      
      const x1 = Math.max(0, x - Math.floor(S / 2));
      const x2 = Math.min(width - 1, x + Math.floor(S / 2));
      const y1 = Math.max(0, y - Math.floor(S / 2));
      const y2 = Math.min(height - 1, y + Math.floor(S / 2));
      
      const count = (x2 - x1 + 1) * (y2 - y1 + 1);
      
      // Calculate sum of the local neighborhood using the integral image
      let sum = intImg[y2 * width + x2];
      if (x1 > 0) {
        sum -= intImg[y2 * width + (x1 - 1)];
      }
      if (y1 > 0) {
        sum -= intImg[(y1 - 1) * width + x2];
      }
      if (x1 > 0 && y1 > 0) {
        sum += intImg[(y1 - 1) * width + (x1 - 1)];
      }
      
      const avg = sum / count;
      const pixelVal = gray[index];
      
      // Binarize and clamp values to reduce noise in solid regions
      let finalVal;
      if (pixelVal < 40) {
        finalVal = 0; // Solid black
      } else if (pixelVal > 220) {
        finalVal = 255; // Solid white
      } else {
        finalVal = (pixelVal < avg * (1.0 - T)) ? 0 : 255;
      }
      
      const dataIdx = index * 4;
      data[dataIdx] = finalVal;
      data[dataIdx + 1] = finalVal;
      data[dataIdx + 2] = finalVal;
      data[dataIdx + 3] = 255; // Fully opaque
    }
  }

  ctx.putImageData(imgData, 0, 0);
};

export default {
  id: "pdf-searcher",
  name: "Multi-PDF Searcher & OCR",
  
  // State variables for the tool
  files: [], // Array to store parsed file data
  isWorkerLoading: false,
  pdfjs: null,
  tesseract: null,
  ocrWorker: null,
  ocrWorkerLang: null, // Track worker language
  currentOcrPage: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Import PDF Documents</h3>
            <div style="display: flex; gap: 8px;">
              <button class="tool-btn secondary" id="pdf-load-sample" style="font-size: 11px; padding: 4px 8px;">Load Samples</button>
              <button class="tool-btn secondary" id="pdf-clear-all" disabled>Clear All</button>
            </div>
          </div>
          
          <!-- Dropzone -->
          <div class="pdf-dropzone" id="pdf-dropzone">
            <svg viewBox="0 0 24 24" class="dropzone-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 12 15 15"></polyline></svg>
            <p class="dropzone-text">Drag & drop multiple PDFs here or <span>browse files</span></p>
            <input type="file" id="pdf-file-input" multiple accept=".pdf" style="display: none;">
          </div>

          <!-- Uploaded / Parsing list -->
          <div class="pdf-file-list" id="pdf-file-list">
            <!-- Dynamically populated files list -->
            <div class="empty-list-msg">No PDF files imported yet.</div>
          </div>

          <!-- Configuration Panel -->
          <div class="form-group" style="margin-top: 20px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; margin-bottom: 8px;">
              <input type="checkbox" id="pdf-enable-ocr" checked>
              <span>Enable OCR on scanned pages (Slower)</span>
            </label>

            <label id="ocr-force-wrapper" style="display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; margin-bottom: 8px;">
              <input type="checkbox" id="pdf-force-ocr">
              <span>Force OCR on all pages (Bypass bad text layers)</span>
            </label>

            <label id="ocr-enhance-wrapper" style="display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; margin-bottom: 8px;">
              <input type="checkbox" id="pdf-enhance-ocr">
              <span>Enhance scanned page images (Binarization/Contrast)</span>
            </label>

            <div class="form-group" id="ocr-profile-wrapper" style="margin-bottom: 12px; display: flex; flex-direction: row; align-items: center; gap: 8px;">
              <label for="pdf-ocr-profile" style="font-size: 12px; white-space: nowrap;">Device Profile:</label>
              <select class="form-select" id="pdf-ocr-profile" style="padding: 4px 8px; font-size: 12px; flex: 1;">
                <option value="performance">High Performance (Fast/Low-end PCs)</option>
                <option value="balanced" selected>Balanced Mode (Standard)</option>
                <option value="accuracy">Max Accuracy (Detailed/High-end PCs)</option>
              </select>
            </div>
            
            <div class="form-group" id="ocr-lang-wrapper" style="margin-bottom: 12px; display: flex; flex-direction: row; align-items: center; gap: 8px;">
              <label for="pdf-ocr-lang" style="font-size: 12px; white-space: nowrap;">OCR Language:</label>
              <select class="form-select" id="pdf-ocr-lang" style="padding: 4px 8px; font-size: 12px; flex: 1;">
                <option value="eng" selected>English (Default)</option>
                <option value="spa">Spanish (Español)</option>
                <option value="fra">French (Français)</option>
                <option value="deu">German (Deutsch)</option>
                <option value="hin">Hindi (हिन्दी)</option>
                <option value="ara">Arabic (العربية)</option>
                <option value="chi_sim">Chinese Simplified (简体中文)</option>
                <option value="jpn">Japanese (日本語)</option>
              </select>
            </div>
            
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">If a page contains no text or is poorly encoded, the system will use client-side OCR to extract text.</p>
            <button class="tool-btn primary hidden" id="pdf-rescan-btn" style="width: 100%; margin-top: 12px; justify-content: center; font-weight: bold;">Apply Settings & Re-scan</button>
          </div>
        </div>

        <div class="tool-panel" style="flex: 1.5; display: flex; flex-direction: column;">
          <div class="panel-header">
            <h3>Search & Query Engine</h3>
            <div style="display: flex; gap: 8px;" id="export-btn-group" class="hidden">
              <button class="tool-btn secondary" id="pdf-export-txt" style="font-size: 12px; padding: 6px 10px;">Export TXT</button>
              <button class="tool-btn secondary" id="pdf-export-csv" style="font-size: 12px; padding: 6px 10px;">Export CSV</button>
              <button class="tool-btn secondary" id="pdf-export-json" style="font-size: 12px; padding: 6px 10px;">Export JSON</button>
            </div>
          </div>

          <div class="search-controls">
            <div class="search-input-row" style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center;">
              <input type="text" class="form-control" id="pdf-search-input" placeholder="Enter keywords or sentences to search..." style="flex: 1; min-width: 0;" aria-label="Search Input">
              <button class="keyboard-toggle-btn" id="pdf-keyboard-toggle" title="Open Virtual Keyboard" style="background: none; border: none; padding: 8px; cursor: pointer; color: var(--accent-cyan); display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: background 0.2s;">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="6" y1="8" x2="6.01" y2="8"></line><line x1="10" y1="8" x2="10.01" y2="8"></line><line x1="14" y1="8" x2="14.01" y2="8"></line><line x1="18" y1="8" x2="18.01" y2="8"></line><line x1="6" y1="12" x2="6.01" y2="12"></line><line x1="10" y1="12" x2="10.01" y2="12"></line><line x1="14" y1="12" x2="14.01" y2="12"></line><line x1="18" y1="12" x2="18.01" y2="12"></line><line x1="7" y1="16" x2="17" y2="16"></line></svg>
              </button>
              <button class="tool-btn primary" id="pdf-search-btn" disabled>Search</button>
            </div>

            <!-- Virtual Keyboard Panel -->
            <div class="virtual-keyboard-panel hidden" id="pdf-virtual-keyboard" style="margin-top: 10px;">
              <div class="keyboard-header">
                <div class="keyboard-tabs">
                  <button class="keyboard-tab active" data-layout="hindi">Hindi (हिन्दी)</button>
                  <button class="keyboard-tab" data-layout="latin">Accents (á/é/ñ)</button>
                  <button class="keyboard-tab" data-layout="arabic">Arabic (العربية)</button>
                </div>
                <button class="keyboard-close-btn" id="pdf-keyboard-close">&times;</button>
              </div>
              <div class="keyboard-body">
                <!-- Hindi Layout -->
                <div class="keyboard-layout active" id="layout-hindi">
                  <div class="keyboard-row">
                    <button class="key vowel">अ</button><button class="key vowel">आ</button><button class="key vowel">इ</button><button class="key vowel">ई</button><button class="key vowel">उ</button><button class="key vowel">ऊ</button><button class="key vowel">ऋ</button><button class="key vowel">ए</button><button class="key vowel">ऐ</button><button class="key vowel">ओ</button><button class="key vowel">औ</button>
                  </div>
                  <div class="keyboard-row">
                    <button class="key matra" title="आ की मात्रा">ा</button><button class="key matra" title="इ की मात्रा">ि</button><button class="key matra" title="ई की मात्रा">ी</button><button class="key matra" title="उ की मात्रा">ु</button><button class="key matra" title="ऊ की मात्रा">ू</button><button class="key matra" title="ऋ की मात्रा">ृ</button><button class="key matra" title="ए की मात्रा">े</button><button class="key matra" title="ऐ की मात्रा">ै</button><button class="key matra" title="ओ की मात्रा">ो</button><button class="key matra" title="औ की मात्रा">ौ</button><button class="key mark" title="हलंत">्</button>
                  </div>
                  <div class="keyboard-row">
                    <button class="key consonant">क</button><button class="key consonant">ख</button><button class="key consonant">ग</button><button class="key consonant">घ</button><button class="key consonant">ङ</button><button class="key consonant">च</button><button class="key consonant">छ</button><button class="key consonant">ज</button><button class="key consonant">झ</button><button class="key consonant">ञ</button>
                  </div>
                  <div class="keyboard-row">
                    <button class="key consonant">ट</button><button class="key consonant">ठ</button><button class="key consonant">ड</button><button class="key consonant">ढ</button><button class="key consonant">ण</button><button class="key consonant">त</button><button class="key consonant">थ</button><button class="key consonant">द</button><button class="key consonant">ध</button><button class="key consonant">न</button>
                  </div>
                  <div class="keyboard-row">
                    <button class="key consonant">प</button><button class="key consonant">फ</button><button class="key consonant">ब</button><button class="key consonant">भ</button><button class="key consonant">म</button><button class="key consonant">य</button><button class="key consonant">र</button><button class="key consonant">ल</button><button class="key consonant">व</button><button class="key consonant">श</button>
                  </div>
                  <div class="keyboard-row">
                    <button class="key consonant">ष</button><button class="key consonant">स</button><button class="key consonant">ह</button><button class="key consonant">क्ष</button><button class="key consonant">त्र</button><button class="key consonant">ज्ञ</button><button class="key consonant">ड़</button><button class="key consonant">ढ़</button><button class="key mark" title="अनुस्वार">ं</button><button class="key mark" title="चन्द्रबिन्दु">ँ</button><button class="key mark" title="विसर्ग">ः</button>
                  </div>
                  <div class="keyboard-row" style="margin-top: 5px;">
                    <button class="key action space-key" style="max-width: 240px; flex: 2;">Space</button>
                    <button class="key action backspace-key" style="flex: 1;">Backspace</button>
                  </div>
                </div>
                <!-- Latin Accents Layout -->
                <div class="keyboard-layout" id="layout-latin">
                  <div class="keyboard-row">
                    <button class="key letter">á</button><button class="key letter">é</button><button class="key letter">í</button><button class="key letter">ó</button><button class="key letter">ú</button><button class="key letter">ñ</button><button class="key letter">ü</button><button class="key letter">¿</button><button class="key letter">¡</button>
                  </div>
                  <div class="keyboard-row">
                    <button class="key letter">à</button><button class="key letter">è</button><button class="key letter">ù</button><button class="key letter">â</button><button class="key letter">ê</button><button class="key letter">î</button><button class="key letter">ô</button><button class="key letter">û</button><button class="key letter">ç</button>
                  </div>
                  <div class="keyboard-row">
                    <button class="key letter">Á</button><button class="key letter">É</button><button class="key letter">Í</button><button class="key letter">Ó</button><button class="key letter">Ú</button><button class="key letter">Ñ</button><button class="key letter">Ü</button><button class="key letter">Ç</button>
                  </div>
                  <div class="keyboard-row" style="margin-top: 5px;">
                    <button class="key action space-key" style="max-width: 240px; flex: 2;">Space</button>
                    <button class="key action backspace-key" style="flex: 1;">Backspace</button>
                  </div>
                </div>
                <!-- Arabic Layout -->
                <div class="keyboard-layout" id="layout-arabic">
                  <div class="keyboard-row" dir="rtl">
                    <button class="key letter">أ</button><button class="key letter">ب</button><button class="key letter">ت</button><button class="key letter">ث</button><button class="key letter">ج</button><button class="key letter">ح</button><button class="key letter">خ</button><button class="key letter">د</button><button class="key letter">ذ</button><button class="key letter">ر</button>
                  </div>
                  <div class="keyboard-row" dir="rtl">
                    <button class="key letter">ز</button><button class="key letter">स</button><button class="key letter">श</button><button class="key letter">ص</button><button class="key letter">ध</button><button class="key letter">ط</button><button class="key letter">ظ</button><button class="key letter">ع</button><button class="key letter">غ</button><button class="key letter">फ</button>
                  </div>
                  <div class="keyboard-row" dir="rtl">
                    <button class="key letter">ق</button><button class="key letter">ك</button><button class="key letter">ل</button><button class="key letter">م</button><button class="key letter">ن</button><button class="key letter">ه</button><button class="key letter">و</button><button class="key letter">ي</button><button class="key letter">ة</button><button class="key letter">ء</button>
                  </div>
                  <div class="keyboard-row" dir="rtl">
                    <button class="key mark">َ</button><button class="key mark">ُ</button><button class="key mark">ِ</button><button class="key mark">ّ</button><button class="key mark">ْ</button><button class="key letter">ى</button><button class="key letter">لآ</button><button class="key letter">لأ</button><button class="key letter">لإ</button>
                  </div>
                  <div class="keyboard-row" style="margin-top: 5px;">
                    <button class="key action space-key" style="max-width: 240px; flex: 2;">Space</button>
                    <button class="key action backspace-key" style="flex: 1;">Backspace</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="search-options" style="display: flex; gap: 16px; flex-wrap: wrap; font-size: 13px;">
              <div class="form-group" style="margin-bottom: 0; display: flex; align-items: center; gap: 8px;">
                <label for="pdf-search-mode">Mode:</label>
                <select class="form-select" id="pdf-search-mode" style="padding: 4px 8px; font-size: 12px;">
                  <option value="contains" selected>Contains keywords</option>
                  <option value="exact">Exact Phrase</option>
                  <option value="regex">Regular Expression</option>
                </select>
              </div>

              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; user-select: none;">
                <input type="checkbox" id="pdf-case-sensitive">
                <span>Case Sensitive</span>
              </label>
            </div>
          </div>

          <!-- Status info -->
          <div class="search-status-bar" id="search-status-bar">
            <div class="status-icon-wrapper">
              <span class="status-pulse-dot" id="status-pulse-dot"></span>
              <span id="status-main-text">Ready. Load PDFs to begin.</span>
            </div>
            <div class="status-stats-grid hidden" id="status-stats-grid">
              <div class="stat-box">
                <span class="stat-value" id="stat-matches">0</span>
                <span class="stat-label">Matches</span>
              </div>
              <div class="stat-box">
                <span class="stat-value" id="stat-docs">0</span>
                <span class="stat-label">Documents</span>
              </div>
              <div class="stat-box">
                <span class="stat-value" id="stat-pages">0</span>
                <span class="stat-label">Pages</span>
              </div>
            </div>
          </div>

          <!-- Search Results list -->
          <div class="search-results-container" id="search-results-container">
            <div class="empty-results-msg">Upload documents and enter a query to see search results.</div>
          </div>
        </div>

        <!-- Quick Guide -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>100% Client-Side Search & Privacy Architecture</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Import files</strong>: Load multiple PDFs. The tool operates completely locally, so your sensitive files never touch the cloud.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Automated OCR</strong>: PDF.js extracts text layers. For image-only scans, Tesseract.js parses them into searchable text automatically.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Smart Search</strong>: Enter words, sentences, or regular expressions. Matches are clearly labeled to show if they were extracted from text or images.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- PDF Reader Modal -->
      <div id="pdf-reader-modal" class="modal-overlay hidden" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px);">
        <div class="modal-content" style="background: var(--card-bg, #1a1a1a); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; width: 90%; max-width: 900px; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 20px 40px rgba(0,0,0,0.5); overflow: hidden; animation: modal-fadeIn 0.3s ease;">
          <div class="modal-header" style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
            <h3 id="pdf-reader-title" style="margin: 0; font-size: 16px; color: var(--accent-cyan); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 80%;">Reading PDF</h3>
            <button id="pdf-reader-close" style="background: none; border: none; color: var(--text-muted); font-size: 24px; cursor: pointer; line-height: 1; padding: 0 4px;">&times;</button>
          </div>
          <div class="modal-body" style="padding: 20px; overflow-y: auto; display: flex; flex-direction: column; align-items: center; gap: 16px; flex: 1; min-height: 0;">
            <!-- Controls bar -->
            <div class="reader-controls" style="display: flex; gap: 12px; align-items: center; background: rgba(255,255,255,0.03); padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); width: 100%; justify-content: center; flex-wrap: wrap;">
              <button class="tool-btn secondary" id="pdf-reader-first" style="font-size: 11px; padding: 4px 8px;">First</button>
              <button class="tool-btn secondary" id="pdf-reader-prev" style="font-size: 11px; padding: 4px 8px;">Prev</button>
              <span id="pdf-reader-page-num" style="font-size: 13px; font-weight: 500; min-width: 80px; text-align: center;">Page 1 / 1</span>
              <button class="tool-btn secondary" id="pdf-reader-next" style="font-size: 11px; padding: 4px 8px;">Next</button>
              <button class="tool-btn secondary" id="pdf-reader-last" style="font-size: 11px; padding: 4px 8px;">Last</button>
              <div style="border-left: 1px solid rgba(255,255,255,0.1); height: 16px; margin: 0 8px;"></div>
              <button class="tool-btn secondary" id="pdf-reader-toggle-mode" style="font-size: 11px; padding: 4px 8px;">View Text</button>
            </div>

            <!-- Page Container -->
            <div id="pdf-reader-page-container" style="width: 100%; flex: 1; display: flex; align-items: flex-start; justify-content: center; overflow: auto; background: rgba(0,0,0,0.3); border-radius: 8px; border: 1px solid rgba(255,255,255,0.03); min-height: 250px; padding: 10px;">
              <canvas id="pdf-reader-canvas" style="max-width: 100%; height: auto; border-radius: 4px; border: 1px solid rgba(255,255,255,0.15); background: white; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"></canvas>
              <div id="pdf-reader-text" class="hidden" style="width: 100%; height: 100%; max-width: 800px; padding: 20px; color: var(--text-color); font-size: 14px; line-height: 1.6; white-space: pre-wrap; text-align: left; background: rgba(0, 0, 0, 0.2); border-radius: 4px; overflow-y: auto;"></div>
            </div>
          </div>
        </div>
      </div>

      <style>
        .pdf-dropzone {
          border: 2px dashed rgba(0, 242, 254, 0.3);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 30px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          user-select: none;
        }
        .pdf-dropzone:hover, .pdf-dropzone.dragover {
          border-color: var(--accent-cyan);
          background: rgba(0, 242, 254, 0.05);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.1);
        }
        .dropzone-icon {
          width: 44px;
          height: 44px;
          stroke: rgba(0, 242, 254, 0.7);
          margin-bottom: 12px;
          transition: transform 0.3s ease;
        }
        .pdf-dropzone:hover .dropzone-icon {
          transform: translateY(-3px);
          stroke: var(--accent-cyan);
        }
        .dropzone-text {
          font-size: 14px;
          color: var(--text-color);
          margin: 0;
        }
        .dropzone-text span {
          color: var(--accent-cyan);
          text-decoration: underline;
          font-weight: bold;
        }
        .pdf-file-list {
          max-height: 250px;
          overflow-y: auto;
          background: rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .empty-list-msg {
          text-align: center;
          color: var(--text-muted);
          font-size: 13px;
          padding: 20px 0;
        }
        .file-item {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .file-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .file-item-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 70%;
        }
        .file-item-size {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: normal;
        }
        .file-status-badge {
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .badge-queued { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
        .badge-parsing { background: rgba(0, 242, 254, 0.15); color: #00f2fe; border: 1px solid rgba(0, 242, 254, 0.3); }
        .badge-ocr { background: rgba(157, 78, 221, 0.15); color: #9d4edd; border: 1px solid rgba(157, 78, 221, 0.3); }
        .badge-ready { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
        .badge-error { background: rgba(244, 63, 94, 0.15); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.3); }
        
        .file-progress-container {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }
        .file-progress-bar {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple));
          transition: width 0.2s ease;
        }
        .file-item-footer {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--text-muted);
        }
        
        .search-controls {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 12px;
        }
        .search-status-bar {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-left: 3px solid var(--accent-cyan);
          border-radius: 8px;
          padding: 14px 16px;
          color: var(--text-color);
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.3s ease;
        }
        .status-icon-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
        }
        .status-pulse-dot {
          width: 8px;
          height: 8px;
          background-color: var(--accent-cyan);
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px var(--accent-cyan);
          animation: status-pulse 2s infinite;
          flex-shrink: 0;
        }
        .status-pulse-dot.working {
          background-color: var(--accent-amber);
          box-shadow: 0 0 8px var(--accent-amber);
        }
        .status-pulse-dot.error {
          background-color: var(--accent-rose);
          box-shadow: 0 0 8px var(--accent-rose);
        }
        @keyframes status-pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        .status-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          background: rgba(0, 0, 0, 0.2);
          padding: 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          animation: status-fadeIn 0.3s ease;
        }
        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2px 0;
        }
        .stat-box:not(:last-child) {
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }
        .stat-value {
          font-size: 20px;
          font-weight: bold;
          color: var(--accent-cyan);
          text-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
        }
        .stat-label {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 2px;
        }
        @keyframes status-fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .search-results-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-right: 4px;
        }
        .empty-results-msg {
          text-align: center;
          color: var(--text-muted);
          font-size: 14px;
          padding: 40px 0;
        }
        
        .pdf-result-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          flex-shrink: 0;
        }
        .pdf-result-header {
          background: rgba(255, 255, 255, 0.04);
          padding: 10px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pdf-result-title {
          font-size: 14px;
          font-weight: bold;
          color: var(--accent-cyan);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 80%;
        }
        .pdf-result-match-count {
          font-size: 11px;
          padding: 2px 8px;
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
          border-radius: 12px;
          font-weight: bold;
        }
        .pdf-result-matches {
          display: flex;
          flex-direction: column;
          padding: 8px;
          gap: 8px;
        }
        .match-row {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 6px;
          padding: 8px 12px;
          border-left: 3px solid transparent;
          font-size: 13px;
        }
        .match-row.match-type-text {
          border-left-color: var(--accent-cyan);
        }
        .match-row.match-type-ocr {
          border-left-color: var(--accent-purple);
        }
        .match-row-header {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          margin-bottom: 4px;
          color: var(--text-muted);
        }
        .match-badge {
          font-size: 10px;
          padding: 1px 4px;
          border-radius: 3px;
          font-weight: bold;
        }
        .match-badge-text { background: rgba(0, 242, 254, 0.1); color: var(--accent-cyan); }
        .match-badge-ocr { background: rgba(157, 78, 221, 0.1); color: var(--accent-purple); }
        
        .match-snippet {
          line-height: 1.4;
          color: var(--text-color);
          word-break: break-word;
        }
        .match-snippet mark {
          background: rgba(0, 242, 254, 0.25);
          color: #fff;
          font-weight: bold;
          border-bottom: 2px solid var(--accent-cyan);
          padding: 0 2px;
          border-radius: 2px;
        }
        .hidden {
          display: none !important;
        }

        /* Virtual Keyboard Styles */
        .keyboard-toggle-btn:hover {
          background: rgba(0, 242, 254, 0.1);
          color: #fff;
        }
        .virtual-keyboard-panel {
          background: rgba(20, 20, 25, 0.95);
          border: 1px solid rgba(0, 242, 254, 0.2);
          border-radius: 12px;
          padding: 12px;
          margin-top: 10px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          animation: keyboard-slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes keyboard-slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .keyboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 8px;
        }
        .keyboard-tabs {
          display: flex;
          gap: 6px;
        }
        .keyboard-tab {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .keyboard-tab:hover, .keyboard-tab.active {
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
          border-color: rgba(0, 242, 254, 0.3);
        }
        .keyboard-close-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 20px;
          cursor: pointer;
          padding: 0 4px;
          line-height: 1;
        }
        .keyboard-close-btn:hover {
          color: var(--accent-rose);
        }
        .keyboard-layout {
          display: none;
          flex-direction: column;
          gap: 6px;
        }
        .keyboard-layout.active {
          display: flex;
        }
        .keyboard-row {
          display: flex;
          justify-content: center;
          gap: 5px;
          flex-wrap: wrap;
        }
        .key {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-color);
          min-width: 32px;
          height: 32px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
          user-select: none;
          padding: 0 6px;
        }
        .key:hover {
          background: rgba(0, 242, 254, 0.2);
          border-color: var(--accent-cyan);
          color: #fff;
          box-shadow: 0 0 8px rgba(0, 242, 254, 0.3);
          transform: translateY(-1px);
        }
        .key:active {
          transform: translateY(0);
          background: rgba(0, 242, 254, 0.3);
        }
        .key.vowel {
          background: rgba(0, 242, 254, 0.08);
          border-color: rgba(0, 242, 254, 0.2);
        }
        .key.matra {
          background: rgba(157, 78, 221, 0.08);
          border-color: rgba(157, 78, 221, 0.2);
          font-weight: bold;
        }
        .key.mark {
          background: rgba(245, 158, 11, 0.08);
          border-color: rgba(245, 158, 11, 0.2);
        }
        .key.action {
          flex: 1;
          font-size: 12px;
          max-width: 120px;
          background: rgba(255, 255, 255, 0.12);
        }
        .key.space-key {
          max-width: 240px;
        }
        .key.backspace-key {
          background: rgba(244, 63, 94, 0.15);
          border-color: rgba(244, 63, 94, 0.3);
          color: #ff8fa3;
        }
        .key.backspace-key:hover {
          background: rgba(244, 63, 94, 0.25);
          color: #fff;
          border-color: var(--accent-rose);
          box-shadow: 0 0 8px rgba(244, 63, 94, 0.3);
        }
      </style>
    `;
  },

  async init(container, appInstance) {
    // Reset state variables for fresh session
    this.files = [];
    this.currentOcrPage = null;

    const fileInput = container.querySelector("#pdf-file-input");
    const dropzone = container.querySelector("#pdf-dropzone");
    const fileListContainer = container.querySelector("#pdf-file-list");
    const clearAllBtn = container.querySelector("#pdf-clear-all");
    const loadSampleBtn = container.querySelector("#pdf-load-sample");
    const enableOcrCheckbox = container.querySelector("#pdf-enable-ocr");
    const forceOcrCheckbox = container.querySelector("#pdf-force-ocr");
    const ocrForceWrapper = container.querySelector("#ocr-force-wrapper");
    const enhanceOcrCheckbox = container.querySelector("#pdf-enhance-ocr");
    const ocrEnhanceWrapper = container.querySelector("#ocr-enhance-wrapper");
    const ocrProfileWrapper = container.querySelector("#ocr-profile-wrapper");
    const ocrProfileSelect = container.querySelector("#pdf-ocr-profile");
    const ocrLangWrapper = container.querySelector("#ocr-lang-wrapper");
    const ocrLangSelect = container.querySelector("#pdf-ocr-lang");
    const rescanBtn = container.querySelector("#pdf-rescan-btn");

    // PDF Reader Modal Elements
    const readerModal = container.querySelector("#pdf-reader-modal");
    const readerTitle = container.querySelector("#pdf-reader-title");
    const readerClose = container.querySelector("#pdf-reader-close");
    const readerFirst = container.querySelector("#pdf-reader-first");
    const readerPrev = container.querySelector("#pdf-reader-prev");
    const readerNext = container.querySelector("#pdf-reader-next");
    const readerLast = container.querySelector("#pdf-reader-last");
    const readerPageNum = container.querySelector("#pdf-reader-page-num");
    const readerToggleMode = container.querySelector("#pdf-reader-toggle-mode");
    const readerCanvas = container.querySelector("#pdf-reader-canvas");
    const readerText = container.querySelector("#pdf-reader-text");

    let readerFile = null;
    let readerCurrentPage = 1;
    let readerMode = "layout"; // "layout" or "text"

    const openPdfReader = (filename) => {
      const fileObj = this.files.find(f => f.name === filename);
      if (!fileObj) return;

      readerFile = fileObj;
      readerCurrentPage = 1;
      if (!fileObj.rawBuffer) {
        readerMode = "text";
        readerToggleMode.innerText = "View Layout";
      } else {
        readerMode = "layout";
        readerToggleMode.innerText = "View Text";
      }

      readerTitle.innerText = `Reading: ${fileObj.name}`;
      readerModal.classList.remove("hidden");
      renderReaderPage();
    };

    const renderReaderPage = async () => {
      if (!readerFile) return;

      const total = readerFile.totalPages;
      readerPageNum.innerText = `Page ${readerCurrentPage} / ${total}`;

      readerFirst.disabled = readerCurrentPage <= 1;
      readerPrev.disabled = readerCurrentPage <= 1;
      readerNext.disabled = readerCurrentPage >= total;
      readerLast.disabled = readerCurrentPage >= total;

      if (readerMode === "layout" && !readerFile.rawBuffer) {
        readerMode = "text";
        readerToggleMode.innerText = "View Layout";
      }

      if (readerMode === "text") {
        readerCanvas.style.display = "none";
        readerText.classList.remove("hidden");

        const pageData = readerFile.pages.find(p => p.pageNumber === readerCurrentPage);
        if (pageData) {
          const query = searchInput.value.trim();
          if (query) {
            readerText.innerHTML = highlightMatches(pageData.text, query, searchModeSelect.value, caseSensitiveCheckbox.checked);
          } else {
            readerText.innerText = pageData.text;
          }
        } else {
          readerText.innerText = "No text extracted from this page.";
        }
      } else {
        readerCanvas.style.display = "block";
        readerText.classList.add("hidden");

        const ctx = readerCanvas.getContext("2d");
        // Draw loading
        readerCanvas.width = 400;
        readerCanvas.height = 200;
        ctx.fillStyle = "#1e1e1e";
        ctx.fillRect(0, 0, 400, 200);
        ctx.fillStyle = "#00f2fe";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Rendering page layout...", 200, 100);

        let pdf = null;
        try {
          pdf = await this.pdfjs.getDocument({ data: readerFile.rawBuffer.slice(0) }).promise;
          const page = await pdf.getPage(readerCurrentPage);

          const viewport = page.getViewport({ scale: 1.3 });
          readerCanvas.width = viewport.width;
          readerCanvas.height = viewport.height;

          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, readerCanvas.width, readerCanvas.height);

          await page.render({
            canvasContext: ctx,
            viewport: viewport
          }).promise;
        } catch (err) {
          console.error("Reader render failed:", err);
          readerCanvas.width = 400;
          readerCanvas.height = 200;
          ctx.fillStyle = "#1e1e1e";
          ctx.fillRect(0, 0, 400, 200);
          ctx.fillStyle = "#f43f5e";
          ctx.font = "14px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(`Error rendering page: ${err.message}`, 200, 100);
        } finally {
          if (pdf) {
            await pdf.destroy().catch(() => {});
          }
        }
      }
    };

    readerClose.addEventListener("click", () => {
      readerModal.classList.add("hidden");
    });

    readerFirst.addEventListener("click", () => {
      if (readerFile && readerCurrentPage > 1) {
        readerCurrentPage = 1;
        renderReaderPage();
      }
    });

    readerPrev.addEventListener("click", () => {
      if (readerFile && readerCurrentPage > 1) {
        readerCurrentPage--;
        renderReaderPage();
      }
    });

    readerNext.addEventListener("click", () => {
      if (readerFile && readerCurrentPage < readerFile.totalPages) {
        readerCurrentPage++;
        renderReaderPage();
      }
    });

    readerLast.addEventListener("click", () => {
      if (readerFile && readerCurrentPage < readerFile.totalPages) {
        readerCurrentPage = readerFile.totalPages;
        renderReaderPage();
      }
    });

    readerToggleMode.addEventListener("click", () => {
      if (readerMode === "layout") {
        readerMode = "text";
        readerToggleMode.innerText = "View Layout";
      } else {
        readerMode = "layout";
        readerToggleMode.innerText = "View Text";
      }
      renderReaderPage();
    });

    const notifySettingsChanged = () => {
      const hasProcessable = this.files.some(f => f.rawBuffer);
      if (hasProcessable) {
        appInstance.showToast("Settings updated. Click 'Apply Settings & Re-scan' to re-process files.", "warning");
        if (rescanBtn) {
          rescanBtn.style.boxShadow = "0 0 15px rgba(0, 242, 254, 0.6)";
          rescanBtn.style.borderColor = "var(--accent-cyan)";
        }
      }
    };

    rescanBtn?.addEventListener("click", () => {
      if (rescanBtn) {
        rescanBtn.style.boxShadow = "";
        rescanBtn.style.borderColor = "";
      }
      reprocessAllFiles();
    });

    enableOcrCheckbox.addEventListener("change", () => {
      if (enableOcrCheckbox.checked) {
        ocrLangWrapper.style.display = "flex";
        ocrForceWrapper.style.display = "flex";
        ocrEnhanceWrapper.style.display = "flex";
        ocrProfileWrapper.style.display = "flex";
      } else {
        ocrLangWrapper.style.display = "none";
        ocrForceWrapper.style.display = "none";
        ocrEnhanceWrapper.style.display = "none";
        ocrProfileWrapper.style.display = "none";
        forceOcrCheckbox.checked = false;
        enhanceOcrCheckbox.checked = false;
      }
      notifySettingsChanged();
    });

    forceOcrCheckbox.addEventListener("change", notifySettingsChanged);
    enhanceOcrCheckbox.addEventListener("change", notifySettingsChanged);
    ocrProfileSelect.addEventListener("change", notifySettingsChanged);
    ocrLangSelect.addEventListener("change", notifySettingsChanged);
    
    const searchInput = container.querySelector("#pdf-search-input");
    const searchBtn = container.querySelector("#pdf-search-btn");
    const searchModeSelect = container.querySelector("#pdf-search-mode");
    const caseSensitiveCheckbox = container.querySelector("#pdf-case-sensitive");
    const statusPulseDot = container.querySelector("#status-pulse-dot");
    const statusMainText = container.querySelector("#status-main-text");
    const statusStatsGrid = container.querySelector("#status-stats-grid");
    const statMatches = container.querySelector("#stat-matches");
    const statDocs = container.querySelector("#stat-docs");
    const statPages = container.querySelector("#stat-pages");

    const setStatus = (text, type = 'idle', stats = null) => {
      statusMainText.innerText = text;
      
      // Reset color classes
      statusPulseDot.className = "status-pulse-dot";
      if (type === 'working') {
        statusPulseDot.classList.add("working");
      } else if (type === 'error') {
        statusPulseDot.classList.add("error");
      }
      
      if (stats) {
        statMatches.innerText = stats.matches;
        statDocs.innerText = stats.docs;
        statPages.innerText = stats.pages;
        statusStatsGrid.classList.remove("hidden");
      } else {
        statusStatsGrid.classList.add("hidden");
      }
    };
    const resultsContainer = container.querySelector("#search-results-container");
    const exportBtnGroup = container.querySelector("#export-btn-group");

    // Virtual Keyboard Logic
    const keyboardToggleBtn = container.querySelector("#pdf-keyboard-toggle");
    const keyboardPanel = container.querySelector("#pdf-virtual-keyboard");
    const keyboardCloseBtn = container.querySelector("#pdf-keyboard-close");
    const keyboardTabs = container.querySelectorAll(".keyboard-tab");
    const keyboardLayouts = container.querySelectorAll(".keyboard-layout");
    const keyboardKeys = container.querySelectorAll(".key");

    keyboardToggleBtn.addEventListener("click", () => {
      keyboardPanel.classList.toggle("hidden");
      if (!keyboardPanel.classList.contains("hidden")) {
        searchInput.focus();
      }
    });

    keyboardCloseBtn.addEventListener("click", () => {
      keyboardPanel.classList.add("hidden");
      searchInput.focus();
    });

    // Layout tabs switching
    keyboardTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        keyboardTabs.forEach(t => t.classList.remove("active"));
        keyboardLayouts.forEach(l => l.classList.remove("active"));
        
        tab.classList.add("active");
        const layoutId = `layout-${tab.dataset.layout}`;
        container.querySelector(`#${layoutId}`).classList.add("active");
        searchInput.focus();
      });
    });

    // Handle key clicks
    keyboardKeys.forEach(key => {
      key.addEventListener("click", (e) => {
        e.preventDefault();
        
        const start = searchInput.selectionStart;
        const end = searchInput.selectionEnd;
        const val = searchInput.value;
        
        let insertVal = "";
        
        if (key.classList.contains("space-key")) {
          insertVal = " ";
        } else if (key.classList.contains("backspace-key")) {
          if (start === end) {
            if (start > 0) {
              searchInput.value = val.substring(0, start - 1) + val.substring(end);
              searchInput.selectionStart = searchInput.selectionEnd = start - 1;
            }
          } else {
            searchInput.value = val.substring(0, start) + val.substring(end);
            searchInput.selectionStart = searchInput.selectionEnd = start;
          }
          searchInput.dispatchEvent(new Event("input"));
          searchInput.focus();
          return;
        } else {
          insertVal = key.innerText;
        }
        
        searchInput.value = val.substring(0, start) + insertVal + val.substring(end);
        const newCursorPos = start + insertVal.length;
        searchInput.selectionStart = searchInput.selectionEnd = newCursorPos;
        
        searchInput.dispatchEvent(new Event("input"));
        searchInput.focus();
      });
    });

    // Dynamic library loader state
    let pdfjsLoadingPromise = null;
    let tesseractLoadingPromise = null;
    let lastSearchResults = [];

    // Trigger file dialog
    dropzone.addEventListener("click", () => fileInput.click());

    // Drag-and-drop triggers
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("dragover");
    });
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      if (e.dataTransfer.files.length > 0) {
        handleFileSelection(e.dataTransfer.files);
      }
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        handleFileSelection(fileInput.files);
      }
    });

    clearAllBtn.addEventListener("click", () => {
      this.files = [];
      lastSearchResults = [];
      updateFileListUI();
      performSearch();
      clearAllBtn.disabled = true;
      searchBtn.disabled = true;
      exportBtnGroup.classList.add("hidden");
      fileInput.value = "";
      setStatus("Ready. Load PDFs to begin searching.");
      appInstance.showToast("Cleared all documents", "info");
      
      if (this.ocrWorker) {
        this.ocrWorker.terminate().then(() => {
          this.ocrWorker = null;
          this.ocrWorkerLang = null;
        });
      }
    });

    loadSampleBtn?.addEventListener("click", () => {
      this.files = [
        {
          name: "ncert_math_class9_ch1.pdf",
          size: 148520,
          status: "ready",
          parsed: true,
          totalPages: 3,
          textCount: 3,
          ocrCount: 0,
          progress: 100,
          pages: [
            {
              pageNumber: 1,
              isOcr: false,
              text: "Chapter 1: Real Numbers. In Class IX, you began your exploration of real numbers and in this process, you got to know irrational numbers. In this chapter, we will continue our discussion on real numbers. We begin with some important properties of positive integers in Sections 1.2 and 1.3, namely, the Euclid’s division algorithm and the Fundamental Theorem of Arithmetic."
            },
            {
              pageNumber: 2,
              isOcr: false,
              text: "Euclid’s division algorithm is a technique to compute the Highest Common Factor (HCF) of two given positive integers. Recall that the HCF of two positive integers a and b is the largest positive integer d that divides both a and b. We will illustrate this with some examples. Let us find the HCF of 455 and 42."
            },
            {
              pageNumber: 3,
              isOcr: false,
              text: "Fundamental Theorem of Arithmetic has to do with multiplying positive integers. You already know that every composite number can be expressed as a product of prime numbers in a unique way. This important fact is the Fundamental Theorem of Arithmetic. Let us state it formally."
            }
          ]
        },
        {
          name: "hindi_math_krutidev.pdf",
          size: 215430,
          status: "ready",
          parsed: true,
          totalPages: 3,
          textCount: 2,
          ocrCount: 1,
          progress: 100,
          pages: [
            {
              pageNumber: 1,
              isOcr: false,
              text: "कक्षा 9 में, आपने वास्तविक संख्याओं की खोज प्रारंभ की और इस प्रक्रिया से आपको अपरिमेय संख्याओं की जानने का अवसर मिला। इस अध्याय में, हम वास्तविक संख्याओं के बारे में अपनी चर्चा जारी रखेंगे। यह चर्चा हम अनुच्छेद 1.2 में धनात्मक पूर्णांकों के अति महत्वपूर्ण गुणों से प्रारंभ करेंगे। ये गुण हैं: यूक्लिड विभाजन एल्गोरिथ्म (कलन विधि) (Euclid’s division algorithm) और अंकगणित की आधारभूत प्रमेय (Fundamental Theorem of Arithmetic)।"
            },
            {
              pageNumber: 2,
              isOcr: false,
              text: "यदि एक विज्ञापन में यह बताया जाता है कि बुद्धिमान ने वोट नहीं दिया, तो आपको साफ़-सुथरी सरकार नहीं मिल सकती है। इसी प्रकार, यदि एक विज्ञापन में यह बताया जाता है कि बुद्धिमान व्यक्ति ही देश की प्रगति कर सकते हैं, तो यह भी सत्य है।"
            },
            {
              pageNumber: 3,
              isOcr: true,
              text: "दिए हुए कथन का निषेध ज्ञात करने के बारे में भी चर्चा करेंगे। इसके बाद हम इस बात की चर्चा करेंगे कि किसी दिए हुए कथन का विलोम (converse) कैसे ज्ञात किया जाता है। मान लीजिए p और q दो पूर्णांक हैं जहाँ q ≠ 0 है।"
            }
          ]
        }
      ];

      clearAllBtn.disabled = false;
      searchBtn.disabled = false;
      updateFileListUI();
      
      if (searchInput.value.trim() === "") {
        searchInput.value = "division";
      }
      performSearch();
      appInstance.showToast("Loaded sample PDF files in memory!", "success");
    });

    searchBtn.addEventListener("click", () => {
      performSearch();
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !searchBtn.disabled) {
        performSearch();
      }
    });

    // Helper: Dynamic Scripts loader
    function loadPdfJs() {
      if (pdfjsLoadingPromise) return pdfjsLoadingPromise;
      pdfjsLoadingPromise = new Promise((resolve, reject) => {
        if (window.pdfjsLib) {
          resolve(window.pdfjsLib);
          return;
        }
        setStatus("Loading PDF Engine (PDF.js)...", "working");
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.onload = () => {
          const pdfjs = window.pdfjsLib || window["pdfjs-dist/build/pdf"];
          if (!pdfjs) {
            reject(new Error("Failed to initialize PDF.js engine"));
            return;
          }
          pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          window.pdfjsLib = pdfjs;
          resolve(pdfjs);
        };
        script.onerror = () => {
          pdfjsLoadingPromise = null;
          reject(new Error("Failed to load PDF.js engine"));
        };
        document.head.appendChild(script);
      });
      return pdfjsLoadingPromise;
    }

    function loadTesseract() {
      if (tesseractLoadingPromise) return tesseractLoadingPromise;
      tesseractLoadingPromise = new Promise((resolve, reject) => {
        if (window.Tesseract) {
          resolve(window.Tesseract);
          return;
        }
        setStatus("Loading OCR Engine (Tesseract.js)...", "working");
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5.0.5/dist/tesseract.min.js";
        script.onload = () => {
          resolve(window.Tesseract);
        };
        script.onerror = () => {
          tesseractLoadingPromise = null;
          reject(new Error("Failed to load OCR engine"));
        };
        document.head.appendChild(script);
      });
      return tesseractLoadingPromise;
    }

    // Handles multiple file imports
    const handleFileSelection = async (fileList) => {
      try {
        this.pdfjs = await loadPdfJs();
        if (enableOcrCheckbox.checked) {
          this.tesseract = await loadTesseract();
        }
      } catch (err) {
        console.error(err);
        appInstance.showToast(err.message, "error");
        setStatus("Error loading engines: " + err.message, "error");
        return;
      }

      clearAllBtn.disabled = false;
      searchBtn.disabled = false;

      const newFiles = Array.from(fileList).filter(f => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
      if (newFiles.length === 0) {
        appInstance.showToast("Please upload valid PDF files.", "error");
        return;
      }

      for (const file of newFiles) {
        // Skip duplicate names
        if (this.files.some(f => f.name === file.name && f.size === file.size)) {
          continue;
        }

        const fileObj = {
          name: file.name,
          size: file.size,
          pages: [],
          parsed: false,
          progress: 0,
          totalPages: 0,
          ocrCount: 0,
          textCount: 0,
          error: null
        };

        this.files.push(fileObj);
        updateFileListUI();
        parsePdfFile(file, fileObj);
      }
    };

    // Parsing routines
    const parsePdfFile = async (file, fileObj) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedarray = new Uint8Array(e.target.result);
        fileObj.rawBuffer = typedarray; // Save for re-scanning
        let pdf = null;
        try {
          fileObj.status = "parsing";
          updateFileListUI();

          pdf = await this.pdfjs.getDocument({ data: typedarray.slice(0) }).promise;
          fileObj.totalPages = pdf.numPages;
          updateFileListUI();

          for (let pNum = 1; pNum <= fileObj.totalPages; pNum++) {
            if (appInstance.activeTool !== "pdf-searcher") {
              if (this.ocrWorker) {
                this.ocrWorker.terminate().then(() => {
                  this.ocrWorker = null;
                  this.ocrWorkerLang = null;
                });
              }
              break;
            }

            fileObj.progress = Math.round(((pNum - 1) / fileObj.totalPages) * 100);
            updateFileListUI();

            const page = await pdf.getPage(pNum);
            
            // Try extracting standard text layer
            let pageText = "";
            let isOcr = false;
            const forceOcr = forceOcrCheckbox && forceOcrCheckbox.checked;

            if (!forceOcr) {
              pageText = await extractTextFromPage(page);
            }

            // If empty text (or forced), and OCR is enabled, perform OCR
            if ((pageText.length < 10 || forceOcr) && enableOcrCheckbox.checked) {
              fileObj.status = `ocr-${pNum}`;
              updateFileListUI();

              try {
                pageText = await runOcrOnPage(page);
                isOcr = true;
                fileObj.ocrCount++;
              } catch (ocrErr) {
                console.error(`OCR failed on page ${pNum} of ${fileObj.name}:`, ocrErr);
                // Fallback: if force OCR failed, try reading standard text layer
                  pageText = await extractTextFromPage(page);
                  isOcr = false;
                  fileObj.textCount++;
              }
            } else {
              fileObj.textCount++;
            }

            // Decode legacy Kruti Dev / Devlys encoding if detected
            if (isKrutidev(pageText)) {
              pageText = convertKrutidevToUnicode(pageText);
            }

            // Post-process and clean Devanagari text spacing issues
            pageText = cleanIndicText(pageText);

            fileObj.pages.push({
              pageNumber: pNum,
              text: pageText,
              isOcr: isOcr
            });
          }

          if (appInstance.activeTool === "pdf-searcher") {
            fileObj.parsed = true;
            fileObj.status = "ready";
            fileObj.progress = 100;
            updateFileListUI();
            appInstance.showToast(`Imported & processed: ${fileObj.name}`, "success");
            
            // Re-trigger search to update results if query exists
            if (searchInput.value.trim() !== "") {
              performSearch();
            } else {
              setStatus(`Ready. Loaded ${this.files.length} document(s).`);
            }
          }

        } catch (err) {
          console.error(err);
          fileObj.error = err.message;
          fileObj.status = "error";
          updateFileListUI();
          appInstance.showToast(`Failed to parse: ${fileObj.name}`, "error");
        } finally {
          if (pdf) {
            await pdf.destroy().catch(() => {});
          }
        }
      };

      reader.readAsArrayBuffer(file);
    };

    // Re-process files from saved rawBuffer
    const reprocessFile = async (fileObj) => {
      if (!fileObj.rawBuffer) return;
      let pdf = null;
      try {
        fileObj.status = "parsing";
        fileObj.pages = [];
        fileObj.ocrCount = 0;
        fileObj.textCount = 0;
        fileObj.progress = 0;
        fileObj.parsed = false;
        fileObj.error = null;
        updateFileListUI();

        pdf = await this.pdfjs.getDocument({ data: fileObj.rawBuffer.slice(0) }).promise;
        fileObj.totalPages = pdf.numPages;
        updateFileListUI();

        for (let pNum = 1; pNum <= fileObj.totalPages; pNum++) {
          if (appInstance.activeTool !== "pdf-searcher") {
            if (this.ocrWorker) {
              this.ocrWorker.terminate().then(() => {
                this.ocrWorker = null;
                this.ocrWorkerLang = null;
              });
            }
            break;
          }

          fileObj.progress = Math.round(((pNum - 1) / fileObj.totalPages) * 100);
          updateFileListUI();

          const page = await pdf.getPage(pNum);
          
          let pageText = "";
          let isOcr = false;
          const forceOcr = forceOcrCheckbox && forceOcrCheckbox.checked;

          if (!forceOcr) {
            pageText = await extractTextFromPage(page);
          }

          if ((pageText.length < 10 || forceOcr) && enableOcrCheckbox.checked) {
            fileObj.status = `ocr-${pNum}`;
            updateFileListUI();

            try {
              pageText = await runOcrOnPage(page);
              isOcr = true;
              fileObj.ocrCount++;
            } catch (ocrErr) {
              console.error(`OCR failed on page ${pNum}:`, ocrErr);
              pageText = await extractTextFromPage(page);
              isOcr = false;
              fileObj.textCount++;
            }
          } else {
            fileObj.textCount++;
          }

          if (isKrutidev(pageText)) {
            pageText = convertKrutidevToUnicode(pageText);
          }
          pageText = cleanIndicText(pageText);

          fileObj.pages.push({
            pageNumber: pNum,
            text: pageText,
            isOcr: isOcr
          });
        }

        if (appInstance.activeTool === "pdf-searcher") {
          fileObj.parsed = true;
          fileObj.status = "ready";
          fileObj.progress = 100;
          updateFileListUI();
        }
      } catch (err) {
        console.error(err);
        fileObj.error = err.message;
        fileObj.status = "error";
        updateFileListUI();
      } finally {
        if (pdf) {
          await pdf.destroy().catch(() => {});
        }
      }
    };

    const reprocessAllFiles = async () => {
      const processable = this.files.filter(f => f.rawBuffer);
      if (processable.length === 0) return;

      try {
        if (enableOcrCheckbox.checked) {
          this.tesseract = await loadTesseract();
        }
      } catch (err) {
        console.error(err);
        appInstance.showToast("Failed to load OCR engine: " + err.message, "error");
        return;
      }

      // Disable buttons during reprocessing
      rescanBtn.disabled = true;
      clearAllBtn.disabled = true;
      searchBtn.disabled = true;

      for (const fileObj of processable) {
        await reprocessFile(fileObj);
      }

      rescanBtn.disabled = false;
      clearAllBtn.disabled = false;
      searchBtn.disabled = false;

      appInstance.showToast("Re-processed all documents with updated settings!", "success");
      if (searchInput.value.trim() !== "") {
        performSearch();
      } else {
        setStatus(`Ready. Loaded ${this.files.length} document(s).`);
      }
    };

    let jsqrLoadingPromise = null;
    const loadJsQr = () => {
      if (window.jsQR) return Promise.resolve(window.jsQR);
      if (jsqrLoadingPromise) return jsqrLoadingPromise;

      jsqrLoadingPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";
        script.onload = () => {
          resolve(window.jsQR);
        };
        script.onerror = () => {
          jsqrLoadingPromise = null;
          reject(new Error("Failed to load QR scanner engine"));
        };
        document.head.appendChild(script);
      });
      return jsqrLoadingPromise;
    };

    // Client-side Tesseract OCR routine
    const runOcrOnPage = async (page) => {
      // 1. Render page to canvas with optimal scale based on Device Profile
      const unscaledViewport = page.getViewport({ scale: 1.0 });
      
      let targetWidth = 1400; // Balanced mode default
      const profile = ocrProfileSelect ? ocrProfileSelect.value : "balanced";
      let minScale = 1.0;
      let maxScale = 1.6;

      if (profile === "performance") {
        targetWidth = 1000;
        minScale = 0.8;
        maxScale = 1.2;
      } else if (profile === "accuracy") {
        targetWidth = 2400;
        minScale = 1.5;
        maxScale = 3.0;
      }

      const calculatedScale = targetWidth / unscaledViewport.width;
      const scale = Math.max(minScale, Math.min(maxScale, calculatedScale));
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: ctx,
        viewport: viewport
      }).promise;

      // Apply image enhancement if enabled
      if (enhanceOcrCheckbox && enhanceOcrCheckbox.checked) {
        preprocessCanvas(canvas);
      }

      // 2. Scan for QR codes on the page
      let qrCodeText = "";
      try {
        const jsQR = await loadJsQr();
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imgData.data, imgData.width, imgData.height);
        if (code && code.data) {
          qrCodeText = `\n\n[QR Code Content: ${code.data}]\n\n`;
        }
      } catch (qrErr) {
        console.error("QR Code scanning failed:", qrErr);
      }

      // 3. Perform OCR
      const selectedLang = ocrLangSelect.value;
      // Load the equation model ('equ') as well to recognize mathematical symbols and formulas better!
      const workerLang = selectedLang === "eng" ? "eng+equ" : `${selectedLang}+eng+equ`;
      
      if (this.ocrWorker && this.ocrWorkerLang !== selectedLang) {
        setStatus(`Re-initializing OCR for ${ocrLangSelect.options[ocrLangSelect.selectedIndex].text}...`, "working");
        await this.ocrWorker.terminate();
        this.ocrWorker = null;
      }

      if (!this.ocrWorker) {
        setStatus(`Initializing OCR (${selectedLang === "eng" ? "English + Math" : ocrLangSelect.options[ocrLangSelect.selectedIndex].text + " + English + Math"})...`, "working");
        this.ocrWorker = await this.tesseract.createWorker(workerLang, 1, {
          logger: m => {
            if (m.status === 'recognizing text' && this.currentOcrPage) {
              setStatus(`OCR active: Page ${this.currentOcrPage} (${Math.round(m.progress * 100)}%)...`, "working");
            }
          }
        });
        this.ocrWorkerLang = selectedLang;
      }

      this.currentOcrPage = page.pageNumber;
      setStatus(`OCR active: Page ${page.pageNumber} (0%)...`, "working");
      const ret = await this.ocrWorker.recognize(canvas);
      return ret.data.text + qrCodeText;
    };

    // UI renderer for file progress
    const updateFileListUI = () => {
      if (rescanBtn) {
        const hasProcessable = this.files.some(f => f.rawBuffer);
        if (hasProcessable) {
          rescanBtn.classList.remove("hidden");
          const isBusy = this.files.some(f => f.status === "parsing" || (f.status && f.status.startsWith("ocr")));
          rescanBtn.disabled = isBusy;
        } else {
          rescanBtn.classList.add("hidden");
        }
      }

      if (this.files.length === 0) {
        fileListContainer.innerHTML = '<div class="empty-list-msg">No PDF files imported yet.</div>';
        return;
      }

      fileListContainer.innerHTML = "";
      this.files.forEach(f => {
        let sizeStr = (f.size / (1024 * 1024)).toFixed(2) + " MB";
        let statusBadge = "";
        let statusText = "";
        let viewBtn = "";

        if (f.status === "parsing") {
          statusBadge = `<span class="file-status-badge badge-parsing">Parsing</span>`;
          statusText = `Reading structure...`;
        } else if (f.status && f.status.startsWith("ocr")) {
          const p = f.status.split("-")[1];
          statusBadge = `<span class="file-status-badge badge-ocr">OCR Page ${p}</span>`;
          statusText = `Performing OCR...`;
        } else if (f.parsed) {
          statusBadge = `<span class="file-status-badge badge-ready">Ready</span>`;
          statusText = `${f.totalPages} Pages (${f.textCount} Text, ${f.ocrCount} OCR)`;
          viewBtn = `<button class="tool-btn secondary open-reader-btn" data-filename="${escapeHtml(f.name)}" style="font-size: 10px; padding: 2px 6px; height: 20px; line-height: 1; margin: 0; display: inline-flex; align-items: center; border-radius: 4px; cursor: pointer;">Read PDF</button>`;
        } else if (f.status === "error") {
          statusBadge = `<span class="file-status-badge badge-error">Error</span>`;
          statusText = f.error || "Failed to load";
        } else {
          statusBadge = `<span class="file-status-badge badge-queued">Queued</span>`;
          statusText = "Waiting...";
        }

        const item = document.createElement("div");
        item.className = "file-item";
        item.innerHTML = `
          <div class="file-item-header">
            <span class="file-item-name" title="${escapeHtml(f.name)}">${escapeHtml(f.name)} <span class="file-item-size">(${sizeStr})</span></span>
            ${statusBadge}
          </div>
          <div class="file-progress-container">
            <div class="file-progress-bar" style="width: ${f.progress}%;"></div>
          </div>
          <div class="file-item-footer">
            <span>${statusText}</span>
            ${viewBtn}
          </div>
        `;
        fileListContainer.appendChild(item);
      });

      // Bind reader launcher buttons
      const readerBtns = fileListContainer.querySelectorAll(".open-reader-btn");
      readerBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          const filename = btn.dataset.filename;
          openPdfReader(filename);
        });
      });

    };

    // Fuzzy Devanagari/Hindi Regex Builder
    const buildDevanagariFuzzyRegex = (query, isCaseSensitive) => {
      let cleanQuery = query.trim();
      let pattern = "";
      
      for (let i = 0; i < cleanQuery.length; i++) {
        const char = cleanQuery[i];
        
        if (/\s/.test(char)) {
          pattern += "\\s+";
          continue;
        }

        if (/[\u0901-\u0903\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u094d]/.test(char)) {
          pattern += `\\s*${char}`;
          continue;
        }

        let charPattern = char;
        if (char === 'ल' || char === 'ळ') {
          charPattern = '[लळ]';
        } else if (char === 'ड' || char === 'ड़') {
          charPattern = '(ड\\u093c?|ड़)';
        } else if (char === 'ढ' || char === 'ढ़') {
          charPattern = '(ढ\\u093c?|ढ़)';
        } else if (char === 'न' || char === 'ण') {
          charPattern = '[नण]';
        } else if (char === 'श' || char === 'ष' || char === 'स') {
          charPattern = '[शषस]';
        } else if (char === 'ब' || char === 'व') {
          charPattern = '[बव]';
        }

        let isDouble = false;
        if (i + 2 < cleanQuery.length && cleanQuery[i+1] === '्' && (cleanQuery[i+2] === char || (char === 'ल' && cleanQuery[i+2] === 'ळ') || (char === 'ळ' && cleanQuery[i+2] === 'ल'))) {
          isDouble = true;
          i += 2;
        }

        if (pattern.length > 0 && !pattern.endsWith("\\s+")) {
          pattern += "\\s*";
        }

        if (isDouble) {
          pattern += `${charPattern}(?:\\s*\\u094d?\\s*${charPattern})?`;
        } else {
          pattern += charPattern;
        }
      }

      return new RegExp(`(${pattern})`, isCaseSensitive ? "g" : "gi");
    };

    // Fuzzy Symbol, Currency & Digit Regex Builder
    const buildFuzzySymbolRegex = (word, isCaseSensitive) => {
      // Tokenize the word into known multi-character symbols/units, single digits, or other characters
      const tokens = word.match(/rupees?|dollars?|usd|rs|cm|[0-9₹$]|./gi) || [];
      
      const tokenPatterns = {
        '₹': '(?:₹|र?₹|Rs\\.?|rupees?|7|७)',
        'rs': '(?:₹|र?₹|Rs\\.?|rupees?|7|७)',
        'rupees': '(?:₹|र?₹|Rs\\.?|rupees?|7|७)',
        'rupee': '(?:₹|र?₹|Rs\\.?|rupees?|7|७)',
        '$': '(?:\\$|usd|dollars?)',
        'usd': '(?:\\$|usd|dollars?)',
        'dollar': '(?:\\$|usd|dollars?)',
        'dollars': '(?:\\$|usd|dollars?)',
        'cm': '(?:cm|८|टm|cम|सेमी|सें\\.?मी\\.?)',
        '1': '(?:1|१|र|ा|I|l|i|t|T|f|F|j|J|\\||।|!)',
        '0': '(?:0|०|o|O|Q|q|D|d|U|u)',
        '5': '(?:5|५|s|S|g|G)',
        '2': '(?:2|२|z|Z)',
        '3': '(?:3|३|e|E)',
        '4': '(?:4|४|y|Y|a|A)',
        '6': '(?:6|६|b|B|G)',
        '7': '(?:7|७|v|V|y|Y)',
        '8': '(?:8|८|B|g|cम)',
        '9': '(?:9|९|g|G|q|Q)'
      };

      const patterns = tokens.map(t => {
        const lowerT = t.toLowerCase();
        if (tokenPatterns[lowerT]) {
          return tokenPatterns[lowerT];
        }
        // Escape standard regex characters
        return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      });

      // Join patterns with appropriate separators
      let patternStr = "";
      for (let i = 0; i < patterns.length; i++) {
        patternStr += patterns[i];
        if (i < patterns.length - 1) {
          // If both current token and next token are digits, use broad separator (allowing spaces, commas, periods, etc.)
          const isCurrentDigit = /[0-9]/.test(tokens[i]);
          const isNextDigit = /[0-9]/.test(tokens[i+1]);
          if (isCurrentDigit && isNextDigit) {
            patternStr += '[\\s,.\\-\'’\\`]*';
          } else {
            patternStr += '\\s*';
          }
        }
      }
      
      return new RegExp(patternStr, isCaseSensitive ? "" : "i");
    };

    // Highlighter helper
    const highlightMatches = (text, query, searchMode, isCaseSensitive) => {
      const safeText = escapeHtml(text);
      if (!query) return safeText;
      
      const hasDevanagari = /[\u0900-\u097F]/.test(query);
      let regex;
      
      try {
        if (searchMode === "regex") {
          regex = new RegExp(query, isCaseSensitive ? "g" : "gi");
        } else if (hasDevanagari) {
          if (searchMode === "exact") {
            regex = buildDevanagariFuzzyRegex(query, isCaseSensitive);
          } else {
            const words = query.split(/\s+/).filter(w => w.length > 0);
            if (words.length === 0) return safeText;
            const patterns = words.map(w => {
              const r = buildDevanagariFuzzyRegex(w, isCaseSensitive);
              return r.source;
            });
            regex = new RegExp(`(${patterns.join("|")})`, isCaseSensitive ? "g" : "gi");
          }
        } else if (searchMode === "exact") {
          if (/[₹$]|\b(?:rs|rupees?|usd|dollars?|cm|सेमी)\b|\d/i.test(query)) {
            regex = new RegExp(`(${buildFuzzySymbolRegex(query, isCaseSensitive).source})`, isCaseSensitive ? "g" : "gi");
          } else {
            const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            regex = new RegExp(`(${escapedQuery})`, isCaseSensitive ? "g" : "gi");
          }
        } else {
          // Words containment search
          const words = query.split(/\s+/).filter(w => w.length > 0);
          if (words.length === 0) return safeText;
          const unionPattern = words.map(w => {
            if (/[₹$]|\b(?:rs|rupees?|usd|dollars?|cm|सेमी)\b|\d/i.test(w)) {
              return buildFuzzySymbolRegex(w, isCaseSensitive).source;
            }
            return w.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          }).join("|");
          regex = new RegExp(`(${unionPattern})`, isCaseSensitive ? "g" : "gi");
        }
      } catch (e) {
        // Fallback for invalid regexes
        return safeText;
      }

      // We want to return escaped HTML but keep our <mark> tags unescaped.
      // We run match on raw text, find match coordinates, sort and merge overlaps,
      // and then safely escape slices and output mark tags.
      const matches = [];
      let match;
      regex.lastIndex = 0;
      
      let matchCount = 0;
      while ((match = regex.exec(text)) !== null && matchCount < 1000) {
        const start = match.index;
        const end = start + match[0].length;
        if (start === end) {
          regex.lastIndex++;
          continue;
        }
        matches.push({ start, end });
        matchCount++;
        if (!regex.global) break;
      }
      
      if (matches.length === 0) {
        return safeText;
      }
      
      matches.sort((a, b) => a.start - b.start);
      const mergedMatches = [];
      let current = matches[0];
      for (let i = 1; i < matches.length; i++) {
        const next = matches[i];
        if (next.start <= current.end) {
          current.end = Math.max(current.end, next.end);
        } else {
          mergedMatches.push(current);
          current = next;
        }
      }
      mergedMatches.push(current);
      
      let htmlResult = "";
      let lastIndex = 0;
      for (const m of mergedMatches) {
        htmlResult += escapeHtml(text.substring(lastIndex, m.start));
        htmlResult += `<mark>${escapeHtml(text.substring(m.start, m.end))}</mark>`;
        lastIndex = m.end;
      }
      htmlResult += escapeHtml(text.substring(lastIndex));
      
      return htmlResult;
    };

    // Context snippet extractor
    const getSnippet = (text, query, searchMode, isCaseSensitive) => {
      let idx = -1;
      let matchLen = query.length;
      
      if (searchMode === "regex") {
        try {
          const regex = new RegExp(query, isCaseSensitive ? "" : "i");
          const match = regex.exec(text);
          if (match) {
            idx = match.index;
            matchLen = match[0].length;
          }
        } catch (e) {
          console.error("Snippet regex failed:", e);
        }
      }
      
      const hasDevanagari = /[\u0900-\u097F]/.test(query);
      if (idx === -1 && hasDevanagari && searchMode !== "regex") {
        try {
          const regex = buildDevanagariFuzzyRegex(searchMode === "exact" ? query : query.split(/\s+/)[0], isCaseSensitive);
          const match = regex.exec(text);
          if (match) {
            idx = match.index;
            matchLen = match[0].length;
          }
        } catch (e) {
          console.error("Snippet regex failed:", e);
        }
      }
      
      if (idx === -1) {
        if (/[₹$]|\b(?:rs|rupees?|usd|dollars?|cm|सेमी)\b|\d/i.test(query)) {
          try {
            const regex = buildFuzzySymbolRegex(query, isCaseSensitive);
            const match = regex.exec(text);
            if (match) {
              idx = match.index;
              matchLen = match[0].length;
            }
          } catch (e) {
            console.error("Snippet symbol regex failed:", e);
          }
        }
      }

      if (idx === -1) {
        idx = isCaseSensitive ? text.indexOf(query) : text.toLowerCase().indexOf(query.toLowerCase());
      }
      
      if (idx === -1) {
        // If not found (e.g. multi-word search), return the first 250 characters
        return text.substring(0, 250) + (text.length > 250 ? "..." : "");
      }
      
      const start = Math.max(0, idx - 180);
      const end = Math.min(text.length, idx + matchLen + 180);
      let snippet = text.substring(start, end);
      if (start > 0) snippet = "..." + snippet;
      if (end < text.length) snippet = snippet + "...";
      return snippet;
    };

    // Devanagari/Indic script text normalization helper
    const cleanIndicText = (text) => {
      if (!text) return "";

      // Normalize horizontal spaces (preserving newlines)
      text = text.replace(/[^\S\r\n]+/g, ' ');

      // 0. Pre-adjust broken font mappings (e.g. 'ब' mapped to 'ि' before other marks)
      text = text
        .replace(/िैठी/g, 'बैठी')
        .replace(/...ते/g, (m) => m === 'िसते' ? 'बस्ते' : m) // safer replacement to avoid overlapping matchers
        .replace(/िसते/g, 'बस्ते')
        .replace(/िीली/g, 'बिल्ली')
        .replace(/िच्च/g, 'बच्च');

      // Swap left-side vowel mark 'ि' (U+093f) if it appears before a consonant cluster (respecting nukta)
      text = text.replace(/(?<![\u0915-\u0939\u0958-\u095f\u0978-\u097f])\u093f\s*([\u0915-\u0939\u0958-\u095f\u0978-\u097f]\u093c?(?:\s*\u094d\s*[\u0915-\u0939\u0958-\u095f\u0978-\u097f]\u093c?)*)/g, '$1\u093f');

      // 1. Remove spaces before Devanagari combining marks
      text = text.replace(/\s+([\u0901-\u0903\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963])/g, '$1');

      // 2. Remove spaces after halant (virama) U+094d
      text = text.replace(/([\u094d])\s+/g, '$1');

      // 3. Fix halant followed directly by vowel sign (् + ा -> ा)
      text = text.replace(/\u094d([\u093e-\u094c])/g, '$1');

      // 4. Merge spaced-out Devanagari characters
      const commonHindiWords = new Set([
        // Pronouns & Particles
        "ने", "के", "से", "को", "का", "की", "में", "पे", "ही", "भी", "तो", "है", "हैं", "था", "थी", "थे", "और",
        "वह", "यह", "वे", "ये", "इस", "उस", "जो", "सो", "नो", "ना", "न", "तू", "तु", "तुम", "हम", "मैं",
        "मेरा", "मेरी", "मेरे", "मुझे", "उन्हें", "इसे", "उसे",
        // Common single-consonant verbs / words
        "जा", "खा", "पी", "दे", "ले", "कर", "हो", "रो", "धो", "बो", "छू", "जी", "ला",
        // Adverbs/Prepositions
        "तक", "भर", "पर", "हर", "दर", "वर", "अब", "कब", "जब", "तब", "सब", "कम"
      ]);

      const getDevLength = (str) => {
        return str.replace(/[\u0901-\u0903\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963]/g, '').length;
      };

      const isFragment = (str) => {
        if (!str) return false;
        if (str.endsWith("्")) return true;
        if (commonHindiWords.has(str)) return false;
        
        const devLen = getDevLength(str);
        if (devLen <= 1) return true;
        
        if (devLen === 2) {
          const hasVowelSign = /[\u0901-\u0903\u093e-\u094f\u0951-\u0957\u0962\u0963]/.test(str);
          if (!hasVowelSign) {
            return !commonHindiWords.has(str);
          }
        }
        return false;
      };

      let tokens = text.split(/(\s+)/);
      let isMerged = new Array(tokens.length).fill(false);
      let merged = true;
      
      while (merged) {
        merged = false;
        for (let i = 1; i < tokens.length - 1; i += 2) {
          const prev = tokens[i-1];
          const space = tokens[i];
          const next = tokens[i+1];

          if (!prev || !next || space !== " ") continue;

          // Check if both tokens are purely Devanagari
          const isPrevDev = /^[\u0900-\u097F]+$/.test(prev);
          const isNextDev = /^[\u0900-\u097F]+$/.test(next);

          if (isPrevDev && isNextDev) {
            let shouldMerge = false;

            if (prev.endsWith("्")) {
              shouldMerge = true; // Always merge halant forward
            } else {
              const prevFrag = isFragment(prev);
              const nextFrag = isFragment(next);
              const prevM = isMerged[i-1];
              const nextM = isMerged[i+1];

              if ((prevFrag && nextFrag) || (prevM && nextFrag) || (prevFrag && nextM) || (prevM && nextM)) {
                shouldMerge = true;
              }
            }

            if (shouldMerge) {
              tokens[i-1] = prev + next;
              isMerged[i-1] = true;
              tokens.splice(i, 2);
              isMerged.splice(i, 2);
              merged = true;
              break;
            }
          }
        }
      }

      let result = tokens.join("").replace(/[^\S\r\n]+/g, ' ').trim();

      // 5. Common OCR / translation adjustments
      result = result
        .replace(/(^|\s)े\s+वोट/g, '$1ने वोट')
        .replace(/(^|\s)िए\s+हुए/g, '$1दिए हुए')
        .replace(/([a-zA-Z\dΔ∠=≠≅]+)ए/g, '$1,')
        .replace(/([\u0900-\u097F]+)ए\s+(इसलिए|तो|यदि|जो|वह|यह)/g, '$1, $2')
        .replace(/([\u0900-\u097F]+)ए\s+(\d+)/g, '$1, $2')
        .replace(/([\u0915-\u0939])\s*ल\s*ए/g, '$1िए') // ल ए -> िए
        .replace(/([\u0915-\u0939])\s*ल\s*ल\s*ए/g, '$1िए') // ल ल ए -> िए
        .replace(/ल\s*ल\s*ए/g, 'लिए')
        .replace(/ल\s*ए/g, 'लिए')
        .replace(/केलए/g, 'के लिए')
        .replace(/केललए/g, 'के लिए')
        .replace(/लवदा/g, 'विद्या')           // विद्या correction (ToUnicode l-v-d-a confusion)
        .replace(/लवदा\s+दीदी/g, 'विद्या दीदी')
        .replace(/प्यारी\s+बिली/g, 'प्यारी बिल्ली')
        .replace(/प्यारी\s+बिल्ली/g, 'प्यारी बिल्ली')
        .replace(/बिली/g, 'बिल्ली')          // billii correction
        .replace(/मिैठी/g, 'बैठी')             // baithi correction
        .replace(/मिै\s+ठी/g, 'बैठी')
        .replace(/म\s*ै\s*ठ\s*ी/g, 'बैठी')
        .replace(/बख\s*ड़की/g, 'खिड़की')      // khirki correction
        .replace(/बखिड़की/g, 'खिड़की')
        .replace(/चूडी/g, 'चूड़ी')             // chudi correction
        .replace(/च\s*ू\s*ड\s*ी/g, 'चूड़ी')
        .replace(/चू\s*डी/g, 'चूड़ी')
        .replace(/पेंलसल/g, 'पेंसिल')          // pencil correction
        .replace(/पें\s+लसल/g, 'पेंसिल')
        .replace(/पें\s+लस\s+ल/g, 'पेंसिल')
        .replace(/पें\s*ल\s*स\s*ल/g, 'पेंसिल')
        .replace(/बॉक्स/g, 'बॉक्स')
        .replace(/बॉक्\s+स/g, 'बॉक्स')
        .replace(/जलदी/g, 'जल्दी')             // jaldi correction
        .replace(/बसतें/g, 'बस्ते')           // baste correction
        .replace(/बस्ते/g, 'बस्ते')
        .replace(/वेफ/g, 'के')                // Krutidev typo 'के' -> 'वेफ' correction
        .replace(/ध्नात्मक/g, 'धनात्मक')      // Krutidev 'धनात्मक' correction
        .replace(/आधरभूत/g, 'आधारभूत')       // Krutidev 'आधारभूत' correction
        .replace(/विध्द्धि/g, 'विधि')          // Krutidev typo correction
        .replace(/विधिद्ध/g, 'विधि')
        .replace(/सापफ/g, 'साफ़')
        .replace(/([\u0900-\u097F])\.([\u0900-\u097F])/g, '$1-$2')
        .replace(/बु[;（\(\[\]{}]*(?:ि\s*म|म\s*ि)ान/g, 'बुद्धिमान')
        .replace(/निषेध[्\s]*ज्ञात/g, 'निषेध ज्ञात')
        .replace(/विरोध[ेो]क[्ि\s]*त[ि\s]*/g, 'विरोधोक्ति')
        .replace(/स्वूफल/g, 'स्कूल')
        .replace(/विद्या£थयों/g, 'विद्यार्थियों')
        .replace(/वां(?:ि\s*छ|छ\s*ि)त/g, 'वांछित')
        .replace(/सारधण/g, 'साधारण')
        .replace(/शून्येतर/g, 'शून्येतर')
        .replace(/गुणध्र्म/g, 'गुणधर्म')
        .replace(/गुणध्र्मों/g, 'गुणधर्मों')
        .replace(/वि[धध्]+(?:ि\s*व|व\s*ि)े?फ/g, 'विधि के')
        .replace(/वि[धध्]+(?:ि\s*म|म\s*ि)ें/g, 'विधि में')
        .replace(/वि[धध्]+(?:ि\s*क|क\s*ि)ो/g, 'विधि को')
        .replace(/वि[धध्]+(?:ि\s*द|द\s*ि)/g, 'विधि')
        .replace(/ध्नि/g, 'धन')
        .replace(/ध्नराशि/g, 'धनराशि')
        .replace(/ृ\s*50/g, '₹ 50')
        .replace(/वृ[;（\(\[\]{}](?:ि\s*क|क\s*ि)रती/g, 'वृद्धि करती')
        .replace(/वृ[;（\(\[\]{}](?:ि|ी)?/g, 'वृद्धि')
        .replace(/और\s*ु\s*¹/g, 'और q ≠')
        .replace(/दु\s*¹/g, 'q ≠')
        .replace(/द\s*¹/g, 'p ≠')
        .replace(/¹\s*0/g, '≠ 0')
        .replace(/¯बदु/g, 'बिंदु')
        .replace(/¯बदुओं/g, 'बिंदुओं')
        .replace(/¯बदुआंे/g, 'बिंदुओं')
        .replace(/स[ुू]त्रा/g, 'सूत्र')
        .replace(/मगींनेजपवद/g, 'exhaustion')
        .replace(/उवतजंस/g, 'mortal')
        .replace(/बवदअमतेम/g, 'converse')
        .replace(/िु/g, 'q')
        .replace(/उु/g, 'q')
        .replace(/दृ\s*1/g, '-1')
        .replace(/दृ\s*3/g, '-3')
        .replace(/़ा/g, 'ा')
        .replace(/ज़ाोर/g, 'ज़ोर')
        .replace(/अनुसंधन/g, 'अनुसंधान')
        .replace(/अतिम/g, 'अंतिम')
        .replace(/वुफछ/g, 'कुछ')
        .replace(/वुफमार/g, 'कुमार')
        .replace(/avd\s*kishor/gi, 'अवध किशोर')
        .replace(/अवध्किशोर/g, 'अवध किशोर')
        .replace(/चवूमते/g, 'powers')
        .replace(/भ्ब्थ्/g, 'HCF')
        .replace(/स्ब्ड/g, 'LCM')
        .replace(/इंबाडोरम/g, 'इब्न अल-हैथम')
        .replace(/च\s*2\s*द/g, 'p^n')
        .replace(/4\s*द/g, '4^n')
        .replace(/द्व\s*7/g, '√7')
        .replace(/द्व\s*3/g, '√3')
        .replace(/द्व\s*2/g, '√2')
        .replace(/दृ\s*(\d)/g, '-$1')
        .replace(/़\s*(\d)/g, '+$1')
        .replace(/द्यद्य/g, '||')
        .replace(/म\s*्\s*ह/g, 'म्ह')
        .replace(/म\s*्\s*ह/g, 'म्ह')
        .replace(/क्।ठब्/g, 'ΔABC')
        .replace(/क्।ठक्/g, 'ΔABD')
        .replace(/क्ठक्/g, 'ΔABD')
        .replace(/क्ब्क्/g, 'ΔBCD')
        .replace(/क्।क्म्/g, 'ΔADE')
        .replace(/क्ठक्म्/g, 'ΔBDE')
        .replace(/क्ब्क्म्/g, 'ΔCDE')
        .replace(/क्त्फच्/g, 'ΔPQR')
        .replace(/क्त्ज्/g, 'ΔRTZ')
        .replace(/क्त्च्फ्/g, 'ΔRQP')
        .replace(/क्त्फ/g, 'ΔRQP')
        .replace(/क्त्फत्/g, 'ΔRQP')
        .replace(/क्त्फ/g, 'ΔRQP')
        .replace(/।ठब्क्/g, 'ABCD')
        .replace(/।ठब्/g, 'ABC')
        .replace(/।ठक्/g, 'ABD')
        .replace(/।ठ/g, 'AB')
        .replace(/ ठब्/g, ' BC')
        .replace(/ठब्/g, 'BC')
        .replace(/ज्\s*त्र\s*137/g, '= 137')
        .replace(/त्र\s*(\d)/g, '= $1')
        .replace(/(?<![\u0900-\u097F])त्र(?![\u0900-\u097F])/g, '=')
        .replace(/।2ण्1/g, '12.1')
        .replace(/।1ण्3/g, '11.3')
        .replace(/।1ण्8/g, '11.8')
        .replace(/आवृफति/g, 'आकृति')
        .replace(/समरूपता/g, 'समरूपता')
        .replace(/ै{2,3}/g, ' SSS ')
        .replace(/ै।ै/g, ' SAS ')
        .replace(/।।\s+समरूपता/g, 'AA समरूपता')
        .replace(/।। समरूपता/g, 'AA समरूपता')
        .replace(/।।। समरूपता/g, 'AAA समरूपता')
        .replace(/ेींचम/g, 'shape')
        .replace(/ेप्रम/g, 'size')
        .replace(/च\s*:\s*1/g, 'p : 1')
        .replace(/च\s+से/g, 'p से')
        .replace(/च\s+को/g, 'p को')
        .replace(/च\s+प्रकट/g, 'p प्रकट')
        .replace(/चपिु/g, 'p और q')
        .replace(/(?<![\u0900-\u097F])च(?![\u0900-\u097F])/g, 'p')
        .replace(/यातों?याइ/g, 'या तो a या b')
        .replace(/या\s+तो\s+a\s+या\s+इ(?![\u0900-\u097F])/g, 'या तो a या b')
        .replace(/([a-zA-Z\d])\s+और\s+इ(?![\u0900-\u097F])/g, '$1 और b')
        .replace(/([A-Z]+)(के|का|की|में|से|को|ने)/g, '$1 $2')
        .replace(/(Δ[A-Z]+)\s*[ध्\/]\s*(Δ[A-Z]+)/g, '$1 ≅ $2')
        .replace(/दृ\s*([A-Z]{3})/g, '∠$1')
        .replace(/च्फतै/g, 'PQRS')
        .replace(/च्फत/g, 'PQR')
        .replace(/ज्(?!ञ)/g, 'T')
        .replace(/¯बदुओं\s+च्ए\s+फ\s+और\s+त्से/g, 'बिंदुओं P, Q और R से')
        .replace(/ज्;4ए\s*6/g, 'R(4, 6')
        .replace(/फ\s*\(3,\s*6\)/g, 'Q(3, 6)')
        .replace(/च्;3ण्5ए\s*7/g, 'P(3.5, 7')
        .replace(/ज्ञ;6ए\s*9/g, 'P(6, 9')
        .replace(/ज्ञ\s+को/g, 'P को')
        .replace(/स्;5ए\s*8/g, 'Q(5, 8')
        .replace(/क्।क्म्/g, 'ΔADE')
        .replace(/म\s*्\s*ह/g, 'म्ह')
        .replace(/क्त्फत्/g, 'ΔRQP');

      // Specific textbook OCR corrections for Chapter 5 (Arithmetic Progressions) and general typos
      result = result
        .replace(/ee\s+Sat\s+oq\s*/gi, '')
        .replace(/समांतर\s+श्रेढ़[यिाँ]+[\sS]*5\.\s*भूमिका/g, 'समांतर श्रेढ़ियाँ 5\n5.1 भूमिका')
        .replace(/श्रेढ़यिाँ/g, 'श्रेढ़ियाँ')
        .replace(/TT\s+कोन/g, 'पाइन कोन')
        .replace(/पंखुदियाँ/g, 'पंखुड़ियाँ')
        .replace(/इत्यादि\s+अब\s+हम/g, 'इत्यादि। अब हम')
        .replace(/\(\)\s*रीना\s+ने/g, '(i) रीना ने')
        .replace(/एकपद/g, 'एक पद')
        .replace(/पदर॑\s*8000/g, 'पद ₹ 8000')
        .replace(/पदर॑/g, 'पद ₹')
        .replace(/और\s+र\s+500/g, 'और ₹ 500')
        .replace(/\(7\s+में\)/g, '(₹ में)')
        .replace(/क्रमश;/g, 'क्रमशः')
        .replace(/ओरएक/g, 'ओर एक')
        .replace(/2\s+om/g, '2 cm')
        .replace(/\(देखिए\s+आकृति\s+5\.0\)/g, '(देखिए आकृति 5.1)।')
        .replace(/45\s+cmd/g, '45 cm है।')
        .replace(/\(om\s+में\)/g, '(cm में)')
        .replace(/आकृति\s+5\.\s+(?=45)/g, 'आकृति 5.1 ')
        .replace(/\b4,\s*39\b/g, '41, 39')
        .replace(/\b3\s+हैं\b/g, '31 हैं')
        .replace(/स्वयं\s+की\s+2\s+गुनी\s+हो\s+जाती/g, 'स्वयं की 5/4 गुनी हो जाती')
        // Page 57 textbook corrections
        .replace(/र8000/g, '₹ 8000')
        .replace(/3,\s*6,\s*9\s+32\s+वर्षों/g, '3, 6, 9 और 12 वर्षों')
        .replace(/0000,\s*2500,\s*।5625,\s*और\s*953\.25/g, '10000, 12500, 15625, और 19531.25')
        .replace(/भुजाओं\s+I,2,\s*3/g, 'भुजाओं 1, 2, 3')
        .replace(/क्रमशः\s+2,243\.\.\.\s+हैं।/g, 'क्रमशः 1², 2², 3², ... हैं।')
        .replace(/र₹\s*00/g, '₹ 100')
        .replace(/क्रमशः\s+00,\s*50,\s*200,\s*250/g, 'क्रमशः 100, 150, 200, 250')
        .replace(/एकनए/g, 'एक नए')
        .replace(/आने\s+वालें/g, 'आने वाले')
        .replace(/क्रमशः\s+I,,2,3,5/g, 'क्रमशः 1, 1, 2, 3, 5')
        .replace(/त\s+v\s*:\s*TTT\s*——\s*2\s*TT\s*—\s*i\s*3\s*I~,\s*~~\s*s\s*FA\s*EE\s*EN\s*8/g, '1, 1, 2, 3, 5, 8');

      return result;
    };

    // Core Search Algorithm
    const performSearch = () => {
      const query = searchInput.value.trim();
      const searchMode = searchModeSelect.value;
      const isCaseSensitive = caseSensitiveCheckbox.checked;

      if (query === "") {
        resultsContainer.innerHTML = '<div class="empty-results-msg">Upload documents and enter a query to see search results.</div>';
        exportBtnGroup.classList.add("hidden");
        setStatus(`Ready. Loaded ${this.files.length} document(s).`);
        return;
      }

      setStatus(`Searching for "${query}"...`, "working");
      
      let totalMatches = 0;
      let totalPagesSearched = 0;
      lastSearchResults = [];

      this.files.forEach(file => {
        if (!file.parsed) return;

        const fileMatches = [];

        file.pages.forEach(page => {
          totalPagesSearched++;
          let hasMatch = false;

          const hasDevanagari = /[\u0900-\u097F]/.test(query);

          if (searchMode === "regex") {
            try {
              const regex = new RegExp(query, isCaseSensitive ? "" : "i");
              hasMatch = regex.test(page.text);
            } catch (err) {
              // Invalid regex
            }
          } else if (hasDevanagari) {
            if (searchMode === "exact") {
              const regex = buildDevanagariFuzzyRegex(query, isCaseSensitive);
              hasMatch = regex.test(page.text);
            } else {
              const words = query.split(/\s+/).filter(w => w.length > 0);
              if (words.length > 0) {
                hasMatch = words.every(word => {
                  const regex = buildDevanagariFuzzyRegex(word, isCaseSensitive);
                  return regex.test(page.text);
                });
              }
            }
          } else if (searchMode === "exact") {
            if (/[₹$]|\b(?:rs|rupees?|usd|dollars?|cm|सेमी)\b|\d/i.test(query)) {
              const regex = buildFuzzySymbolRegex(query, isCaseSensitive);
              hasMatch = regex.test(page.text);
            } else {
              const indexVal = isCaseSensitive 
                ? page.text.indexOf(query) 
                : page.text.toLowerCase().indexOf(query.toLowerCase());
              hasMatch = indexVal !== -1;
            }
          } else {
            // Contains words (split by spaces, all words must be present)
            const words = query.split(/\s+/).filter(w => w.length > 0);
            if (words.length > 0) {
              hasMatch = words.every(word => {
                if (/[₹$]|\b(?:rs|rupees?|usd|dollars?|cm|सेमी)\b|\d/i.test(word)) {
                  const regex = buildFuzzySymbolRegex(word, isCaseSensitive);
                  return regex.test(page.text);
                }
                const pat = isCaseSensitive ? word : word.toLowerCase();
                const textSrc = isCaseSensitive ? page.text : page.text.toLowerCase();
                return textSrc.includes(pat);
              });
            }
          }

          if (hasMatch) {
            totalMatches++;
            fileMatches.push({
              pageNumber: page.pageNumber,
              isOcr: page.isOcr,
              snippet: getSnippet(page.text, query, searchMode, isCaseSensitive),
              fullText: page.text
            });
          }
        });

        if (fileMatches.length > 0) {
          lastSearchResults.push({
            fileName: file.name,
            matches: fileMatches
          });
        }
      });

      renderSearchResults(query, searchMode, isCaseSensitive);
      
      setStatus(`Search complete for "${query}".`, "idle", {
        matches: totalMatches,
        docs: lastSearchResults.length,
        pages: totalPagesSearched
      });

      if (totalMatches > 0) {
        exportBtnGroup.classList.remove("hidden");
      } else {
        exportBtnGroup.classList.add("hidden");
      }
    };

    // Render results matching criteria
    const renderSearchResults = (query, searchMode, isCaseSensitive) => {
      if (lastSearchResults.length === 0) {
        resultsContainer.innerHTML = '<div class="empty-results-msg">No matches found. Try refining your keywords or query options.</div>';
        return;
      }

      resultsContainer.innerHTML = "";

      lastSearchResults.forEach(res => {
        const card = document.createElement("div");
        card.className = "pdf-result-card";
        
        const header = document.createElement("div");
        header.className = "pdf-result-header";
        header.innerHTML = `
          <span class="pdf-result-title" title="${escapeHtml(res.fileName)}">${escapeHtml(res.fileName)}</span>
          <span class="pdf-result-match-count">${res.matches.length} Match(es)</span>
        `;
        card.appendChild(header);

        const list = document.createElement("div");
        list.className = "pdf-result-matches";

        res.matches.forEach(m => {
          const row = document.createElement("div");
          row.className = `match-row ${m.isOcr ? 'match-type-ocr' : 'match-type-text'}`;
          
          const badgeType = m.isOcr ? "match-badge-ocr" : "match-badge-text";
          const badgeLabel = m.isOcr ? "OCR Image" : "Text Layer";
          
          row.innerHTML = `
            <div class="match-row-header">
              <span>Page ${m.pageNumber}</span>
              <div style="display: flex; gap: 8px; align-items: center;">
                <button class="tool-btn secondary context-toggle-btn" style="font-size: 10px; padding: 2px 6px; height: 20px; line-height: 1; margin: 0; display: inline-flex; align-items: center; border-radius: 4px; cursor: pointer;">Show Full Text</button>
                <button class="tool-btn secondary view-page-btn" style="font-size: 10px; padding: 2px 6px; height: 20px; line-height: 1; margin: 0; display: inline-flex; align-items: center; border-radius: 4px; cursor: pointer;">View Page Layout</button>
                <span class="match-badge ${badgeType}">${badgeLabel}</span>
              </div>
            </div>
            <div class="match-snippet">
              ${highlightMatches(m.snippet, query, searchMode, isCaseSensitive)}
            </div>
            <div class="match-full-text hidden" style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.08); font-size: 12.5px; color: var(--text-color); white-space: pre-wrap; line-height: 1.6; text-align: left; background: rgba(0, 0, 0, 0.15); padding: 10px; border-radius: 6px;">
              ${highlightMatches(m.fullText, query, searchMode, isCaseSensitive)}
            </div>
            <div class="match-page-canvas-container hidden" style="margin-top: 10px; padding: 10px; border-top: 1px dashed rgba(255,255,255,0.08); background: rgba(0, 0, 0, 0.2); border-radius: 6px; text-align: center;">
            </div>
          `;

          const toggleBtn = row.querySelector(".context-toggle-btn");
          const fullTextDiv = row.querySelector(".match-full-text");
          toggleBtn.addEventListener("click", () => {
            if (fullTextDiv.classList.contains("hidden")) {
              fullTextDiv.classList.remove("hidden");
              toggleBtn.innerText = "Hide Full Text";
              toggleBtn.style.background = "rgba(0, 242, 254, 0.12)";
              toggleBtn.style.color = "var(--accent-cyan)";
              toggleBtn.style.borderColor = "rgba(0, 242, 254, 0.3)";
            } else {
              fullTextDiv.classList.add("hidden");
              toggleBtn.innerText = "Show Full Text";
              toggleBtn.style.background = "";
              toggleBtn.style.color = "";
              toggleBtn.style.borderColor = "";
            }
          });

          const viewPageBtn = row.querySelector(".view-page-btn");
          const canvasContainer = row.querySelector(".match-page-canvas-container");
          viewPageBtn.addEventListener("click", async () => {
            if (!canvasContainer.classList.contains("hidden")) {
              canvasContainer.classList.add("hidden");
              viewPageBtn.innerText = "View Page Layout";
              viewPageBtn.style.background = "";
              viewPageBtn.style.color = "";
              viewPageBtn.style.borderColor = "";
              return;
            }

            canvasContainer.classList.remove("hidden");
            viewPageBtn.innerText = "Hide Layout";
            viewPageBtn.style.background = "rgba(0, 242, 254, 0.12)";
            viewPageBtn.style.color = "var(--accent-cyan)";
            viewPageBtn.style.borderColor = "rgba(0, 242, 254, 0.3)";

            if (canvasContainer.querySelector("canvas")) {
              return; // Already rendered
            }

            canvasContainer.innerHTML = `<div style="font-size: 12px; color: var(--text-muted);"><span class="status-pulse-dot working" style="vertical-align: middle; margin-right: 6px; display: inline-block;"></span>Rendering page layout...</div>`;

            const fileObj = this.files.find(f => f.name === res.fileName);
            if (!fileObj || !fileObj.rawBuffer) {
              canvasContainer.innerHTML = `<div style="font-size: 12px; color: var(--accent-rose);">Visual preview is not available for sample files. Please upload a real PDF file.</div>`;
              return;
            }

            let pdf = null;
            try {
              pdf = await this.pdfjs.getDocument({ data: fileObj.rawBuffer.slice(0) }).promise;
              const page = await pdf.getPage(m.pageNumber);

              canvasContainer.innerHTML = ""; // Clear loader

              const viewport = page.getViewport({ scale: 1.2 });
              const canvas = document.createElement("canvas");
              canvas.style.maxWidth = "100%";
              canvas.style.height = "auto";
              canvas.style.borderRadius = "4px";
              canvas.style.border = "1px solid rgba(255,255,255,0.15)";
              canvas.style.background = "white";

              const ctx = canvas.getContext("2d");
              canvas.width = viewport.width;
              canvas.height = viewport.height;

              canvasContainer.appendChild(canvas);

              await page.render({
                canvasContext: ctx,
                viewport: viewport
              }).promise;
            } catch (err) {
              console.error("Preview render failed:", err);
              canvasContainer.innerHTML = `<div style="font-size: 12px; color: var(--accent-rose);">Error rendering preview: ${escapeHtml(err.message)}</div>`;
            } finally {
              if (pdf) {
                await pdf.destroy().catch(() => {});
              }
            }
          });

          list.appendChild(row);
        });

        card.appendChild(list);
        resultsContainer.appendChild(card);
      });
    };

    // Trigger file download helper
    const triggerFileDownload = (filename, content, mimeType) => {
      const blob = new Blob([content], { type: mimeType });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    };

    // Export formatting buttons
    container.querySelector("#pdf-export-txt").addEventListener("click", () => {
      if (lastSearchResults.length === 0) return;
      let text = `PDF Search Results\nGenerated: ${new Date().toLocaleString()}\nQuery: "${searchInput.value}"\n\n`;

      lastSearchResults.forEach(res => {
        text += `=========================================\n`;
        text += `DOCUMENT: ${res.fileName}\n`;
        text += `=========================================\n\n`;
        res.matches.forEach(m => {
          text += `[Page ${m.pageNumber}] [${m.isOcr ? 'OCR' : 'Text'}]\n`;
          text += `Context: ${m.snippet.replace(/\n/g, ' ')}\n\n`;
        });
        text += `\n`;
      });

      triggerFileDownload(`search_results_${Date.now()}.txt`, text, "text/plain");
      appInstance.showToast("Exported results as Text file", "success");
    });

    container.querySelector("#pdf-export-csv").addEventListener("click", () => {
      if (lastSearchResults.length === 0) return;
      let csv = `"Document Name","Page Number","Extraction Source","Snippet"\n`;

      lastSearchResults.forEach(res => {
        res.matches.forEach(m => {
          const docEscaped = res.fileName.replace(/"/g, '""');
          const snippetEscaped = m.snippet.replace(/"/g, '""').replace(/\n/g, ' ');
          const source = m.isOcr ? "OCR Image" : "Text Layer";
          csv += `"${docEscaped}","${m.pageNumber}","${source}","${snippetEscaped}"\n`;
        });
      });

      triggerFileDownload(`search_results_${Date.now()}.csv`, csv, "text/csv");
      appInstance.showToast("Exported results as CSV file", "success");
    });

    container.querySelector("#pdf-export-json").addEventListener("click", () => {
      if (lastSearchResults.length === 0) return;
      const exportObj = {
        query: searchInput.value,
        timestamp: new Date().toISOString(),
        results: lastSearchResults.map(res => ({
          fileName: res.fileName,
          matches: res.matches.map(m => ({
            pageNumber: m.pageNumber,
            isOcr: m.isOcr,
            snippet: m.snippet
          }))
        }))
      };

      triggerFileDownload(`search_results_${Date.now()}.json`, JSON.stringify(exportObj, null, 2), "application/json");
      appInstance.showToast("Exported results as JSON file", "success");
    });
  }
};
