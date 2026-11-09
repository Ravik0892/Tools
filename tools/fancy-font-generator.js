import { escapeHtml } from './utils.js';

let appInstance = null;

// Persistent favorites storage key
const FAV_STORAGE_KEY = "omnitool_fav_fonts";

// Safe localStorage helper for favorites
function getSavedFavorites() {
  try {
    const raw = localStorage.getItem(FAV_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ["bold-script", "script", "gothic", "small-caps", "royal-crown", "angel-wings"];
  } catch (e) {
    return ["bold-script", "script", "gothic", "small-caps", "royal-crown", "angel-wings"];
  }
}

function saveFavorites(favs) {
  try {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favs));
  } catch (e) {}
}

// Circled & Black Circled Numbers Map
const CIRCLED_DIGITS = {
  "0": "\u{24EA}", "1": "\u{2460}", "2": "\u{2461}", "3": "\u{2462}", "4": "\u{2463}",
  "5": "\u{2464}", "6": "\u{2465}", "7": "\u{2466}", "8": "\u{2467}", "9": "\u{2468}"
};

const BLACK_CIRCLED_DIGITS = {
  "0": "\u{24FF}", "1": "\u{2776}", "2": "\u{2777}", "3": "\u{2778}", "4": "\u{2779}",
  "5": "\u{277A}", "6": "\u{277B}", "7": "\u{277C}", "8": "\u{277D}", "9": "\u{277E}"
};

const PAREN_DIGITS = {
  "0": "(0)", "1": "\u{2474}", "2": "\u{2475}", "3": "\u{2476}", "4": "\u{2477}", "5": "\u{2478}",
  "6": "\u{2479}", "7": "\u{247A}", "8": "\u{247B}", "9": "\u{247C}"
};

// Helper to map ASCII letters to Unicode blocks
function mapAlpha(text, upperOffset, lowerOffset, digitOffset = null, overrides = {}) {
  return text.split("").map(c => {
    if (overrides[c]) return overrides[c];
    const code = c.charCodeAt(0);
    // Uppercase A-Z
    if (code >= 65 && code <= 90 && upperOffset) {
      return String.fromCodePoint(upperOffset + (code - 65));
    }
    // Lowercase a-z
    if (code >= 97 && code <= 122 && lowerOffset) {
      return String.fromCodePoint(lowerOffset + (code - 97));
    }
    // Digits 0-9
    if (code >= 48 && code <= 57 && digitOffset) {
      return String.fromCodePoint(digitOffset + (code - 48));
    }
    return c;
  }).join("");
}

// Complete Superscript Map (Lowercase, Uppercase, Numbers & Symbols)
const SUPERSCRIPT_MAP = {
  a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ",
  j: "ʲ", k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", q: "ᑫ", r: "ʳ",
  s: "ˢ", t: "ᵗ", u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
  A: "ᴬ", B: "ᴮ", C: "ᶜ", D: "ᴰ", E: "ᴱ", F: "ᶠ", G: "ᴳ", H: "ᴴ", I: "ᴵ",
  J: "ᴶ", K: "ᴷ", L: "ᴸ", M: "ᴹ", N: "ᴺ", O: "ᴼ", P: "ᴾ", Q: "ᑫ", R: "ᴿ",
  S: "ˢ", T: "ᵀ", U: "ᵁ", V: "ⱽ", W: "ᵂ", X: "ˣ", Y: "ʸ", Z: "ᶻ",
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾"
};

// Complete Subscript Map
const SUBSCRIPT_MAP = {
  a: "ₐ", b: "ᵦ", c: "꜀", d: "ᑯ", e: "ₑ", f: "բ", g: "₉", h: "ₕ", i: "ᵢ",
  j: "ⱼ", k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ", o: "ₒ", p: "ₚ", q: "૧", r: "ᵣ",
  s: "ₛ", t: "ₜ", u: "ᵤ", v: "ᵥ", w: "ᵨ", x: "ₓ", y: "ᵧ", z: "₂",
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎"
};

// Rich Inverted / Upside Down Map
const FLIP_MAP = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
  k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
  u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "𐐒", C: "Ɔ", D: "◖", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ſ",
  K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Ò", R: "ᴚ", S: "S", T: "┴",
  U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6", "0": "0",
  "?": "¿", "!": "¡", ".": "˙", ",": "'", ";": "؛", "(": ")", ")": "(", "[": "]", "]": "[",
  "{": "}", "}": "{", "<": ">", ">": "<", "&": "⅋", "_": "‾", "'": ",", "\"": "„"
};

// 1337 Leet Speak Gamer Map
const LEET_MAP = {
  a: "4", b: "8", e: "3", g: "9", i: "1", l: "1", o: "0", s: "5", t: "7", z: "2"
};

// Zalgo Diacritics
const ZALGO_UP = [
  '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310',
  '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343',
  '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350'
];
const ZALGO_MID = [
  '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327',
  '\u0328', '\u0334', '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e'
];
const ZALGO_DOWN = [
  '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f',
  '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c',
  '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339'
];

function generateZalgo(text, intensity = 4) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    result += c;
    if (c === " " || c === "\n") continue;
    const count = Math.min(intensity, 8);
    for (let u = 0; u < count; u++) result += ZALGO_UP[Math.floor(Math.random() * ZALGO_UP.length)];
    for (let m = 0; m < Math.floor(count / 2); m++) result += ZALGO_MID[Math.floor(Math.random() * ZALGO_MID.length)];
    for (let d = 0; d < count; d++) result += ZALGO_DOWN[Math.floor(Math.random() * ZALGO_DOWN.length)];
  }
  return result;
}

