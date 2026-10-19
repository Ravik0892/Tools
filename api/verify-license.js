import {
  verifyLicenseKey,
  verifyGumroadLicense,
  createSignedToken
} from "./_security.js";

/**
 * Serverless Handler: POST /api/verify-license
 * Verifies submitted license codes against cryptographic signatures and official APIs.
 */
export default async function handler(req, res) {
  // CORS Headers
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
    const rawCode = (body.code || "").trim();

    if (!rawCode) {
      res.status(400).json({ success: false, error: "Please enter an activation code or license key." });
      return;
    }

    // 1. Check if it's an offline cryptographically signed OMNI license key
    if (rawCode.toUpperCase().startsWith("OMNI-")) {
      const offlineResult = verifyLicenseKey(rawCode);
      if (offlineResult.valid) {
        const token = createSignedToken({
          tier: offlineResult.tier,
          keyId: offlineResult.keyId,
          source: "cryptographic_key",
          expiresAt: offlineResult.expiresAt
        });
        res.status(200).json({
          success: true,
          tier: offlineResult.tier,
          token,
          message: `🎉 Authentic ${offlineResult.tier === "premium" ? "Pro Monthly" : "Lifetime PRO"} License verified!`
        });
        return;
      } else {
        res.status(401).json({
          success: false,
          error: "Invalid cryptographic license key signature. Verification failed."
        });
        return;
      }
    }

    // 2. Check if it's a Gumroad License Key (UUID format or 32+ char)
    const isGumroadFormat = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(rawCode) ||
                            /^[A-Za-z0-9\-_]{20,}$/.test(rawCode);

    if (isGumroadFormat) {
      const gumroadResult = await verifyGumroadLicense(rawCode);
      if (gumroadResult.valid) {
        const token = createSignedToken({
          tier: "lifetime",
          keyId: rawCode,
          source: "gumroad",
          email: gumroadResult.email
        });
        res.status(200).json({
          success: true,
          tier: "lifetime",
          token,
          message: "🎉 Gumroad license verified! Lifetime PRO unlocked."
        });
        return;
      } else {
        res.status(401).json({
          success: false,
          error: gumroadResult.error || "Gumroad license verification failed."
        });
        return;
      }
    }

    // Reject all arbitrary numbers and bypass strings
    res.status(401).json({
      success: false,
      error: "Unrecognized or invalid license key format. Please enter a valid signed license key or Gumroad key."
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal verification error: " + err.message });
  }
}
