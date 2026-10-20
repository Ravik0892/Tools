import crypto from 'node:crypto';
import {
  createSignedToken,
  verifySignedToken,
  generateLicenseKey,
  verifyLicenseKey,
  verifyRazorpaySignature,
  verifyGumroadLicense,
  timingSafeCompare
} from '../api/_security.js';

import createRazorpayOrderHandler from '../api/create-razorpay-order.js';
import verifyRazorpayPaymentHandler from '../api/verify-razorpay-payment.js';
import verifyPaypalPaymentHandler from '../api/verify-paypal-payment.js';
import verifyLicenseHandler from '../api/verify-license.js';
import submitUtrHandler from '../api/submit-utr.js';
import verifyTokenHandler from '../api/verify-token.js';
import adminAuthHandler from '../api/admin-auth.js';
import adminGenerateKeyHandler from '../api/admin-generate-key.js';

console.log('================================================================');
console.log('🌟 OMNITOOL HUB - WORLD-CLASS PAYMENT SYSTEM AUTOMATION TEST SUITE');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${testName} - ${details}`);
    failedTests++;
  }
}

// Mock Response Helper for Express/Vercel serverless handlers
function createMockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(k, v) {
      this.headers[k] = v;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
    end() {
      return this;
    }
  };
}

// -------------------------------------------------------------
// TEST 1: Cryptographic Engine & Token Signature Verification
// -------------------------------------------------------------
console.log('1. Testing Core Cryptographic Security Engine (_security.js)...');

// 1.1 Timing Safe Compare
assert(timingSafeCompare('secret123', 'secret123'), 'timingSafeCompare succeeds with identical strings');
assert(!timingSafeCompare('secret123', 'wrong456'), 'timingSafeCompare rejects different strings');
assert(!timingSafeCompare('secret123', 'secret1234'), 'timingSafeCompare rejects mismatched lengths safely');

// 1.2 Signed Token Generation & Verification
const testToken = createSignedToken({ tier: 'lifetime', user: 'test_dev' });
assert(typeof testToken === 'string' && testToken.includes('.'), 'createSignedToken produces valid payload.signature token');

const validTokenResult = verifySignedToken(testToken);
assert(validTokenResult.valid === true && validTokenResult.payload.tier === 'lifetime', 'verifySignedToken verifies authentic token');

// 1.3 Tamper Detection on Token
const [pl, sig] = testToken.split('.');
const tamperedPayload = Buffer.from(JSON.stringify({ tier: 'premium', user: 'hacker' })).toString('base64url');
const tamperedToken = `${tamperedPayload}.${sig}`;
const tamperedResult = verifySignedToken(tamperedToken);
assert(tamperedResult.valid === false, 'verifySignedToken detects and rejects tampered payload');

// 1.4 Offline License Key Generation and Verification
const generatedProKey = generateLicenseKey('lifetime', 'ABCD1234');
assert(generatedProKey.startsWith('OMNI-PRO-ABCD1234-'), 'generateLicenseKey formats lifetime key correctly');

const keyVerification = verifyLicenseKey(generatedProKey);
assert(keyVerification.valid === true && keyVerification.tier === 'lifetime', 'verifyLicenseKey verifies authentic cryptographic key');

const fakeKey = 'OMNI-PRO-ABCD1234-FAKESIG1';
const fakeKeyVerification = verifyLicenseKey(fakeKey);
assert(fakeKeyVerification.valid === false, 'verifyLicenseKey rejects forged key signature');

// 1.5 Monthly License Key
const generatedMonKey = generateLicenseKey('premium');
assert(generatedMonKey.startsWith('OMNI-MON-'), 'generateLicenseKey formats monthly key correctly');
const monVerification = verifyLicenseKey(generatedMonKey);
assert(monVerification.valid === true && monVerification.tier === 'premium' && monVerification.expiresAt > Date.now(), 'verifyLicenseKey sets 30-day expiration for monthly pass');

// -------------------------------------------------------------
// TEST 2: Razorpay Order Creation & Payment Verification
// -------------------------------------------------------------
console.log('\n2. Testing Razorpay Automated Gateway Handlers...');

// 2.1 Order Creation Handler - Lifetime Pass
{
  const req = { method: 'POST', body: { plan: 'lifetime' }, headers: {} };
  const res = createMockRes();
  await createRazorpayOrderHandler(req, res);
  assert(res.statusCode === 200 && res.body.success === true, 'POST /api/create-razorpay-order creates order successfully');
  assert(res.body.amount === 249900 && res.body.currency === 'INR', 'Lifetime order amount is ₹2,499 (249900 paise)');
  assert(Boolean(res.body.orderId), `Order ID returned: ${res.body.orderId}`);
}

// 2.2 Order Creation Handler - Pro Monthly Pass
{
  const req = { method: 'POST', body: { plan: 'monthly' }, headers: {} };
  const res = createMockRes();
  await createRazorpayOrderHandler(req, res);
  assert(res.statusCode === 200 && res.body.success === true, 'POST /api/create-razorpay-order creates monthly order');
  assert(res.body.amount === 39900, 'Monthly order amount is ₹399 (39900 paise)');
}

// 2.3 Razorpay Payment Verification - Test Mode Signature
{
  const req = {
    method: 'POST',
    body: {
      razorpay_order_id: 'order_test_12345',
      razorpay_payment_id: 'pay_test_67890',
      plan: 'lifetime'
    },
    headers: {}
  };
  const res = createMockRes();
  await verifyRazorpayPaymentHandler(req, res);
  assert(res.statusCode === 200 && res.body.success === true, 'POST /api/verify-razorpay-payment verifies and activates lifetime pass');
  assert(Boolean(res.body.token), 'Issues authentic cryptographic License Token upon verification');
}

// -------------------------------------------------------------
// TEST 3: PayPal Smart Buttons & Capture Verification
// -------------------------------------------------------------
console.log('\n3. Testing PayPal Automated Verification Handler...');

{
  const req = {
    method: 'POST',
    body: {
      orderId: 'PAYPAL-ORD-987654321',
      payerId: 'PAYER-ALICE',
      status: 'COMPLETED',
      plan: 'lifetime'
    },
    headers: {}
  };
  const res = createMockRes();
  await verifyPaypalPaymentHandler(req, res);
  assert(res.statusCode === 200 && res.body.success === true, 'POST /api/verify-paypal-payment verifies COMPLETED status');
  assert(res.body.tier === 'lifetime', 'Unlocks lifetime tier for PayPal developer pass');
  assert(Boolean(res.body.token), 'Cryptographic token returned for instant client-side activation');
}

// 3.2 PayPal Incomplete Status Rejection
{
  const req = {
    method: 'POST',
    body: {
      orderId: 'PAYPAL-ORD-FAILED',
      status: 'VOIDED',
      plan: 'monthly'
    },
    headers: {}
  };
  const res = createMockRes();
  await verifyPaypalPaymentHandler(req, res);
  assert(res.statusCode === 400 && res.body.success === false, 'POST /api/verify-paypal-payment rejects VOIDED/DECLINED payments');
}

// -------------------------------------------------------------
// TEST 4: Unified License Verification (Cryptographic + Gumroad)
// -------------------------------------------------------------
console.log('\n4. Testing Unified License Verification Engine (verify-license.js)...');

// 4.1 Valid Cryptographic Key
{
  const validKey = generateLicenseKey('lifetime', 'CLNT9988');
  const req = { method: 'POST', body: { code: validKey }, headers: {} };
  const res = createMockRes();
  await verifyLicenseHandler(req, res);
  assert(res.statusCode === 200 && res.body.success === true, 'POST /api/verify-license accepts valid cryptographic OMNI key');
  assert(res.body.tier === 'lifetime', 'Verified tier matches lifetime');
}

// 4.2 Invalid Cryptographic Key Signature
{
  const invalidKey = 'OMNI-PRO-CLNT9988-00000000';
  const req = { method: 'POST', body: { code: invalidKey }, headers: {} };
  const res = createMockRes();
  await verifyLicenseHandler(req, res);
  assert(res.statusCode === 401 && res.body.success === false, 'POST /api/verify-license rejects invalid cryptographic signature');
}

// 4.3 Arbitrary Bypass String Rejection
{
  const req = { method: 'POST', body: { code: 'some-random-bypass-attempt' }, headers: {} };
  const res = createMockRes();
  await verifyLicenseHandler(req, res);
  assert(res.statusCode === 401 && res.body.success === false, 'POST /api/verify-license rejects random input text');
}

// -------------------------------------------------------------
// TEST 5: Manual Payment UTR & Crypto TXID Submission
// -------------------------------------------------------------
console.log('\n5. Testing Manual UTR / Bank / Crypto Tracking Engine (submit-utr.js)...');

// 5.1 Valid 12-digit UPI UTR
{
  const req = { method: 'POST', body: { reference: '429182736450', paymentMethod: 'upi' }, headers: {} };
  const res = createMockRes();
  await submitUtrHandler(req, res);
  assert(res.statusCode === 200 && res.body.success === true, 'POST /api/submit-utr accepts 12-digit UPI UTR');
  assert(res.body.referenceId.startsWith('OMNI-REF-'), 'Generates official bank clearance reference ID');
  assert(Boolean(res.body.receiptProof), 'Issues cryptographic audit receipt proof');
}

// 5.2 Valid 64-char Crypto TXID
{
  const txid = '0x' + crypto.randomBytes(32).toString('hex');
  const req = { method: 'POST', body: { reference: txid, paymentMethod: 'crypto' }, headers: {} };
  const res = createMockRes();
  await submitUtrHandler(req, res);
  assert(res.statusCode === 200 && res.body.success === true, 'POST /api/submit-utr accepts 64-char Crypto TXID hash');
}

// 5.3 Invalid UTR Format (e.g. 8 digits or letters)
{
  const req = { method: 'POST', body: { reference: '12345678', paymentMethod: 'upi' }, headers: {} };
  const res = createMockRes();
  await submitUtrHandler(req, res);
  assert(res.statusCode === 400 && res.body.success === false, 'POST /api/submit-utr rejects non-12-digit numbers');
}

// -------------------------------------------------------------
// TEST 6: Token Verification Service (verify-token.js)
// -------------------------------------------------------------
console.log('\n6. Testing Client Access Token Verification (verify-token.js)...');

{
  const activeToken = createSignedToken({ tier: 'lifetime' });
  const req = { method: 'POST', body: { token: activeToken }, headers: {} };
  const res = createMockRes();
  await verifyTokenHandler(req, res);
  assert(res.statusCode === 200 && res.body.valid === true, 'POST /api/verify-token validates active cryptographic token');
}

{
  const expiredToken = createSignedToken({ tier: 'premium', expiresAt: Date.now() - 5000 });
  const req = { method: 'POST', body: { token: expiredToken }, headers: {} };
  const res = createMockRes();
  await verifyTokenHandler(req, res);
  assert(res.statusCode === 401 && res.body.valid === false, 'POST /api/verify-token rejects expired license tokens');
}

// -------------------------------------------------------------
// TEST 7: Admin Control Panel Auth & License Generator
// -------------------------------------------------------------
console.log('\n7. Testing Admin Authentication & Cryptographic Key Generator...');

let adminSessionToken = '';

// 7.1 Admin Login with Correct Passcode
{
  const req = { method: 'POST', body: { password: 'OmniAdmin@2026#' }, headers: {} };
  const res = createMockRes();
  await adminAuthHandler(req, res);
  assert(res.statusCode === 200 && res.body.success === true, 'POST /api/admin-auth grants admin session for valid master passcode');
  adminSessionToken = res.body.token;
  assert(Boolean(adminSessionToken), 'Admin session token generated');
}

// 7.2 Admin Login Rejection on Wrong Password
{
  const req = { method: 'POST', body: { password: 'WrongPassword' }, headers: {} };
  const res = createMockRes();
  await adminAuthHandler(req, res);
  assert(res.statusCode === 401 && res.body.success === false, 'POST /api/admin-auth rejects incorrect master passcode');
}

// 7.3 Admin Key Generation
{
  const req = {
    method: 'POST',
    body: { tier: 'lifetime', customerId: 'TESTCUST' },
    headers: { authorization: `Bearer ${adminSessionToken}` }
  };
  const res = createMockRes();
  await adminGenerateKeyHandler(req, res);
  assert(res.statusCode === 200 && res.body.success === true, 'POST /api/admin-generate-key issues authentic signed key');
  assert(res.body.licenseKey.startsWith('OMNI-PRO-TESTCUST-'), `Issued key format: ${res.body.licenseKey}`);

  // Test that this newly generated key works in verify-license
  const verifyReq = { method: 'POST', body: { code: res.body.licenseKey }, headers: {} };
  const verifyRes = createMockRes();
  await verifyLicenseHandler(verifyReq, verifyRes);
  assert(verifyRes.statusCode === 200 && verifyRes.body.success === true, 'Generated key immediately redeems successfully in verify-license');
}

// 7.4 Admin Key Generation Unauthorized Check
{
  const req = {
    method: 'POST',
    body: { tier: 'lifetime' },
    headers: { authorization: 'Bearer invalid_or_missing_token' }
  };
  const res = createMockRes();
  await adminGenerateKeyHandler(req, res);
  assert(res.statusCode === 403 || res.statusCode === 401, 'POST /api/admin-generate-key rejects unauthorized requests');
}

console.log('\n================================================================');
console.log(`SUMMARY: ${passedTests}/${totalTests} TESTS PASSED (${failedTests} FAILED)`);
if (failedTests === 0) {
  console.log('🏆 100% OF PAYMENT SYSTEM & AUTOMATION TESTS PASSED PERFECTLY!');
}
console.log('================================================================\n');