// 60+ Comprehensive Unicode Font Transformations
const UNICODE_FONTS = [
  // 1. Royal & Gothic Fraktur
  {
    id: "bold-serif",
    name: "Bold Serif",
    category: "royal",
    badge: "Classic",
    transform: (t) => mapAlpha(t, 0x1D400, 0x1D41A, 0x1D7CE)
  },
  {
    id: "italic-serif",
    name: "Italic Serif",
    category: "cursive",
    badge: "Elegant",
    transform: (t) => mapAlpha(t, 0x1D434, 0x1D44E, null, { h: "\u{210E}" })
  },
  {
    id: "bold-italic",
    name: "Bold Italic Serif",
    category: "royal",
    badge: "Emphasis",
    transform: (t) => mapAlpha(t, 0x1D468, 0x1D482)
  },
  {
    id: "script",
    name: "Calligraphy Script",
    category: "cursive",
    badge: "Bio Favorite",
    transform: (t) => mapAlpha(t, 0x1D49C, 0x1D4B6, null, {
      B: "\u{212C}", E: "\u{2130}", F: "\u{2131}", H: "\u{210B}", I: "\u{2110}",
      L: "\u{2112}", M: "\u{2133}", R: "\u{211B}", e: "\u{212F}", g: "\u{210A}", o: "\u{2134}"
    })
  },
  {
    id: "bold-script",
    name: "Bold Cursive Script",
    category: "cursive",
    badge: "Instagram VIP",
    transform: (t) => mapAlpha(t, 0x1D4D0, 0x1D4EA)
  },
  {
    id: "gothic",
    name: "Medieval Gothic Fraktur",
    category: "royal",
    badge: "Dark Fantasy",
    transform: (t) => mapAlpha(t, 0x1D504, 0x1D51E, null, {
      C: "\u{212D}", H: "\u{210C}", I: "\u{2111}", R: "\u{211C}", Z: "\u{2128}"
    })
  },
  {
    id: "gothic-bold",
    name: "Bold Gothic Fraktur",
    category: "royal",
    badge: "Gamer Clan",
    transform: (t) => mapAlpha(t, 0x1D56C, 0x1D586)
  },
  {
    id: "double-struck",
    name: "Double-Struck (Blackboard)",
    category: "royal",
    badge: "Academic",
    transform: (t) => mapAlpha(t, 0x1D538, 0x1D552, 0x1D7D8, {
      C: "\u{2102}", H: "\u{210D}", N: "\u{2115}", P: "\u{2119}", Q: "\u{211A}", R: "\u{211D}", Z: "\u{2124}"
    })
  },
  {
    id: "runes",
    name: "Ancient Norse Runes",
    category: "royal",
    badge: "Viking Myth",
    transform: (t) => {
      const runes = {
        a: "ᚨ", b: "ᛒ", c: "ᚲ", d: "ᛞ", e: "ᛖ", f: "ᚠ", g: "ᚷ", h: "ᚺ", i: "ᛁ",
        j: "ᛃ", k: "ᚲ", l: "ᛚ", m: "ᛗ", n: "ᚾ", o: "ᛟ", p: "ᛈ", q: "ᚲ", r: "ᚱ",
        s: "ᛋ", t: "ᛏ", u: "ᚢ", v: "ᚹ", w: "ᚹ", x: "ᚲᛋ", y: "ᛃ", z: "ᛉ"
      };
      return t.split("").map(c => runes[c.toLowerCase()] || c).join("");
    }
  },

  // 2. Tech & Monospace
  {
    id: "sans-clean",
    name: "Clean Sans-Serif",
    category: "tech",
    badge: "Minimal",
    transform: (t) => mapAlpha(t, 0x1D5A0, 0x1D5BA, 0x1D7E2)
  },
  {
    id: "sans-bold",
    name: "Sans-Serif Bold",
    category: "tech",
    badge: "Clean Bold",
    transform: (t) => mapAlpha(t, 0x1D5D4, 0x1D5EE, 0x1D7EC)
  },
  {
    id: "sans-italic",
    name: "Sans-Serif Italic",
    category: "tech",
    badge: "Slanted",
    transform: (t) => mapAlpha(t, 0x1D608, 0x1D622)
  },
  {
    id: "sans-bold-italic",
    name: "Sans Bold Italic",
    category: "tech",
    badge: "High Energy",
    transform: (t) => mapAlpha(t, 0x1D63C, 0x1D656)
  },
  {
    id: "monospace",
    name: "Typewriter Monospace",
    category: "tech",
    badge: "Developer",
    transform: (t) => mapAlpha(t, 0x1D670, 0x1D68A, 0x1D7F6)
  },
  {
    id: "leet-speak",
    name: "1337 Gamer Hacker",
    category: "tech",
    badge: "Gaming Tag",
    transform: (t) => t.split("").map(c => LEET_MAP[c.toLowerCase()] || c).join("")
  },
  {
    id: "morse",
    name: "Telegraph Morse Code",
    category: "tech",
    badge: "Cyberpunk",
    transform: (t) => {
      const morse = {
        a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....",
        i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.",
        q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-",
        y: "-.--", z: "--..", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
        "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----", " ": "/"
      };
      return t.split("").map(c => morse[c.toLowerCase()] || c).join(" ");
    }
  },

  // 3. Aesthetic & Caps
  {
    id: "small-caps",
    name: "Small Capital Letters",
    category: "aesthetic",
    badge: "Clean Bio",
    transform: (t) => {
      const map = {
        a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ",
        j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ꞯ", r: "ʀ",
        s: "ꜱ", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ"
      };
      return t.split("").map(c => map[c.toLowerCase()] || c).join("");
    }
  },
  {
    id: "superscript",
    name: "Tiny Superscript (High Index)",
    category: "aesthetic",
    badge: "Micro Text",
    transform: (t) => t.split("").map(c => SUPERSCRIPT_MAP[c] || SUPERSCRIPT_MAP[c.toLowerCase()] || c).join("")
  },
  {
    id: "subscript",
    name: "Tiny Subscript (Sub-Index)",
    category: "aesthetic",
    badge: "Footnote",
    transform: (t) => t.split("").map(c => SUBSCRIPT_MAP[c.toLowerCase()] || c).join("")
  },
  {
    id: "fullwidth",
    name: "Vaporwave / Fullwidth",
    category: "aesthetic",
    badge: "A E S T H E T I C",
    transform: (t) => {
      return t.split("").map(c => {
        const code = c.charCodeAt(0);
        if (code >= 33 && code <= 126) return String.fromCodePoint(0xFF01 + (code - 33));
        if (c === " ") return "\u{3000}";
        return c;
      }).join("");
    }
  },
  {
    id: "upside-down",
    name: "Inverted / Upside Down",
    category: "aesthetic",
    badge: "Mind-Bending",
    transform: (t) => t.split("").reverse().map(c => FLIP_MAP[c] || c).join("")
  },
  {
    id: "reversed",
    name: "Mirrored / Backwards Text",
    category: "aesthetic",
    badge: "Reverse",
    transform: (t) => t.split("").reverse().join("")
  },
  {
    id: "spaced",
    name: "Spaced Out Letters",
    category: "aesthetic",
    badge: "Wide Horizon",
    transform: (t) => t.split("").join("   ")
  },
  {
    id: "dotted-between",
    name: "Dotted In-Between",
    category: "aesthetic",
    badge: "Minimalist",
    transform: (t) => t.split("").filter(c => c.trim()).join(" · ")
  },
  {
    id: "hearts-between",
    name: "Romance Heart Trail",
    category: "aesthetic",
    badge: "Cute & Soft",
    transform: (t) => t.split("").filter(c => c.trim()).join(" ♡ ")
  },
  {
    id: "sparkles-between",
    name: "Sparkles In-Between",
    category: "aesthetic",
    badge: "Starlight",
    transform: (t) => t.split("").filter(c => c.trim()).join(" ✨ ")
  },
  {
    id: "stars-between",
    name: "Shooting Stars Trail",
    category: "aesthetic",
    badge: "Star Trail",
    transform: (t) => t.split("").filter(c => c.trim()).join(" ★ ")
  },
  {
    id: "slashes-between",
    name: "Cyber Slashes Flow",
    category: "aesthetic",
    badge: "Modernist",
    transform: (t) => t.split("").filter(c => c.trim()).join(" / ")
  },

  // 4. Badges, Bubbles & Squares
  {
    id: "bubbles",
    name: "Circled White Bubbles",
    category: "bubble",
    badge: "Playful",
    transform: (t) => {
      return t.split("").map(c => {
        if (CIRCLED_DIGITS[c]) return CIRCLED_DIGITS[c];
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + (code - 97));
        return c;
      }).join("");
    }
  },
  {
    id: "black-bubbles",
    name: "Inverted Dark Bubbles",
    category: "bubble",
    badge: "Bold Badges",
    transform: (t) => {
      return t.split("").map(c => {
        if (BLACK_CIRCLED_DIGITS[c]) return BLACK_CIRCLED_DIGITS[c];
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F150 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1F150 + (code - 97));
        return c;
      }).join("");
    }
  },
  {
    id: "squares",
    name: "Square Badges",
    category: "bubble",
    badge: "Iconic",
    transform: (t) => {
      return t.split("").map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F130 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1F130 + (code - 97));
        return c;
      }).join("");
    }
  },
  {
    id: "dark-squares",
    name: "Inverted Solid Squares",
    category: "bubble",
    badge: "Gamer Tag",
    transform: (t) => {
      return t.split("").map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F170 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1F170 + (code - 97));
        return c;
      }).join("");
    }
  },
  {
    id: "parentheses",
    name: "Parenthesized Characters",
    category: "bubble",
    badge: "Structured",
    transform: (t) => {
      return t.split("").map(c => {
        if (PAREN_DIGITS[c]) return PAREN_DIGITS[c];
        const code = c.charCodeAt(0);
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x249C + (code - 97));
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x249C + (code - 65));
        return c;
      }).join("");
    }
  },

  // 5. Lines, Slashes & Accents
  {
    id: "strikethrough",
    name: "Strikethrough Cut",
    category: "tech",
    badge: "Slashed",
    transform: (t) => t.split("").map(c => c + "\u{0336}").join("")
  },
  {
    id: "double-strike",
    name: "Double Strikethrough",
    category: "tech",
    badge: "Double Slash",
    transform: (t) => t.split("").map(c => c + "\u{033F}").join("")
  },
  {
    id: "tilde-strike",
    name: "Wavy Tilde Overlay",
    category: "tech",
    badge: "Vibration",
    transform: (t) => t.split("").map(c => c + "\u{0334}").join("")
  },
  {
    id: "underline",
    name: "Single Underline",
    category: "tech",
    badge: "Clean Underline",
    transform: (t) => t.split("").map(c => c + "\u{0332}").join("")
  },
  {
    id: "double-underline",
    name: "Double Underline",
    category: "tech",
    badge: "Bold Underline",
    transform: (t) => t.split("").map(c => c + "\u{0333}").join("")
  },
  {
    id: "wavy-underline",
    name: "Wavy Subscript Line",
    category: "tech",
    badge: "Waveform",
    transform: (t) => t.split("").map(c => c + "\u{0330}").join("")
  },
  {
    id: "dotted-underline",
    name: "Dotted Underline",
    category: "tech",
    badge: "Dotted Sub",
    transform: (t) => t.split("").map(c => c + "\u{0324}").join("")
  },
  {
    id: "overline",
    name: "Overline Top Bar",
    category: "tech",
    badge: "Top Bar",
    transform: (t) => t.split("").map(c => c + "\u{0305}").join("")
  },
  {
    id: "dotted-caps",
    name: "Dotted Top Circles",
    category: "tech",
    badge: "Spotted",
    transform: (t) => t.split("").map(c => c + "\u{0307}").join("")
  },
  {
    id: "seagull-above",
    name: "Seagull Wings Above",
    category: "tech",
    badge: "Bird Wing",
    transform: (t) => t.split("").map(c => c + "\u{0306}").join("")
  },
  {
    id: "bridge-above",
    name: "Bridge Arch Above",
    category: "tech",
    badge: "Arch Top",
    transform: (t) => t.split("").map(c => c + "\u{0311}").join("")
  },
  {
    id: "cross-above",
    name: "St. Andrew Cross Accent",
    category: "tech",
    badge: "X-Marked",
    transform: (t) => t.split("").map(c => c + "\u{033D}").join("")
  },
  {
    id: "slash-through",
    name: "Diagonal Slash",
    category: "tech",
    badge: "Cyberpunk",
    transform: (t) => t.split("").map(c => c + "\u{0338}").join("")
  },
  {
    id: "arrow-above",
    name: "Right Arrow Above",
    category: "tech",
    badge: "Vector Math",
    transform: (t) => t.split("").map(c => c + "\u{20D7}").join("")
  },

  // 6. Glitch & Zalgo
  {
    id: "glitch-zalgo",
    name: "Corrupted Zalgo / Glitch Void",
    category: "glitch",
    badge: "Creepypasta",
    transform: (t, intensity = 4) => generateZalgo(t, intensity)
  },

  // 7. Decorative Frames & Embellishments
  {
    id: "royal-crown",
    name: "Imperial Wings & Crown",
    category: "symbols",
    badge: "Gamer VIP",
    transform: (t) => `꧁༺ ${t} ༻꧂`
  },
  {
    id: "angel-wings",
    name: "Aesthetic Angel Wings",
    category: "symbols",
    badge: "TikTok Trend",
    transform: (t) => `𓆩 ${t} 𓆪`
  },
  {
    id: "fairy-ribbon",
    name: "Cute Coquette Ribbon",
    category: "symbols",
    badge: "Coquette Aesthetic",
    transform: (t) => `୨୧ ${t} ୨୧`
  },
  {
    id: "shooting-stars",
    name: "Shooting Stars",
    category: "symbols",
    badge: "Starlight Flow",
    transform: (t) => `★彡 ${t} 彡★`
  },
  {
    id: "sparkles-frame",
    name: "Sparkles & Starlight",
    category: "symbols",
    badge: "Bio Favorite",
    transform: (t) => `✨ ${t} ✨`
  },
  {
    id: "starlight-capsule",
    name: "Starlight Dream Capsule",
    category: "symbols",
    badge: "Dreamy Vibe",
    transform: (t) => `⋆｡°✩ ${t} ✩°｡⋆`
  },
  {
    id: "heart-capsule",
    name: "Love & Romance Hearts",
    category: "symbols",
    badge: "Romantic",
    transform: (t) => `♡ ${t} ♡`
  },
  {
    id: "aesthetic-ribbon",
    name: "Aesthetic Ribbon Wings",
    category: "symbols",
    badge: "Cottagecore",
    transform: (t) => `｡ﾟ•┈୨ ${t} ୧┈•ﾟ｡`
  },
  {
    id: "brackets-japanese",
    name: "Japanese Bold Brackets",
    category: "symbols",
    badge: "Anime & Manga",
    transform: (t) => `【 ${t} 】`
  },
  {
    id: "corner-quotes",
    name: "Corner Quotes",
    category: "symbols",
    badge: "Minimal Japanese",
    transform: (t) => `『 ${t} 』`
  },
  {
    id: "double-brackets",
    name: "Double White Brackets",
    category: "symbols",
    badge: "Manga Title",
    transform: (t) => `〚 ${t} 〛`
  },
  {
    id: "diamond-border",
    name: "Diamond Banner Box",
    category: "symbols",
    badge: "Badge Frame",
    transform: (t) => `╔═ ${t} ═╗`
  },
  {
    id: "crescent-moon",
    name: "Crescent Moon & Night",
    category: "symbols",
    badge: "Night Owl",
    transform: (t) => `☾⋆ ${t} ⋆☽`
  },
  {
    id: "clan-gamer",
    name: "Pro Clan Gamer Tag",
    category: "symbols",
    badge: "Esports Squad",
    transform: (t) => `亗 ${t} 亗`
  },
  {
    id: "sniper-gamer",
    name: "Elite Battle Crosshair",
    category: "symbols",
    badge: "Warzone / BGMI",
    transform: (t) => `⚔️ [ ${t} ] ⚔️`
  },
  {
    id: "cyber-matrix",
    name: "Cyber Grid Dotted Bars",
    category: "symbols",
    badge: "Cyberpunk",
    transform: (t) => `░▒▓ ${t} ▓▒░`
  },
  {
    id: "cyber-neon",
    name: "Cyberpunk Neon Voltage",
    category: "symbols",
    badge: "Neon Cyber",
    transform: (t) => `⚡ [ ${t} ] ⚡`
  },
  {
    id: "loading-bar",
    name: "Bio Loading Progress",
    category: "symbols",
    badge: "Progress Bar",
    transform: (t) => `[■■■■■□□□] ${t}`
  }
];

