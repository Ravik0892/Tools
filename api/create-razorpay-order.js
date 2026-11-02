import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "./_security.js";
import crypto from "node:crypto";

/**
 * Serverless Handler: POST /api/create-razorpay-order
 * Generates an authentic server-side order with Razorpay.
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
    const plan = body.plan === "monthly" ? "monthly" : "lifetime";

    // Amount in paise (1 INR = 100 paise)
    const amountInPaise = plan === "monthly" ? 39900 : 79900;
    const currency = "INR";
    const receipt = `rcpt_${plan}_${Date.now()}`;

    // If real live/test Razorpay keys are configured
    const isLiveConfigured = RAZORPAY_KEY_ID && !RAZORPAY_KEY_ID.includes("DemoKey");

    if (isLiveConfigured) {
      const authHeader = "Basic " + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
      const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency,
          receipt,
          notes: {
            service: "OmniTool Hub Developer Pass",
            plan
          }
        })
      });

      if (!rzpRes.ok) {
        const errData = await rzpRes.json();
        res.status(502).json({
          success: false,
          error: "Razorpay API Error: " + (errData.error?.description || "Failed to create order.")
        });
        return;
      }

      const orderData = await rzpRes.json();
      res.status(200).json({
        success: true,
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        keyId: RAZORPAY_KEY_ID,
        plan
      });
      return;
    }

    // Secure Test/Demo mode order generation (when live gateway keys are pending in Vercel environment)
    const demoOrderId = `order_test_${crypto.randomBytes(8).toString("hex")}`;
    res.status(200).json({
      success: true,
      orderId: demoOrderId,
      amount: amountInPaise,
      currency,
      keyId: RAZORPAY_KEY_ID,
      plan,
      isDemoMode: true,
      hint: "Razorpay running in Test/Dev mode. Configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in production."
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Order creation failure: " + err.message });
  }
}
