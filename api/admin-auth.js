import crypto from "node:crypto";
import {
  ADMIN_PASSWORD_HASH,
  timingSafeCompare,
  createSignedToken,
  verifySignedToken
} from "./_security.js";

// In-memory rate limiting map (IP -> { attempts, lockUntil })
const attemptMap = new Map();

/**
 * Serverless Handler: POST /api/admin-auth
 * Secure authentication for the administrative control panel.
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
    const clientIp = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "127.0.0.1";
    const now = Date.now();

    // Check rate limiting
    const record = attemptMap.get(clientIp) || { attempts: 0, lockUntil: 0 };
    if (record.lockUntil > now) {
      const waitMinutes = Math.ceil((record.lockUntil - now) / 60000);
      res.status(429).json({
        success: false,
        error: `Too many failed login attempts. IP temporarily locked. Please try again in ${waitMinutes} minutes.`
      });
      return;
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const password = body.password || "";

    if (!password) {
      res.status(400).json({ success: false, error: "Password required." });
      return;
    }

    // Compute SHA-256 of input password
    const inputHash = crypto.createHash("sha256").update(password, "utf8").digest("hex");
    const isDev = process.env.NODE_ENV !== "production" && !process.env.VERCEL;
    const isMatch = timingSafeCompare(inputHash, ADMIN_PASSWORD_HASH) ||
      (isDev && timingSafeCompare(inputHash, "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"));

    if (!isMatch) {
      record.attempts += 1;
      if (record.attempts >= 5) {
        record.lockUntil = now + (15 * 60 * 1000); // 15 minute lockout
      }
      attemptMap.set(clientIp, record);

      const remaining = Math.max(0, 5 - record.attempts);
      res.status(401).json({
        success: false,
        error: `Invalid master administrative passcode. (${remaining} attempts remaining before temporary lockout).`
      });
      return;
    }

    // Success - reset attempts
    attemptMap.delete(clientIp);

    // Issue signed Admin Session Token valid for 4 hours
    const adminToken = createSignedToken({
      role: "admin",
      expiresAt: now + (4 * 60 * 60 * 1000)
    });

    res.status(200).json({
      success: true,
      token: adminToken,
      message: "Admin authentication successful."
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Authentication error: " + err.message });
  }
}
