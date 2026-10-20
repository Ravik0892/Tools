const BASE = 'http://127.0.0.1:8000';

console.log('Testing live HTTP server at', BASE);

async function testHttp() {
  try {
    // 1. Check Plans page
    const pageRes = await fetch(`${BASE}/#plans`);
    console.log(`Page HTTP status: ${pageRes.status}`);

    // 2. Test create-razorpay-order
    const rzpRes = await fetch(`${BASE}/api/create-razorpay-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'lifetime' })
    });
    const rzpData = await rzpRes.json();
    console.log('Razorpay Order API:', rzpRes.status, rzpData);

    // 3. Test submit-utr
    const utrRes = await fetch(`${BASE}/api/submit-utr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference: '123456789012', paymentMethod: 'upi' })
    });
    const utrData = await utrRes.json();
    console.log('Submit UTR API:', utrRes.status, utrData);

    // 4. Test admin auth
    const authRes = await fetch(`${BASE}/api/admin-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'OmniAdmin@2026#' })
    });
    const authData = await authRes.json();
    console.log('Admin Auth API:', authRes.status, authData);

    // 5. Test admin key generation
    const keyRes = await fetch(`${BASE}/api/admin-generate-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: 'lifetime', customerId: 'TEST1234' })
    });
    const keyData = await keyRes.json();
    console.log('Admin Generate Key API:', keyRes.status, keyData);

    // 6. Test verify license with the generated key
    if (keyData.licenseKey) {
      const vRes = await fetch(`${BASE}/api/verify-license`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: keyData.licenseKey })
      });
      const vData = await vRes.json();
      console.log('Verify License API:', vRes.status, vData);
    }

    console.log('\nAll live HTTP API endpoints are functional!');
  } catch (err) {
    console.error('HTTP test error:', err.message);
  }
}

testHttp();
