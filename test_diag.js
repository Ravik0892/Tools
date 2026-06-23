const commonEnglishWords = new Set([
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
  "cm", "m", "km", "kg", "g", "l", "ml", "s", "min", "h", "hr", "hrs", "degree", "degrees", 
  "radian", "radians", "sin", "cos", "tan", "cosec", "sec", "cot", "log", "ln", "exp", "sqrt", 
  "pi", "theta", "alpha", "beta", "gamma", "delta", "phi", "psi", "omega", "mu", "sigma",
  "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", 
  "xv", "xvi", "xvii", "xviii", "xix", "xx",
  "pdf", "txt", "csv", "json", "app", "dev", "web", "url", "dom", "api", "npm", "git", "npx",
  "exhaustion", "mortal", "converse", "powers"
]);

const isEnglishWord = (word, index, tokens) => {
  const clean = word.toLowerCase().replace(/^[‘'“([{\-\/]+|[)\]}’’”.,;:!?\-\/]+$/g, "");
  if (clean === "") return true;
  if (/^[0-9,]+(?:\.[0-9]+)?(?:st|nd|rd|th)?$/.test(clean)) return true;
  return commonEnglishWords.has(clean);
};

const text = "d{kk 9 esa] vkius okLrfod la[;kvksa dh [kkst izkjaHk dh vkSj bl izfØ;k ls vkidks vifjes; la[;kvksa dh tkuus dk volj feykA bl vè;k; esa] ge okLrfod la[;kvksa osQ ckjs esa viuh ppkZ tkjh j[ksaxsA ;g ppkZ ge vuqPNsn 1-2 esa /ukRed iw.kk±dksa osQ vfr egRoiw.kZ xq.kksa ls izkjaHk djsaxsA ;s xq.k gSa% ;wfDyM foHkktu ,YxksfjFe (dyu fof/) (Euclid’s division algorithm) vkSj vadxf.kr dh vk/kjHkwr izes; (Fundamental Theorem of Arithmetic) A";

const tokens = text.split(/(\s+)/);
for (let i = 0; i < tokens.length; i++) {
  const t = tokens[i];
  if (t.trim() === "") continue;
  console.log(`Token: "${t}", isEnglish: ${isEnglishWord(t, i, tokens)}, clean: "${t.toLowerCase().replace(/^[‘'“([{\-\/]+|[)\]}’’”.,;:!?\-\/]+$/g, "")}"`);
}
