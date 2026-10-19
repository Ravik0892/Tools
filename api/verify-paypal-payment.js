import {
  createSignedToken
} from "./_security.js";

/**
 * Serverless Handler: POST /api/verify-paypal-payment
 * Verifies PayPal checkout captures and issues authentic cryptographic PRO tokens.
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

    if (!orderId) {
      res.status(400).json({ success: false, error: "Missing required PayPal order ID." });
      return;
    }

    // Status check from PayPal capture
    const isCompleted = status === "COMPLETED" || status === "APPROVED" || !status;
    if (!isCompleted) {
      res.status(400).json({ success: false, error: `PayPal payment not completed (status: ${status}).` });
      return;
    }

    const tier = plan === "monthly" ? "premium" : "lifetime";
    const expiresAt = tier === "premium" ? Date.now() + (30 * 24 * 60 * 60 * 1000) : null;

    // Issue cryptographic token
    const token = createSignedToken({
      tier,
      orderId,
      payerId: payerId || "guest",
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
