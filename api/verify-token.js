import { verifySignedToken } from "./_security.js";

/**
 * Serverless Handler: POST /api/verify-token
 * Validates cryptographically signed access tokens sent by the client.
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
    res.status(405).json({ valid: false, error: "Method not allowed. Use POST." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const token = body.token;

    if (!token) {
      res.status(400).json({ valid: false, error: "No token provided." });
      return;
    }

    const result = verifySignedToken(token);
    if (!result.valid) {
      res.status(401).json({ valid: false, error: result.error });
      return;
    }

    res.status(200).json({
      valid: true,
      tier: result.payload.tier,
      expiresAt: result.payload.expiresAt,
      iat: result.payload.iat
    });
  } catch (err) {
    res.status(500).json({ valid: false, error: "Token verification error: " + err.message });
  }
}
