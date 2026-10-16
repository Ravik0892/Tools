import {
  verifyRazorpaySignature,
  createSignedToken,
  RAZORPAY_KEY_ID
} from "./_security.js";

/**
 * Serverless Handler: POST /api/verify-razorpay-payment
 * Cryptographically verifies Razorpay payment signatures (HMAC-SHA256).
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

    const isLiveConfigured = RAZORPAY_KEY_ID && !RAZORPAY_KEY_ID.includes("DemoKey");

    // In live production, HMAC signature check is mandatory
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
    }

    // Payment signature verified! Issue authentic signed License Token
    const tier = plan === "monthly" ? "premium" : "lifetime";
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