// Curated Social Media Bio Templates
const BIO_TEMPLATES = [
  {
    id: "aesthetic-1",
    category: "aesthetic",
    title: "Soft Daydreamer",
    badge: "Instagram Favorite",
    text: "✨ daydreaming in high definition\n📍 NYC ✈️ Tokyo\n☕ matcha, vintage film & records\n💌 connect: hello@myname.com\n⇩ read my latest story"
  },
  {
    id: "aesthetic-2",
    category: "aesthetic",
    title: "Starlight & Golden Hour",
    badge: "Vibes & Poetry",
    text: "⋆｡°✩ creating my own sunshine ✩°｡⋆\n🕊️ soft heart, fierce mind\n🪐 lover of sunsets & deep talks\n🎧 playlist link in bio ⇩"
  },
  {
    id: "aesthetic-3",
    category: "aesthetic",
    title: "Clean Minimalist Studio",
    badge: "Clean & Modern",
    text: "✦ living gently & creating daily\n☁️ romanticizing ordinary moments\n🌿 design, espresso & architecture\n🔗 portfolio & presets below"
  },
  {
    id: "royal-1",
    category: "royal",
    title: "Crowned Ambition",
    badge: "VIP & Royalty",
    text: "꧁༺ 𝐂𝐑𝐎𝐖𝐍𝐄𝐃 ༻꧂\n⚔️ Master of my own destiny\n🏆 Built from discipline & vision\n💼 Founder @ [Brand Name]\n🎯 Leveling up every single day"
  },
  {
    id: "royal-2",
    category: "royal",
    title: "Empire Builder Status",
    badge: "High Net Worth",
    text: "╔════ 👑 ════╗\n   𝐕𝐈𝐏 𝐒𝐓𝐀𝐓𝐔𝐒\n╚════ 👑 ════╝\n✦ Silent moves, loud results\n📈 Investor & Visionary\n📍 Monaco • London • Dubai"
  },
  {
    id: "gamer-1",
    category: "gamer",
    title: "Pro Esports Grinder",
    badge: "Gaming & Twitch",
    text: "⚡ [ YOUR GAMER TAG ] ⚡\n🎮 Grinding Ranked 24/7\n🏆 Top 1% Global Leaderboard\n🎧 Discord: username#0000\n🔴 Streaming daily on Twitch ⇩"
  },
  {
    id: "gamer-2",
    category: "gamer",
    title: "Ghost Clan Assassin",
    badge: "Warzone & FPS",
    text: "亗 G H O S T 亗\n🔫 One tap, clean finish\n⚔️ Clan: [VIP SQUAD]\n👾 Join our community Discord ⇩\n🎯 Clutch or Kick"
  },
  {
    id: "gamer-3",
    category: "gamer",
    title: "Anime Battle Otaku",
    badge: "Anime & Gaming",
    text: "⚔️ 𝘚𝘩𝘪𝘯𝘰𝘣𝘪 𝘪𝘯 𝘵𝘳𝘢𝘪𝘯𝘪𝘯𝘨 ⚔️\n🍜 Ramen enthusiast & manga reader\n🎮 Valorant • Genshin • Steam\n🎧 Current track on loop ⇩"
  },
  {
    id: "creator-1",
    category: "creator",
    title: "SaaS & Growth Creator",
    badge: "Business & Tech",
    text: "🚀 Helping creators scale to $10k/mo\n📈 500k+ organic views generated\n💡 Daily breakdowns on AI & Growth\n👇 Grab the 100% Free Blueprint:"
  },
  {
    id: "creator-2",
    category: "creator",
    title: "Digital Product Architect",
    badge: "Developer & UI/UX",
    text: "✦ Full-Stack Designer & Builder 💻\n🛠️ Crafting web apps with zero latency\n📬 Open for client collaborations\n🔗 Live projects & GitHub ⇩"
  },
  {
    id: "creator-3",
    category: "creator",
    title: "Creative Director & Visuals",
    badge: "Design & Film",
    text: "📷 visual storyteller\n🎨 brand identity & editorial photography\n📍 Los Angeles, CA\n💌 bookings & rates in link ⇩"
  },
  {
    id: "dark-1",
    category: "dark",
    title: "Dark Fantasy / Void",
    badge: "Goth & Shadow",
    text: "𝔇𝔞𝔯𝔨𝔫𝔢𝔰𝔰 𝔦𝔰 𝔪𝔶 𝔰𝔞𝔫𝔠𝔱𝔲𝔞𝔯𝔶\n🥀 Lost somewhere in the void\n⏳ 00:00 • Ghost in the shell\n🖤 Don't look back"
  },
  {
    id: "quotes-1",
    category: "quotes",
    title: "Timeless Wanderer",
    badge: "Inspirational",
    text: "❝ not all who wander are lost ❞\n✦ capturing fleeting moments\n☾ moon child\n☁️ somewhere between reality & dreams"
  },
  {
    id: "quotes-2",
    category: "quotes",
    title: "Stoic Discipline & Focus",
    badge: "Philosophy & Mindset",
    text: "🏛️ Amor Fati • Control the controllable\n⚡ 1% better every single sunrise\n📚 50+ books read this year\n👇 My personal reading list:"
  },
  {
    id: "cyber-1",
    category: "gamer",
    title: "Cyberpunk Synthwave",
    badge: "Cyber Grid",
    text: "░░ OFFLINE IN REALITY ░░\n⚡ Cyberpunk soul • Synthwave heart\n💾 01001000 01101001\n🎧 Late night code & neon lights"
  },
  {
    id: "fitness-1",
    category: "creator",
    title: "Athlete & Fitness Beast",
    badge: "Fitness & Health",
    text: "🔥 Sweat today, conquer tomorrow\n🏋️‍♂️ Hybrid Athlete • Daily discipline\n🥗 Nutrition tips & custom workout plans\n👇 Join the 30-Day Transformation:"
  }
];

