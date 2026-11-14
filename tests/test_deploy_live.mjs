import handler from '../api/deploy-live.js';
import { createSignedToken } from '../api/_security.js';
import fs from 'fs';

// Mock request and response
let statusCode = 200;
let jsonResult = null;

const adminToken = createSignedToken({ role: "admin", expiresAt: Date.now() + 3600000 });

const req = {
  method: 'POST',
  headers: {
    authorization: `Bearer ${adminToken}`
  },
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

const originalAdConfig = fs.readFileSync('ad-config.json', 'utf8');
const androidConfigPath = 'omnitool-android-app/app/src/main/assets/web/ad-config.json';
const originalAndroidConfig = fs.existsSync(androidConfigPath) ? fs.readFileSync(androidConfigPath, 'utf8') : null;

try {
  console.log("Testing api/deploy-live.js handler...");
  await handler(req, res);

  console.log("Response status:", statusCode);
  console.log("Response JSON:", jsonResult);

  if (statusCode === 200 && jsonResult && jsonResult.success && jsonResult.savedFile === "ad-config.json") {
    console.log("SUCCESS: api/deploy-live.js wrote config and responded correctly!");
  } else {
    console.error("FAIL: deploy-live handler returned invalid response");
    process.exit(1);
  }
} finally {
  fs.writeFileSync('ad-config.json', originalAdConfig, 'utf8');
  if (originalAndroidConfig !== null) {
    fs.writeFileSync(androidConfigPath, originalAndroidConfig, 'utf8');
  }
}
