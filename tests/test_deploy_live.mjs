import handler from '../api/deploy-live.js';
import fs from 'fs';

// Mock request and response
let statusCode = 200;
let jsonResult = null;

const req = {
  method: 'POST',
  headers: {},
  body: {
    config: {
      omnitool_upi_id: "test@okaxis",
      omnitool_test_key: "unit_test_val"
    },
    commitMessage: "test: verify deploy-live handler",
    pushToLive: false // Don't actually push during dry run unit test
  }
};

const res = {
  setHeader: () => {},
  status: (code) => { statusCode = code; return res; },
  json: (data) => { jsonResult = data; }
};

console.log("Testing api/deploy-live.js handler...");
await handler(req, res);

console.log("Response status:", statusCode);
console.log("Response JSON:", jsonResult);

if (statusCode === 200 && jsonResult && jsonResult.success && jsonResult.savedFile === "ad-config.json") {
  console.log("SUCCESS: api/deploy-live.js wrote config and responded correctly!");
  // Revert test key if needed
  const config = JSON.parse(fs.readFileSync('ad-config.json', 'utf8'));
  delete config.omnitool_test_key;
  fs.writeFileSync('ad-config.json', JSON.stringify(config, null, 2), 'utf8');
} else {
  console.error("FAIL: deploy-live handler returned invalid response");
  process.exit(1);
}