// Aesthetic Symbols & Kaomoji Collection
const SYMBOL_CATEGORIES = [
  {
    id: "stars",
    name: "Stars & Sparkles",
    symbols: ["✧", "✦", "★", "☆", "⋆", "｡", "˚", "☽", "☾", "🪐", "✵", "✸", "✹", "☄", "✨", "⭐", "🌟", "💫", "✪", "✫", "✬", "✭", "✯", "✰"]
  },
  {
    id: "hearts",
    name: "Hearts & Romance",
    symbols: ["♡", "♥", "❦", "❧", "❥", "𑁍", "ღ", "ꨄ", "💌", "𓆩♡𓆪", "💘", "💖", "💗", "💓", "💞", "💕", "🤍", "🖤", "🤎", "❤️‍🔥", "❤️‍🩹"]
  },
  {
    id: "kaomoji",
    name: "Cute Kaomoji",
    symbols: [
      "(◕ᴗ◕✿)", "ʕ•ᴥ•ʔ", "(｡♥‿♥｡)", "(◡‿◡✿)", "ฅ^•ﻌ•^ฅ",
      "(つ≧▽≦)つ", "¯\\_(ツ)_/¯", "(╯°□°）╯︵ ┻━┻", "(づ｡◕‿‿◕｡)づ",
      "(◍•ᴗ•◍)❤", "(*˘︶˘*).｡*♡", "(・∀・)", "(｡•́︿•̀｡)", "(^з^)-☆", "ᕙ(⇀‸↼‶)ᕗ",
      "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "(づ￣ ³￣)づ", "(=^･ω･^=)", "(•‿•)", "(✿◠‿◠)"
    ]
  },
  {
    id: "dividers",
    name: "Aesthetic Dividers & Borders",
    symbols: [
      "─── ⋆⋅☆⋅⋆ ───", "｡ﾟ•┈୨♡୧┈•ﾟ｡", "━━━━━━━━━━━━━━",
      "•┈••✦••┈•", "✧──────────✧", "— — — ✦ — — —",
      "༺═────────────────═༻", "┈┈┈┈․° ☣ °․┈┈┈┈",
      "ˏˋ°•*⁀➷", "★・・・・・・★", "─────────── ⋆✦⋆", "•.¸¸.•*´¨`*•.¸¸.•"
    ]
  },
  {
    id: "arrows",
    name: "Arrows & Pointers",
    symbols: ["➔", "➜", "➢", "➤", "➥", "➦", "➳", "➴", "➸", "➷", "↬", "↫", "↵", "↳", "↲", "⇄", "⇅", "⇨", "⇩", "⇦", "⇧", "⇲", "⇱", "⇗", "⇖"]
  },
  {
    id: "brackets",
    name: "Aesthetic Brackets & Wings",
    symbols: ["【 】", "『 』", "〚 〛", "⦅ ⦆", "⟦ ⟧", "⟨ ⟩", "《 》", "「 」", "〔 〕", "𓆩 𓆪", "୨ ୧", "ଘ ଓ", "ʚ ɞ", "𓊈 𓊉"]
  },
  {
    id: "badges",
    name: "Gamer & VIP Badges",
    symbols: ["👑", "⚔️", "🛡️", "☬", "☠️", "亗", "×͜×", "〆", "⚡", "🎯", "💎", "☣", "⚜️", "卍", "☯", "☣️", "🥷", "🔥", "🏆", "🎮", "👾", "🕹️", "🔫"]
  },
  {
    id: "nature",
    name: "Nature, Flora & Astrology",
    symbols: ["🌸", "🌿", "☁️", "🕊️", "🌙", "🪐", "⚡", "☕", "🍃", "🌊", "🌻", "🍄", "🦋", "🫧", "🌧️", "☀️", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]
  },
  {
    id: "music",
    name: "Music & Audio Vibes",
    symbols: ["🎵", "🎶", "🎧", "🎙️", "🎚️", "📻", "♪", "♫", "♩", "♬", "♭", "♮", "♯", "•*¨*•.¸¸♪", "ılı.lıllılı.ıllı.", "▶ ⏸ ⏹ ⏩ ⏪"]
  }
];

// Top 12 fast-access symbols for the quick tray
const QUICK_SYMBOLS = ["✨", "♡", "★", "✦", "｡ﾟ•┈", "亗", "⚔️", "👑", "𓆩♡𓆪", "⚡", "☾⋆", "🕊️"];

