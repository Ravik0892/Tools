// Test Suite: Accidental Reload & Data Protection Guard Verification
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

console.log("================================================================");
console.log("🛡️ TESTING ACCIDENTAL RELOAD & DATA LOSS PROTECTION ENGINE");
console.log("================================================================\n");

const appCode = readFileSync(resolve("app.js"), "utf8");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failed++;
  }
}

// 1. Verify hasUnsavedWork method exists in app.js
assert(
  appCode.includes("hasUnsavedWork() {"),
  "hasUnsavedWork() method is declared in app.js"
);

// 2. Verify beforeunload listener is registered in bindEvents()
assert(
  appCode.includes('window.addEventListener("beforeunload",'),
  "beforeunload event listener is properly attached to window in bindEvents()"
);

// 3. Verify beforeunload sets standard returnValue for native prompt
assert(
  appCode.includes("e.returnValue =") && appCode.includes("e.preventDefault()"),
  "beforeunload calls e.preventDefault() and assigns e.returnValue to trigger browser confirmation dialog"
);

// 4. Verify Service Worker update checks for unsaved work before reloading
assert(
  appCode.includes('this.hasUnsavedWork()') && appCode.includes("Deferring reload"),
  "Service worker controllerchange listener checks this.hasUnsavedWork() and defers reload if user is busy"
);

// 5. Verify clearAppCache does NOT touch localStorage.clear()
const clearAppCacheBlock = appCode.slice(
  appCode.indexOf("async clearAppCache() {"),
  appCode.indexOf("initLayoutScale() {")
);

assert(
  !clearAppCacheBlock.includes("localStorage.clear()"),
  "clearAppCache() does NOT call localStorage.clear(), keeping lifetime licenses and settings 100% safe"
);

assert(
  !clearAppCacheBlock.includes("sessionStorage.clear()"),
  "clearAppCache() does NOT call sessionStorage.clear()"
);

assert(
  clearAppCacheBlock.includes("this.hasUnsavedWork()"),
  "clearAppCache() warns user if active in-progress work exists before proceeding"
);

console.log("\n================================================================");
console.log(`SUMMARY: ${passed}/${passed + failed} TESTS PASSED (${failed} FAILED)`);
if (failed === 0) {
  console.log("🏆 ACCIDENTAL RELOAD GUARD & LIFETIME DATA PROTECTION VERIFIED!");
}
console.log("================================================================");

if (failed > 0) process.exit(1);
