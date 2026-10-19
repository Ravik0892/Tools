import { verifySignedToken, generateLicenseKey } from "./_security.js";

/**
 * Serverless Handler: POST /api/admin-generate-key
 * Allows authenticated administrators to generate authentic, cryptographically
 * signed digital license keys for clients or manual payments.
 */
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
    return;
  }

  try {
    // Verify admin authorization
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (!token) {
      res.status(401).json({ success: false, error: "Missing admin authorization token." });
      return;
    }

    const verification = verifySignedToken(token);
    if (!verification.valid || verification.payload?.role !== "admin") {
      res.status(403).json({ success: false, error: "Unauthorized. Valid administrator session required." });
      return;
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const tier = body.tier === "premium" ? "premium" : "lifetime";
    const customerId = (body.customerId || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);

    const licenseKey = generateLicenseKey(tier, customerId || null);

    res.status(200).json({
      success: true,
      licenseKey,
      tier,
      generatedAt: new Date().toISOString(),
      note: "This key is cryptographically signed and can be redeemed anywhere across OmniTool Hub."
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Key generation error: " + err.message });
  }
}