export default {
  id: "fancy-font-generator",
  name: "Fancy Font & Bio Text Generator",

  renderUI() {
    return `
      <style>
        /* Scoped High-Craft Typography Studio Styles */
        .fancy-font-scope .font-card-item {
          padding: 14px 16px;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: rgba(255, 255, 255, 0.02);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          position: relative;
          cursor: pointer;
        }
        .fancy-font-scope .font-card-item:hover {
          transform: translateY(-2px);
          border-color: rgba(157, 78, 221, 0.4);
          background: rgba(157, 78, 221, 0.035);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), 0 0 16px rgba(157, 78, 221, 0.12);
        }
        .fancy-font-scope .font-card-item:active {
          transform: scale(0.99);
        }
        .fancy-font-scope .font-card-item.is-pinned {
          border-color: rgba(245, 158, 11, 0.45);
          background: rgba(245, 158, 11, 0.035);
        }
        .fancy-font-scope .font-preview-text {
          color: var(--text-main);
          line-height: 1.55;
          overflow-wrap: anywhere;
          word-break: break-word;
          white-space: pre-wrap;
          min-height: 28px;
          padding: 2px 0;
          font-variant-numeric: tabular-nums;
          user-select: all;
        }
        .fancy-font-scope .star-pin-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .fancy-font-scope .star-pin-btn:hover {
          color: #fbbf24;
          transform: scale(1.15);
        }
        .fancy-font-scope .star-pin-btn.active {
          color: #fbbf24;
        }
        .fancy-font-scope .bio-limit-chip {
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.2s ease;
        }
        .fancy-font-scope .bio-limit-chip.status-good {
          color: var(--accent-emerald);
          border-color: rgba(16, 185, 129, 0.25);
          background: rgba(16, 185, 129, 0.04);
        }
        .fancy-font-scope .bio-limit-chip.status-warn {
          color: var(--accent-orange);
          border-color: rgba(245, 158, 11, 0.3);
          background: rgba(245, 158, 11, 0.05);
        }
        .fancy-font-scope .bio-limit-chip.status-danger {
          color: var(--accent-rose);
          border-color: rgba(244, 63, 94, 0.4);
          background: rgba(244, 63, 94, 0.08);
          font-weight: 700;
        }
        .fancy-font-scope .symbol-btn-tile {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 11px;
          font-size: 14.5px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-main);
          cursor: pointer;
          transition: all 0.15s ease;
          user-select: none;
        }
        .fancy-font-scope .symbol-btn-tile:hover {
          background: rgba(157, 78, 221, 0.15);
          border-color: var(--accent-purple);
          color: #fff;
          transform: translateY(-1px) scale(1.06);
        }
        .fancy-font-scope .symbol-btn-tile:active {
          transform: scale(0.96);
        }
        .fancy-font-scope .bio-card-preview {
          padding: 12px 14px;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          font-family: var(--font-mono);
          font-size: 12.5px;
          line-height: 1.6;
          white-space: pre-wrap;
          color: var(--text-main);
          overflow-wrap: anywhere;
        }
        .fancy-font-scope .quick-symbol-pill {
          padding: 3px 8px;
          font-size: 12.5px;
          border-radius: 5px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-main);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .fancy-font-scope .quick-symbol-pill:hover {
          background: rgba(0, 242, 254, 0.15);
          border-color: var(--accent-cyan);
          transform: scale(1.1);
        }
      </style>

      <div class="tool-content-layout split-view fancy-font-scope">
        <!-- 1. LEFT PANEL: Controls, Inputs & Bio Tools -->
        <div class="tool-panel">
          <div class="panel-header" style="justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <h3 style="margin: 0; display: flex; align-items: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="color: var(--accent-purple);">
                <polyline points="4 7 4 4 20 4 20 7"></polyline>
                <line x1="9" y1="20" x2="15" y2="20"></line>
                <line x1="12" y1="4" x2="12" y2="20"></line>
              </svg>
              <span>Typography &amp; Bio Studio</span>
            </h3>

            <!-- Studio Sub-Mode Tabs -->
            <div style="display: flex; gap: 6px;" id="font-studio-tabs">
              <button class="keyboard-tab active" data-tab="styler" style="font-size: 11px; padding: 4px 10px;">🔤 Font Styler</button>
              <button class="keyboard-tab" data-tab="templates" style="font-size: 11px; padding: 4px 10px;">📋 Bio Templates</button>
              <button class="keyboard-tab" data-tab="symbols" style="font-size: 11px; padding: 4px 10px;">✨ Symbols</button>
            </div>
          </div>

          <!-- PERSISTENT TOP SECTION: Textarea & Platform Bio Limits (Visible across all tabs) -->
          <div class="form-group" style="margin-top: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
              <label for="font-input-text" style="font-size: 11.5px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px; margin: 0;">Input Text</label>
              <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                <button class="tool-btn secondary" id="font-paste-btn" style="font-size: 10.5px; padding: 3px 8px;" title="Paste from Clipboard">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Paste
                </button>
                <button class="tool-btn secondary" id="font-sample-btn" style="font-size: 10.5px; padding: 3px 8px;">Sample</button>
                <button class="tool-btn" id="font-clear-btn" style="font-size: 10.5px; padding: 3px 8px;">Clear</button>
              </div>
            </div>

            <textarea id="font-input-text" class="input-textarea" placeholder="Type or paste your text here to transform it into 60+ aesthetic Unicode fonts..." style="min-height: 105px; font-size: 14px; line-height: 1.6; width: 100%; box-sizing: border-box;"></textarea>

            <!-- Quick Case & Conversion Modifiers -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; flex-wrap: wrap; gap: 6px;">
              <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                <button class="tool-btn secondary" id="case-title-btn" style="font-size: 10px; padding: 2px 7px;" title="Capitalize Each Word">Aa Title</button>
                <button class="tool-btn secondary" id="case-upper-btn" style="font-size: 10px; padding: 2px 7px;" title="Convert to UPPERCASE">AA UPPER</button>
                <button class="tool-btn secondary" id="case-lower-btn" style="font-size: 10px; padding: 2px 7px;" title="Convert to lowercase">aa lower</button>
                <button class="tool-btn secondary" id="case-alter-btn" style="font-size: 10px; padding: 2px 7px;" title="aLtErNaTiNg cAsE">aA Alter</button>
                <button class="tool-btn secondary" id="case-reverse-btn" style="font-size: 10px; padding: 2px 7px;" title="Reverse String Order">⇄ Reverse</button>
              </div>
              <span id="font-char-count" style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">0 chars • 0 words</span>
            </div>
          </div>

          <!-- Social Bio Platform Length Limits Tracker -->
          <div class="form-group" style="margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px; margin: 0;">Social Platform Bio Limits</label>
              <span style="font-size: 10px; color: var(--text-muted);">Live Counter</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(115px, 1fr)); gap: 6px;">
              <div class="bio-limit-chip status-good" id="chip-ig" title="Instagram Bio Limit is 150 characters">
                <span>📸 Instagram</span>
                <strong id="limit-ig-val">0/150</strong>
              </div>
              <div class="bio-limit-chip status-good" id="chip-tiktok" title="TikTok Bio Limit is 80 characters">
                <span>🎵 TikTok</span>
                <strong id="limit-tiktok-val">0/80</strong>
              </div>
              <div class="bio-limit-chip status-good" id="chip-twitter" title="Twitter / X Bio Limit is 160 characters">
                <span>🐦 X / Twitter</span>
                <strong id="limit-twitter-val">0/160</strong>
              </div>
              <div class="bio-limit-chip status-good" id="chip-discord" title="Discord About Me Limit is 190 characters">
                <span>👾 Discord</span>
                <strong id="limit-discord-val">0/190</strong>
              </div>
            </div>
          </div>

          <!-- TAB 1: FONT STYLER CONTROLS -->
          <div id="subtab-styler-container">
            <!-- Outer Embellishment Wrappers -->
            <div class="form-group" style="margin-top: 12px;">
              <label for="font-prefix-select" style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px; display: block;">Wrap with Outer Embellishments</label>
              <select id="font-prefix-select" class="form-select">
                <option value="none" selected>None (Clean Typography)</option>
                <option value="sparkles">✨ Sparkles (✨ ... ✨)</option>
                <option value="wings">꧁༺ Imperial Wings (꧁༺ ... ༻꧂)</option>
                <option value="angel">𓆩 Aesthetic Angel Wings (𓆩 ... 𓆪)</option>
                <option value="ribbon_bow">୨୧ Coquette Ribbon Bow (୨୧ ... ୨୧)</option>
                <option value="stars">★彡 Shooting Stars (★彡 ... 彡★)</option>
                <option value="ribbon">｡ﾟ•┈୨ Aesthetic Ribbon (｡ﾟ•┈୨ ... ୧┈•ﾟ｡)</option>
                <option value="starlight">⋆｡°✩ Starlight Capsule (⋆｡°✩ ... ✩°｡⋆)</option>
                <option value="brackets">【 Japanese Box 】 (【 ... 】)</option>
                <option value="quotes">『 Corner Quotes 』 (『 ... 』)</option>
                <option value="double_brackets">〚 Double Brackets 〛 (〚 ... 〛)</option>
                <option value="hearts">♡ Hearts (♡ ... ♡)</option>
                <option value="diamond">╔═ Diamond Box ═╗ (╔═ ... ═╗)</option>
                <option value="moon">☾⋆ Crescent Moon ⋆☽ (☾⋆ ... ⋆☽)</option>
                <option value="clan">亗 Pro Clan Tag (亗 ... 亗)</option>
                <option value="sniper">⚔️ Esports Crosshair (⚔️ [ ... ] ⚔️)</option>
                <option value="waves">░░ Screen Dotted (░░ ... ░░)</option>
                <option value="neon">⚡ Cyberpunk Neon (⚡ [ ... ] ⚡)</option>
                <option value="custom">✏️ Custom Prefix &amp; Suffix...</option>
              </select>

              <!-- Custom Prefix/Suffix Inputs (Shown if custom selected) -->
              <div id="font-custom-wrapper-row" style="display: none; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
                <input type="text" id="font-custom-prefix" class="form-input" placeholder="Prefix (e.g. ─── ⋆ )" style="font-size: 12px; height: 32px;">
                <input type="text" id="font-custom-suffix" class="form-input" placeholder="Suffix (e.g. ⋆ ───)" style="font-size: 12px; height: 32px;">
              </div>
            </div>

            <!-- Quick Bio Presets -->
            <div class="form-group" style="margin-top: 12px;">
              <label style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px; display: block;">Quick Bio Presets</label>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="tool-btn secondary font-preset-pill" data-text="Aesthetic Bio &amp; Daydreamer" style="font-size: 10.5px; padding: 3px 8px;">🌸 Aesthetic Bio</button>
                <button class="tool-btn secondary font-preset-pill" data-text="Crowned Legend" style="font-size: 10.5px; padding: 3px 8px;">👑 Royal Status</button>
                <button class="tool-btn secondary font-preset-pill" data-text="Grinding Ranked 24/7" style="font-size: 10.5px; padding: 3px 8px;">🎮 Gamer Tag</button>
                <button class="tool-btn secondary font-preset-pill" data-text="Follow My Journey ⇩" style="font-size: 10.5px; padding: 3px 8px;">✨ IG Caption</button>
                <button class="tool-btn secondary font-preset-pill" data-text="Cyberpunk 2077" style="font-size: 10.5px; padding: 3px 8px;">⚡ Cyber Matrix</button>
                <button class="tool-btn secondary font-preset-pill" data-text="Soft Heart, Fierce Mind" style="font-size: 10.5px; padding: 3px 8px;">🕊️ Pure Poetry</button>
              </div>
            </div>

            <!-- Quick 1-Click Symbol Insert Tray -->
            <div class="form-group" style="margin-top: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px; margin: 0;">Quick Symbol Insert</label>
                <span style="font-size: 10.5px; color: var(--accent-cyan); cursor: pointer;" id="quick-tray-more-btn">Browse all 200+ →</span>
              </div>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="quick-symbols-bar">
                ${QUICK_SYMBOLS.map(sym => `
                  <button class="quick-symbol-pill" data-symbol="${escapeHtml(sym)}" title="Insert '${sym}' into text">${escapeHtml(sym)}</button>
                `).join("")}
              </div>
            </div>

            <!-- Glitch / Zalgo Controller (Visible when Glitch filter is active or selected) -->
            <div id="font-zalgo-controls" style="margin-top: 14px; padding: 12px; border: 1px dashed rgba(244, 63, 94, 0.3); border-radius: 8px; background: rgba(244, 63, 94, 0.03); display: none;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label for="font-zalgo-slider" style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent-rose); margin: 0;">Glitch Chaos Intensity</label>
                <span id="font-zalgo-val" style="font-size: 11px; font-weight: 700; color: var(--accent-rose); font-family: var(--font-mono);">Level 4</span>
              </div>
              <input type="range" id="font-zalgo-slider" class="slider-input" min="1" max="10" step="1" value="4">
              <div style="display: flex; justify-content: space-between; margin-top: 6px;">
                <button class="tool-btn secondary zalgo-preset-btn" data-val="2" style="font-size: 10px; padding: 2px 6px;">Mild</button>
                <button class="tool-btn secondary zalgo-preset-btn" data-val="5" style="font-size: 10px; padding: 2px 6px;">Medium</button>
                <button class="tool-btn secondary zalgo-preset-btn" data-val="9" style="font-size: 10px; padding: 2px 6px;">Chaos Void</button>
              </div>
            </div>
          </div>

          <!-- TAB 2: BIO TEMPLATES -->
          <div id="subtab-templates-container" style="display: none; margin-top: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
              <div style="display: flex; gap: 4px; flex-wrap: wrap;" id="bio-category-filters">
                <button class="keyboard-tab active" data-bio-cat="all" style="font-size: 10px; padding: 2px 7px;">All</button>
                <button class="keyboard-tab" data-bio-cat="aesthetic" style="font-size: 10px; padding: 2px 7px;">Aesthetic</button>
                <button class="keyboard-tab" data-bio-cat="royal" style="font-size: 10px; padding: 2px 7px;">Royal</button>
                <button class="keyboard-tab" data-bio-cat="gamer" style="font-size: 10px; padding: 2px 7px;">Gamer</button>
                <button class="keyboard-tab" data-bio-cat="creator" style="font-size: 10px; padding: 2px 7px;">Creator</button>
                <button class="keyboard-tab" data-bio-cat="dark" style="font-size: 10px; padding: 2px 7px;">Dark</button>
              </div>
              <span class="tool-badge" style="font-size: 10px; background: rgba(0, 242, 254, 0.15); color: var(--accent-cyan); font-weight: 700;">1-Click Load</span>
            </div>
            <div id="bio-templates-grid" style="display: flex; flex-direction: column; gap: 10px;">
              <!-- Rendered via JS -->
            </div>
          </div>

          <!-- TAB 3: AESTHETIC SYMBOLS & KAOMOJI -->
          <div id="subtab-symbols-container" style="display: none; margin-top: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
              <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px;">Click to Insert at Cursor &amp; Copy</span>
              <span class="tool-badge" style="font-size: 10px; background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); font-weight: 700;">200+ Symbols</span>
            </div>

            <!-- Symbols Search Input -->
            <div style="position: relative; margin-bottom: 10px;">
              <input type="text" id="symbol-search-input" class="form-input" placeholder="Search symbols (e.g. star, heart, wing, cat, arrow)..." style="font-size: 11px; height: 28px; width: 100%; box-sizing: border-box;">
            </div>

            <!-- Symbol Category Accordion / List -->
            <div id="symbols-categories-wrap" style="display: flex; flex-direction: column; gap: 12px;">
              <!-- Rendered via JS -->
            </div>
          </div>
        </div>

        <!-- 2. RIGHT PANEL: Visual Font Gallery -->
        <div class="tool-panel" style="gap: 12px;">
          <!-- Panel Header & Action Tools -->
          <div class="panel-header" style="justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="color: var(--accent-cyan);">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <h3 style="margin: 0;">Generated Font Gallery</h3>
              <span id="font-style-count" class="tool-badge" style="font-size: 10px; background: rgba(157, 78, 221, 0.15); color: var(--accent-purple); font-weight: 700;">60+ Styles</span>
            </div>

            <div style="display: flex; gap: 6px; align-items: center;">
              <!-- Search Filter Input -->
              <div style="position: relative; display: flex; align-items: center;">
                <input type="text" id="font-search-input" class="form-input" placeholder="Search styles..." style="width: 155px; height: 28px; font-size: 11px; padding: 4px 24px 4px 8px;">
                <button id="font-search-clear" style="position: absolute; right: 6px; background: none; border: none; color: var(--text-muted); cursor: pointer; display: none; font-size: 11px;">✕</button>
              </div>
            </div>
          </div>

          <!-- Style Category Pills & Preview Size Controller -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
            <div style="display: flex; gap: 5px; flex-wrap: wrap;" id="font-category-filters">
              <button class="keyboard-tab active" data-cat="all" style="font-size: 10.5px; padding: 3px 8px;">All (60+)</button>
              <button class="keyboard-tab" data-cat="royal" style="font-size: 10.5px; padding: 3px 8px;">👑 Royal &amp; Fraktur</button>
              <button class="keyboard-tab" data-cat="cursive" style="font-size: 10.5px; padding: 3px 8px;">✍️ Cursive &amp; Script</button>
              <button class="keyboard-tab" data-cat="aesthetic" style="font-size: 10.5px; padding: 3px 8px;">💫 Aesthetic &amp; Caps</button>
              <button class="keyboard-tab" data-cat="bubble" style="font-size: 10.5px; padding: 3px 8px;">🔘 Badges &amp; Bubbles</button>
              <button class="keyboard-tab" data-cat="tech" style="font-size: 10.5px; padding: 3px 8px;">⚡ Tech &amp; Mono</button>
              <button class="keyboard-tab" data-cat="symbols" style="font-size: 10.5px; padding: 3px 8px;">✨ Frames &amp; Wings</button>
              <button class="keyboard-tab" data-cat="glitch" style="font-size: 10.5px; padding: 3px 8px;">👹 Glitch &amp; Zalgo</button>
            </div>

            <!-- Font Size Preview Slider -->
            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-muted);">
              <span>Size:</span>
              <input type="range" id="font-size-slider" min="13" max="26" step="1" value="17" style="width: 75px; accent-color: var(--accent-purple);">
              <span id="font-size-val" style="font-family: var(--font-mono); font-size: 11px; min-width: 28px;">17px</span>
            </div>
          </div>

          <!-- Pinned Favorites Container (Rendered if any are pinned) -->
          <div id="font-pinned-section" style="display: none; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #fbbf24; letter-spacing: 0.5px;">
              <span>⭐ Pinned Favorites</span>
            </div>
            <div id="font-pinned-grid" style="display: flex; flex-direction: column; gap: 8px;">
              <!-- Pinned cards -->
            </div>
          </div>

          <!-- Main Font Gallery Cards Container (Natural panel scrolling, zero double scrollbars) -->
          <div id="font-gallery-grid" style="display: flex; flex-direction: column; gap: 10px; flex: 1;">
            <!-- Rendered dynamically via JS -->
          </div>
        </div>

        <!-- 3. BOTTOM: Canonical Full-Width Quick Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: How to Use Fancy Font &amp; Bio Studio</span>
            </div>
            <div class="tool-guide-badge">Universal Copy-Paste</div>
          </div>

          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Input &amp; Instant 60+ Style Transformation</h4>
                <p>Type or paste your text in the <strong>Input Text</strong> area on the left. The live visual stage instantly converts your characters across 60+ genuine Unicode typography styles (Cursive, Gothic Fraktur, Small Caps, Bubbles, and Glitch).</p>
              </div>
            </div>

            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Filter Categories &amp; One-Click Clipboard Copy</h4>
                <p>Filter styles by category or type in the search bar. Click anywhere on any font card to immediately copy the transformed text to your clipboard. Tap the <strong>Star</strong> icon to pin your top styles to your Favorites gallery.</p>
              </div>
            </div>

            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Bio Studio &amp; Aesthetic Symbol Palette</h4>
                <p>Switch to the <strong>Bio Studio</strong> tab to access curated social media bio layouts for Instagram, TikTok, and Discord, complete with a 200+ aesthetic symbol palette featuring stars (✦ ⋆), celestial moons, cute kaomoji, and dividers.</p>
              </div>
            </div>

            <div class="tool-guide-step">
              <div class="tool-step-num">4</div>
              <div class="tool-step-content">
                <h4>100% Cross-Platform Unicode Standard</h4>
                <p>Because these glyphs leverage native Unicode Mathematical Alphanumeric blocks rather than font files, they render identically on iOS, Android, Windows, macOS, Discord channels, and games (Roblox, Fortnite, Steam) with zero server transmission.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init(container, app) {
    appInstance = app || (container && typeof container.showToast === 'function' ? container : null);
    const root = container || document.querySelector("#tool-viewport") || document;
    if (!root) return;

    let activeCategory = "all";
    let activeBioCategory = "all";
    let searchQuery = "";
    let symbolSearchQuery = "";
    let activeDecoration = "none";
    let zalgoIntensity = 4;
    let previewFontSize = 17;
    let activeTab = "styler";
    let favList = getSavedFavorites();

    const inputArea = root.querySelector("#font-input-text");
    const charCountBadge = root.querySelector("#font-char-count");
    const galleryGrid = root.querySelector("#font-gallery-grid");
    const pinnedSection = root.querySelector("#font-pinned-section");
    const pinnedGrid = root.querySelector("#font-pinned-grid");
    const zalgoBox = root.querySelector("#font-zalgo-controls");
    const zalgoSlider = root.querySelector("#font-zalgo-slider");
    const zalgoVal = root.querySelector("#font-zalgo-val");
    const prefixSelect = root.querySelector("#font-prefix-select");
    const customWrapperRow = root.querySelector("#font-custom-wrapper-row");
    const customPrefixInput = root.querySelector("#font-custom-prefix");
    const customSuffixInput = root.querySelector("#font-custom-suffix");
    const searchInput = root.querySelector("#font-search-input");
    const searchClearBtn = root.querySelector("#font-search-clear");
    const styleCountBadge = root.querySelector("#font-style-count");
    const fontSizeSlider = root.querySelector("#font-size-slider");
    const fontSizeVal = root.querySelector("#font-size-val");
    const splitLayout = root.querySelector(".tool-content-layout.split-view");
    const rightPanel = root.querySelectorAll(".tool-panel")[1];

    // Bio Limit Badges
    const chipIg = root.querySelector("#chip-ig");
    const chipTiktok = root.querySelector("#chip-tiktok");
    const chipTwitter = root.querySelector("#chip-twitter");
    const chipDiscord = root.querySelector("#chip-discord");
    const limitIgVal = root.querySelector("#limit-ig-val");
    const limitTiktokVal = root.querySelector("#limit-tiktok-val");
    const limitTwitterVal = root.querySelector("#limit-twitter-val");
    const limitDiscordVal = root.querySelector("#limit-discord-val");

    // Subtab containers
    const stylerContainer = root.querySelector("#subtab-styler-container");
    const templatesContainer = root.querySelector("#subtab-templates-container");
    const symbolsContainer = root.querySelector("#subtab-symbols-container");

    // Robust Clipboard Copy with fallback
    const copyTextSafely = async (text) => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch (e) {}
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const success = document.execCommand("copy");
        document.body.removeChild(ta);
        return success;
      } catch (e) {
        return false;
      }
    };

    // Update social bio limit chips with warning/danger state
    const updateBioLimits = (text) => {
      const len = text ? text.length : 0;

      const updateChip = (chip, valEl, max) => {
        if (!chip || !valEl) return;
        valEl.textContent = `${len}/${max}`;
        chip.classList.remove("status-good", "status-warn", "status-danger");
        if (len <= Math.floor(max * 0.85)) {
          chip.classList.add("status-good");
        } else if (len <= max) {
          chip.classList.add("status-warn");
        } else {
          chip.classList.add("status-danger");
          valEl.textContent = `${len}/${max} (+${len - max})`;
        }
      };

      updateChip(chipIg, limitIgVal, 150);
      updateChip(chipTiktok, limitTiktokVal, 80);
      updateChip(chipTwitter, limitTwitterVal, 160);
      updateChip(chipDiscord, limitDiscordVal, 190);
    };

    // Apply outer embellishments
    const applyEmbellishment = (text) => {
      if (activeDecoration === "sparkles") return `✨ ${text} ✨`;
      if (activeDecoration === "wings") return `꧁༺ ${text} ༻꧂`;
      if (activeDecoration === "angel") return `𓆩 ${text} 𓆪`;
      if (activeDecoration === "ribbon_bow") return `୨୧ ${text} ୨୧`;
      if (activeDecoration === "stars") return `★彡 ${text} 彡★`;
      if (activeDecoration === "ribbon") return `｡ﾟ•┈୨ ${text} ୧┈•ﾟ｡`;
      if (activeDecoration === "starlight") return `⋆｡°✩ ${text} ✩°｡⋆`;
      if (activeDecoration === "brackets") return `【 ${text} 】`;
      if (activeDecoration === "quotes") return `『 ${text} 』`;
      if (activeDecoration === "double_brackets") return `〚 ${text} 〛`;
      if (activeDecoration === "hearts") return `♡ ${text} ♡`;
      if (activeDecoration === "diamond") return `╔═ ${text} ═╗`;
      if (activeDecoration === "moon") return `☾⋆ ${text} ⋆☽`;
      if (activeDecoration === "clan") return `亗 ${text} 亗`;
      if (activeDecoration === "sniper") return `⚔️ [ ${text} ] ⚔️`;
      if (activeDecoration === "waves") return `░░ ${text} ░░`;
      if (activeDecoration === "neon") return `⚡ [ ${text} ] ⚡`;
      if (activeDecoration === "custom") {
        const pre = customPrefixInput?.value || "";
        const suf = customSuffixInput?.value || "";
        return `${pre}${text}${suf}`;
      }
      return text;
    };

    // Build a card HTML
    const createFontCardHtml = (font, rawText, isPinned = false) => {
      let transformed = font.transform(rawText, zalgoIntensity);
      transformed = applyEmbellishment(transformed);

      return `
        <div class="glass-card font-card-item ${isPinned ? 'is-pinned' : ''}" data-font-id="${escapeHtml(font.id)}" data-text="${escapeHtml(transformed)}" title="Click anywhere on card to copy">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <button class="star-pin-btn ${isPinned ? 'active' : ''}" data-font-id="${escapeHtml(font.id)}" title="${isPinned ? 'Unpin from favorites' : 'Pin to top of gallery'}">
                <svg viewBox="0 0 24 24" fill="${isPinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </button>
              <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px;">${escapeHtml(font.name)}</span>
            </div>
            <span class="tool-badge" style="font-size: 9.5px; padding: 2px 7px; background: rgba(157, 78, 221, 0.15); color: var(--accent-purple); font-weight: 700;">${escapeHtml(font.badge)}</span>
          </div>

          <div class="font-preview-text" style="font-size: ${previewFontSize}px;">${escapeHtml(transformed)}</div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
            <span style="font-size: 10.5px; color: var(--text-muted); font-family: var(--font-mono);">${transformed.length} chars</span>
            <button class="tool-btn secondary copy-font-btn" data-text="${escapeHtml(transformed)}" style="font-size: 11px; padding: 4px 12px; display: inline-flex; align-items: center; gap: 6px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy</span>
            </button>
          </div>
        </div>
      `;
    };

    // Master render function for the right panel gallery
    const renderGallery = () => {
      const rawText = inputArea?.value || "OmniTool Hub";
      const charCount = inputArea?.value ? inputArea.value.length : 0;
      const wordCount = inputArea?.value ? inputArea.value.trim().split(/\s+/).filter(Boolean).length : 0;

      if (charCountBadge) {
        charCountBadge.textContent = `${charCount} char${charCount === 1 ? "" : "s"} • ${wordCount} word${wordCount === 1 ? "" : "s"}`;
      }
      updateBioLimits(inputArea?.value || "");

      // Filter fonts
      const filtered = UNICODE_FONTS.filter(f => {
        const matchesCat = activeCategory === "all" || f.category === activeCategory;
        const matchesSearch = !searchQuery ||
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
      });

      if (styleCountBadge) {
        styleCountBadge.textContent = `${filtered.length} Style${filtered.length === 1 ? "" : "s"}`;
      }

      // Handle Pinned favorites
      const pinnedFonts = UNICODE_FONTS.filter(f => favList.includes(f.id));
      if (pinnedSection && pinnedGrid) {
        if (pinnedFonts.length > 0 && activeCategory === "all" && !searchQuery) {
          pinnedSection.style.display = "flex";
          pinnedGrid.innerHTML = pinnedFonts.map(f => createFontCardHtml(f, rawText, true)).join("");
        } else {
          pinnedSection.style.display = "none";
        }
      }

      // Handle Main gallery
      if (filtered.length === 0) {
        galleryGrid.innerHTML = `
          <div style="padding: 48px 16px; text-align: center; color: var(--text-muted); font-size: 13.5px; background: rgba(255,255,255,0.015); border: 1px dashed var(--border-color); border-radius: 10px;">
            <p style="margin-bottom: 8px;">No font styles found matching "<strong>${escapeHtml(searchQuery)}</strong>"</p>
            <button class="tool-btn secondary" id="clear-search-link-btn" style="font-size: 11px;">Reset Search &amp; Filters</button>
          </div>
        `;
        galleryGrid.querySelector("#clear-search-link-btn")?.addEventListener("click", () => {
          if (searchInput) searchInput.value = "";
          searchQuery = "";
          if (searchClearBtn) searchClearBtn.style.display = "none";
          activeCategory = "all";
          root.querySelectorAll("#font-category-filters .keyboard-tab").forEach(t => t.classList.toggle("active", t.dataset.cat === "all"));
          renderGallery();
        });
        return;
      }

      galleryGrid.innerHTML = filtered.map(f => createFontCardHtml(f, rawText, favList.includes(f.id))).join("");

      // Bind Copy and Pin buttons
      bindGalleryActions(galleryGrid);
      if (pinnedGrid) bindGalleryActions(pinnedGrid);
    };

    // Attach copy & pin listeners with card-level click-to-copy
    const bindGalleryActions = (container) => {
      // 1. Direct copy button
      container.querySelectorAll(".copy-font-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();
          const textToCopy = btn.dataset.text;
          if (!textToCopy) return;

          const copied = await copyTextSafely(textToCopy);
          if (copied) {
            appInstance?.playSynthSound?.('click');
            const span = btn.querySelector("span");
            const orig = span ? span.textContent : "Copy";
            if (span) span.textContent = "Copied!";
            btn.classList.add("active");
            btn.style.color = "var(--accent-emerald)";
            setTimeout(() => {
              if (span) span.textContent = orig;
              btn.classList.remove("active");
              btn.style.color = "";
            }, 1600);

            appInstance?.showToast?.("Copied fancy font to clipboard!", "success");
          }
        });
      });

      // 2. Whole card click to copy affordance
      container.querySelectorAll(".font-card-item").forEach(card => {
        card.addEventListener("click", async (e) => {
          // Skip if clicking pin star or copy button directly (handled separately)
          if (e.target.closest(".star-pin-btn") || e.target.closest(".copy-font-btn")) return;
          const textToCopy = card.dataset.text;
          if (!textToCopy) return;

          const copied = await copyTextSafely(textToCopy);
          if (copied) {
            appInstance?.playSynthSound?.('click');
            const copyBtn = card.querySelector(".copy-font-btn");
            const span = copyBtn?.querySelector("span");
            const orig = span ? span.textContent : "Copy";
            if (span) span.textContent = "Copied!";
            copyBtn?.classList.add("active");
            if (copyBtn) copyBtn.style.color = "var(--accent-emerald)";
            card.style.borderColor = "var(--accent-emerald)";
            setTimeout(() => {
              if (span) span.textContent = orig;
              copyBtn?.classList.remove("active");
              if (copyBtn) copyBtn.style.color = "";
              card.style.borderColor = "";
            }, 1600);

            appInstance?.showToast?.("Copied fancy font to clipboard!", "success");
          }
        });
      });

      // 3. Pin toggle button
      container.querySelectorAll(".star-pin-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          appInstance?.playSynthSound?.('click');
          const fontId = btn.dataset.fontId;
          if (favList.includes(fontId)) {
            favList = favList.filter(id => id !== fontId);
          } else {
            favList.push(fontId);
          }
          saveFavorites(favList);
          renderGallery();
        });
      });
    };

    // Render Bio Templates Tab
    const renderTemplates = () => {
      if (!templatesContainer) return;
      const grid = templatesContainer.querySelector("#bio-templates-grid");
      if (!grid) return;

      const filtered = BIO_TEMPLATES.filter(tpl => {
        return activeBioCategory === "all" || tpl.category === activeBioCategory;
      });

      grid.innerHTML = filtered.map(tpl => `
        <div class="glass-card font-card-item" style="padding: 12px 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 12px; color: var(--text-main);">${escapeHtml(tpl.title)}</strong>
            <span class="tool-badge" style="font-size: 9.5px; padding: 2px 6px; background: rgba(0, 242, 254, 0.15); color: var(--accent-cyan); font-weight: 700;">${escapeHtml(tpl.badge)}</span>
          </div>
          <div class="bio-card-preview">${escapeHtml(tpl.text)}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
            <span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">${tpl.text.length} chars</span>
            <div style="display: flex; gap: 6px;">
              <button class="tool-btn secondary bio-use-btn" data-text="${escapeHtml(tpl.text)}" style="font-size: 10.5px; padding: 3px 8px;">Use in Styler</button>
              <button class="tool-btn secondary bio-copy-btn" data-text="${escapeHtml(tpl.text)}" style="font-size: 10.5px; padding: 3px 8px;">Copy Bio</button>
            </div>
          </div>
        </div>
      `).join("");

      // Bind use & copy actions
      grid.querySelectorAll(".bio-use-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          appInstance?.playSynthSound?.('click');
          if (inputArea) {
            inputArea.value = btn.dataset.text;
            root.querySelector('[data-tab="styler"]')?.click();
            renderGallery();
            inputArea.focus();
            appInstance?.showToast?.("Loaded template into Styler!", "info");
          }
        });
      });

      grid.querySelectorAll(".bio-copy-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const success = await copyTextSafely(btn.dataset.text);
          if (success) {
            appInstance?.playSynthSound?.('click');
            btn.textContent = "Copied!";
            setTimeout(() => { btn.textContent = "Copy Bio"; }, 1500);
            appInstance?.showToast?.("Bio template copied to clipboard!", "success");
          }
        });
      });
    };

    // Render Aesthetic Symbols Tab with live search
    const renderSymbols = () => {
      if (!symbolsContainer) return;
      const wrap = symbolsContainer.querySelector("#symbols-categories-wrap");
      if (!wrap) return;

      const q = symbolSearchQuery.toLowerCase();
      const filteredCategories = SYMBOL_CATEGORIES.map(cat => {
        const matchingSymbols = q
          ? cat.symbols.filter(s => s.toLowerCase().includes(q) || cat.name.toLowerCase().includes(q))
          : cat.symbols;
        return { ...cat, symbols: matchingSymbols };
      }).filter(cat => cat.symbols.length > 0);

      if (filteredCategories.length === 0) {
        wrap.innerHTML = `
          <div style="padding: 24px 12px; text-align: center; color: var(--text-muted); font-size: 12px;">
            No symbols found matching "${escapeHtml(symbolSearchQuery)}".
          </div>
        `;
        return;
      }

      wrap.innerHTML = filteredCategories.map(cat => `
        <div style="padding: 10px 12px; border: 1px solid var(--border-color); border-radius: 8px; background: rgba(255, 255, 255, 0.015);">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; letter-spacing: 0.5px; display: flex; justify-content: space-between;">
            <span>${escapeHtml(cat.name)}</span>
            <span style="font-size: 10px; color: var(--text-muted);">${cat.symbols.length} items</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${cat.symbols.map(sym => `
              <button class="symbol-btn-tile" data-symbol="${escapeHtml(sym)}" title="Click to insert '${sym}' &amp; copy to clipboard">${escapeHtml(sym)}</button>
            `).join("")}
          </div>
        </div>
      `).join("");

      // Click to insert symbol into textarea + copy to clipboard
      wrap.querySelectorAll(".symbol-btn-tile").forEach(btn => {
        btn.addEventListener("click", async () => {
          const sym = btn.dataset.symbol;
          appInstance?.playSynthSound?.('click');

          if (inputArea) {
            const start = inputArea.selectionStart || 0;
            const end = inputArea.selectionEnd || 0;
            const val = inputArea.value;
            inputArea.value = val.substring(0, start) + sym + val.substring(end);
            inputArea.selectionStart = inputArea.selectionEnd = start + sym.length;
            renderGallery();
          }

          await copyTextSafely(sym);
          appInstance?.showToast?.(`Copied "${sym}" &amp; added to text!`, "info", 1300);
        });
      });
    };

    // Sub-mode tabs switching
    root.querySelectorAll("#font-studio-tabs .keyboard-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        appInstance?.playSynthSound?.('click');
        root.querySelectorAll("#font-studio-tabs .keyboard-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeTab = tab.dataset.tab;

        if (stylerContainer) stylerContainer.style.display = activeTab === "styler" ? "block" : "none";
        if (templatesContainer) templatesContainer.style.display = activeTab === "templates" ? "block" : "none";
        if (symbolsContainer) symbolsContainer.style.display = activeTab === "symbols" ? "block" : "none";

        if (activeTab === "templates") renderTemplates();
        if (activeTab === "symbols") renderSymbols();
      });
    });

    // Bio template category filters
    root.querySelectorAll("#bio-category-filters .keyboard-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        appInstance?.playSynthSound?.('click');
        root.querySelectorAll("#bio-category-filters .keyboard-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeBioCategory = tab.dataset.bioCat;
        renderTemplates();
      });
    });

    // Quick tray "Browse all" link
    root.querySelector("#quick-tray-more-btn")?.addEventListener("click", () => {
      root.querySelector('[data-tab="symbols"]')?.click();
    });

    // Quick Symbol Tray pills
    root.querySelectorAll(".quick-symbol-pill").forEach(btn => {
      btn.addEventListener("click", async () => {
        const sym = btn.dataset.symbol;
        appInstance?.playSynthSound?.('click');

        if (inputArea) {
          const start = inputArea.selectionStart || 0;
          const end = inputArea.selectionEnd || 0;
          const val = inputArea.value;
          inputArea.value = val.substring(0, start) + sym + val.substring(end);
          inputArea.selectionStart = inputArea.selectionEnd = start + sym.length;
          inputArea.focus();
          renderGallery();
        }

        await copyTextSafely(sym);
        appInstance?.showToast?.(`Copied "${sym}" &amp; inserted!`, "info", 1300);
      });
    });

    // Symbol search input
    root.querySelector("#symbol-search-input")?.addEventListener("input", (e) => {
      symbolSearchQuery = e.target.value.trim();
      renderSymbols();
    });

    // Input text listener
    inputArea?.addEventListener("input", renderGallery);

    // Paste button
    root.querySelector("#font-paste-btn")?.addEventListener("click", async () => {
      try {
        const clipText = await navigator.clipboard.readText();
        if (clipText && inputArea) {
          inputArea.value = clipText;
          appInstance?.playSynthSound?.('click');
          renderGallery();
          appInstance?.showToast?.("Pasted text from clipboard!", "success");
        }
      } catch (err) {
        inputArea?.focus();
      }
    });

    // Sample button
    root.querySelector("#font-sample-btn")?.addEventListener("click", () => {
      if (inputArea) {
        inputArea.value = "Create, Compounding & Victory";
        appInstance?.playSynthSound?.('click');
        renderGallery();
        appInstance?.showToast?.("Loaded sample text!", "info");
      }
    });

    // Clear button
    root.querySelector("#font-clear-btn")?.addEventListener("click", () => {
      if (inputArea) {
        inputArea.value = "";
        appInstance?.playSynthSound?.('click');
        renderGallery();
      }
    });

    // Case Modifiers
    root.querySelector("#case-title-btn")?.addEventListener("click", () => {
      if (inputArea && inputArea.value) {
        inputArea.value = inputArea.value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
        appInstance?.playSynthSound?.('click');
        renderGallery();
      }
    });

    root.querySelector("#case-upper-btn")?.addEventListener("click", () => {
      if (inputArea && inputArea.value) {
        inputArea.value = inputArea.value.toUpperCase();
        appInstance?.playSynthSound?.('click');
        renderGallery();
      }
    });

    root.querySelector("#case-lower-btn")?.addEventListener("click", () => {
      if (inputArea && inputArea.value) {
        inputArea.value = inputArea.value.toLowerCase();
        appInstance?.playSynthSound?.('click');
        renderGallery();
      }
    });

    root.querySelector("#case-alter-btn")?.addEventListener("click", () => {
      if (inputArea && inputArea.value) {
        let isUpper = false;
        inputArea.value = inputArea.value.split("").map(c => {
          if (/[a-zA-Z]/.test(c)) {
            const res = isUpper ? c.toUpperCase() : c.toLowerCase();
            isUpper = !isUpper;
            return res;
          }
          return c;
        }).join("");
        appInstance?.playSynthSound?.('click');
        renderGallery();
      }
    });

    root.querySelector("#case-reverse-btn")?.addEventListener("click", () => {
      if (inputArea && inputArea.value) {
        inputArea.value = inputArea.value.split("").reverse().join("");
        appInstance?.playSynthSound?.('click');
        renderGallery();
      }
    });

    // Quick text preset pills
    root.querySelectorAll(".font-preset-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        if (inputArea) {
          inputArea.value = btn.dataset.text;
          appInstance?.playSynthSound?.('click');
          renderGallery();
        }
      });
    });

    // Embellishment Selector
    prefixSelect?.addEventListener("change", (e) => {
      activeDecoration = e.target.value;
      if (customWrapperRow) {
        customWrapperRow.style.display = activeDecoration === "custom" ? "grid" : "none";
      }
      renderGallery();
    });

    customPrefixInput?.addEventListener("input", renderGallery);
    customSuffixInput?.addEventListener("input", renderGallery);

    // Zalgo intensity slider & presets
    zalgoSlider?.addEventListener("input", (e) => {
      zalgoIntensity = parseInt(e.target.value, 10);
      if (zalgoVal) zalgoVal.textContent = `Level ${zalgoIntensity}`;
      renderGallery();
    });

    root.querySelectorAll(".zalgo-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        zalgoIntensity = parseInt(btn.dataset.val, 10);
        if (zalgoSlider) zalgoSlider.value = zalgoIntensity;
        if (zalgoVal) zalgoVal.textContent = `Level ${zalgoIntensity}`;
        renderGallery();
      });
    });

    // Category filter pills
    root.querySelectorAll("#font-category-filters .keyboard-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        appInstance?.playSynthSound?.('click');
        root.querySelectorAll("#font-category-filters .keyboard-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeCategory = tab.dataset.cat;
        if (zalgoBox) zalgoBox.style.display = activeCategory === "glitch" ? "block" : "none";
        renderGallery();
      });
    });

    // Search filter input
    searchInput?.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (searchClearBtn) searchClearBtn.style.display = searchQuery ? "block" : "none";
      renderGallery();
    });

    searchClearBtn?.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      searchClearBtn.style.display = "none";
      renderGallery();
    });

    // Font size preview slider
    fontSizeSlider?.addEventListener("input", (e) => {
      previewFontSize = parseInt(e.target.value, 10);
      if (fontSizeVal) fontSizeVal.textContent = `${previewFontSize}px`;
      root.querySelectorAll(".font-preview-text").forEach(el => {
        el.style.fontSize = `${previewFontSize}px`;
      });
    });

    // Initial render
    renderGallery();
  },

  cleanup() {
    appInstance = null;
  }
};
