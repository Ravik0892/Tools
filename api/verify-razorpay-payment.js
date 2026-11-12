import {
  verifyRazorpaySignature,
  createSignedToken,
  isProductionRuntime,
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET
} from "./_security.js";

/**
 * Serverless Handler: POST /api/verify-razorpay-payment
 * Cryptographically verifies Razorpay payment signatures (HMAC-SHA256) and confirms paid amount/plan server-side.
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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      res.status(400).json({ success: false, error: "Missing required transaction identifiers." });
      return;
    }

    const isLiveConfigured = Boolean(
      RAZORPAY_KEY_ID &&
      RAZORPAY_KEY_SECRET &&
      !RAZORPAY_KEY_ID.includes("DemoKey") &&
      !RAZORPAY_KEY_SECRET.includes("DemoKey")
    );

    let tier = plan === "monthly" ? "premium" : "lifetime";

    if (isLiveConfigured) {
      if (!razorpay_signature) {
        res.status(400).json({ success: false, error: "Missing Razorpay cryptographic signature." });
        return;
      }

      const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
      if (!isValid) {
        res.status(401).json({
          success: false,
          error: "Razorpay cryptographic signature verification failed! Payment authenticity could not be verified."
        });
        return;
      }

      // Query authoritative Razorpay order to confirm paid amount & plan (prevent plan tampering)
      const authHeader = "Basic " + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
      const orderRes = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`, {
        method: "GET",
        headers: { "Authorization": authHeader }
      });

      if (!orderRes.ok) {
        res.status(502).json({ success: false, error: "Unable to verify Razorpay order record." });
        return;
      }

      const orderData = await orderRes.json();
      const paidAmount = Number(orderData.amount_paid || orderData.amount || 0);
      const orderPlan = orderData.notes?.plan || (paidAmount >= 79900 ? "lifetime" : "monthly");
      const expectedMin = orderPlan === "monthly" ? 39900 : 79900;

      if (orderData.currency !== "INR" || paidAmount < expectedMin || (orderData.status !== "paid" && orderData.amount_paid < expectedMin)) {
        res.status(400).json({ success: false, error: "Razorpay order is not paid or amount mismatch detected." });
        return;
      }

      tier = orderPlan === "monthly" ? "premium" : "lifetime";
    } else if (isProductionRuntime()) {
      res.status(503).json({
        success: false,
        error: "Razorpay live verification credentials are not configured on the server."
      });
      return;
    }

    const expiresAt = tier === "premium" ? Date.now() + (30 * 24 * 60 * 60 * 1000) : null;

    const token = createSignedToken({
      tier,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      source: "razorpay",
      expiresAt
    });

    res.status(200).json({
      success: true,
      tier,
      token,
      expiresAt,
      message: `🎉 Payment verified! ${tier === "premium" ? "Pro Monthly" : "Lifetime PRO"} access granted.`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Payment verification error: " + err.message });
  }
}
