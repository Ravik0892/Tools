import {
  createSignedToken,
  isProductionRuntime,
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  PAYPAL_API_BASE
} from "./_security.js";

/**
 * Serverless Handler: POST /api/verify-paypal-payment
 * Verifies PayPal checkout captures server-side via PayPal Orders API and issues authentic cryptographic PRO tokens.
 */
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const { orderId, payerId, status, plan } = body;

    if (!orderId || typeof orderId !== "string" || !/^[A-Za-z0-9_-]{3,64}$/.test(orderId.trim())) {
      res.status(400).json({ success: false, error: "Missing or invalid PayPal order ID." });
      return;
    }

    const cleanOrderId = orderId.trim();
    const isPaypalConfigured = Boolean(PAYPAL_CLIENT_ID && PAYPAL_CLIENT_SECRET);
    let tier = plan === "monthly" ? "premium" : "lifetime";
    let verifiedPayerId = payerId || "guest";

    if (isPaypalConfigured) {
      // Obtain OAuth2 access token from PayPal REST API
      const authHeader = "Basic " + Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
      const tokenRes = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
      });

      if (!tokenRes.ok) {
        res.status(502).json({ success: false, error: "Failed to authenticate with PayPal verification server." });
        return;
      }

      const tokenJson = await tokenRes.json();
      const accessToken = tokenJson.access_token;
      if (!accessToken) {
        res.status(502).json({ success: false, error: "Invalid OAuth response from PayPal." });
        return;
      }

      // Fetch authoritative order state directly from PayPal
      const orderRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${encodeURIComponent(cleanOrderId)}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!orderRes.ok) {
        res.status(401).json({ success: false, error: "PayPal order lookup failed or order does not exist." });
        return;
      }

      const orderData = await orderRes.json();
      if (orderData.status !== "COMPLETED") {
        res.status(400).json({ success: false, error: `PayPal order not completed (status: ${orderData.status}).` });
        return;
      }

      // Verify captured amount & derive authoritative tier (never trust client-supplied plan over paid amount)
      const purchaseUnit = orderData.purchase_units?.[0];
      const amountVal = parseFloat(purchaseUnit?.amount?.value || "0");
      const currency = (purchaseUnit?.amount?.currency_code || "").toUpperCase();
      if (currency !== "USD" || !Number.isFinite(amountVal) || amountVal < 4.0) {
        res.status(400).json({ success: false, error: "PayPal capture amount or currency mismatch." });
        return;
      }

      tier = amountVal >= 20.0 ? "lifetime" : "premium";
      verifiedPayerId = orderData.payer?.payer_id || verifiedPayerId;
    } else if (isProductionRuntime()) {
      res.status(503).json({
        success: false,
        error: "PayPal API credentials (PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET) are not configured on the server."
      });
      return;
    } else {
      // Non-production local/unit-test verification requires explicit completed status
      const isCompleted = status === "COMPLETED" || status === "APPROVED";
      if (!isCompleted) {
        res.status(400).json({ success: false, error: `PayPal payment not completed (status: ${status || "missing"}).` });
        return;
      }
    }

    const expiresAt = tier === "premium" ? Date.now() + (30 * 24 * 60 * 60 * 1000) : null;

    // Issue cryptographic token
    const token = createSignedToken({
      tier,
      orderId: cleanOrderId,
      payerId: verifiedPayerId,
      source: "paypal",
      expiresAt
    });

    res.status(200).json({
      success: true,
      tier,
      token,
      expiresAt,
      message: `🎉 PayPal payment verified! ${tier === "premium" ? "Pro Monthly" : "Lifetime PRO"} access unlocked automatically.`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "PayPal verification error: " + err.message });
  }
}
