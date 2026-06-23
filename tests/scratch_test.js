// Test cleanIndicText logic
const commonHindiWords = new Set([
  "ने", "के", "से", "को", "का", "की", "ही", "भी", "तो", "या", "वा", "ना", "न", "व", 
  "है", "हैं", "था", "थी", "थे", "हो", "हूँ", "ए", "ओ", "आ", "इ", "उ", "जो", "सो", 
  "वे", "ये", "हर", "पर", "कर", "भर", "घर", "सब", "अब", "कब", "जब", "तब", "और", 
  "एक", "दो", "इन", "उन", "इस", "उस", "वह", "यह", "में", "पे"
]);

const cleanIndicText = (text) => {
  if (!text) return "";

  console.log("Original:  ", JSON.stringify(text));

  // 1. Remove spaces before Devanagari combining marks
  text = text.replace(/\s+([\u0901-\u0903\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963])/g, '$1');
  console.log("After Step 1:", JSON.stringify(text));

  // 2. Remove spaces after halant (virama) U+094d
  text = text.replace(/([\u094d])\s+/g, '$1');
  console.log("After Step 2:", JSON.stringify(text));

  // 3. Fix halant followed directly by vowel sign (् + ा -> ा)
  text = text.replace(/\u094d([\u093e-\u094c])/g, '$1');
  console.log("After Step 3:", JSON.stringify(text));

  let tokens = text.split(/(\s+)/);
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
        const isPrevCommon = commonHindiWords.has(prev);
        const isNextCommon = commonHindiWords.has(next);
        let shouldMerge = false;

        // Custom length helper for Devanagari (ignoring combining marks)
        const getDevLength = (str) => {
          return str.replace(/[\u0901-\u0903\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963]/g, '').length;
        };

        const prevLen = getDevLength(prev);
        const nextLen = getDevLength(next);

        if (prevLen === 1 && !isPrevCommon) shouldMerge = true;
        else if (nextLen === 1 && !isNextCommon) shouldMerge = true;
        else if (prevLen <= 2 && nextLen <= 2 && (!isPrevCommon || !isNextCommon)) shouldMerge = true;
        else if (prev.endsWith("्")) shouldMerge = true;

        if (shouldMerge) {
          console.log(`Merging "${prev}" (len ${prevLen}) and "${next}" (len ${nextLen}) -> "${prev + next}"`);
          tokens[i-1] = prev + next;
          tokens.splice(i, 2);
          merged = true;
          break;
        }
      }
    }
  }

  let result = tokens.join("").replace(/\s+/g, ' ').trim();
  console.log("After Step 4 (Merge):", JSON.stringify(result));

  // 5. Common OCR / translation adjustments
  result = result
    .replace(/([\u0915-\u0939])लए/g, '$1िए') // e.g. ललए -> लिए, कलए -> किए, दलए -> दिए
    .replace(/पेंलसल/g, 'पेंसिल')          // pencil correction
    .replace(/चूडी/g, 'चूड़ी');             // chudi correction
  console.log("After Step 5:", JSON.stringify(result));

  return result;
};

const input = "द् ा दीदी ने सभी बच्चों को गोला बनाकर बैठने के ल ल ए कहा। देखो, देखो, मेरा पें लस ल बॉक् स है लंबा, मेरी च ू ड ी है गोल।";
cleanIndicText(input);
