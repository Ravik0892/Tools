import crypto from "node:crypto";

/**
 * OmniTool Hub - Core Cryptographic & Payment Security Engine
 * Implements HMAC-SHA256 digital signatures, timing-safe equality checks,
 * license key verification, and Razorpay signature validation.
 */

// Master cryptographic secret - override with process.env.LICENSE_SECRET_KEY in production
const MASTER_SECRET = process.env.LICENSE_SECRET_KEY || "omnitool_master_crypto_secret_f839b2e0417a8c3d9152b";

// Razorpay credentials from environment
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_OmniToolDemoKey";
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "OmniToolRazorpaySecretDemoKey";

// Gumroad product permalink from environment
export const GUMROAD_PRODUCT_PERMALINK = process.env.GUMROAD_PRODUCT_PERMALINK || "omnitool-pro";

// Admin password hash (SHA-256)
// Default is SHA-256 of "OmniAdmin@2026#"
export const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "efb6854ff3cb28f0f3cc0604b481df3eb4ffe5b765361e6d597f7ac5be6ae3a8";

/**
 * Timing-safe string comparison to prevent side-channel timing attacks
 */
export function timingSafeCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    // Constant time dummy comparison
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Creates a cryptographically signed License Access Token
 */
export function createSignedToken(payload) {
  const tokenPayload = {
    ...payload,
    iat: Date.now(),
    nonce: crypto.randomBytes(8).toString("hex")
  };
  const encodedPayload = Buffer.from(JSON.stringify(tokenPayload), "utf8").toString("base64url");
  const signature = crypto.createHmac("sha256", MASTER_SECRET).update(encodedPayload).digest("hex");
  return `${encodedPayload}.${signature}`;
}

/**
 * Validates a cryptographically signed License Access Token
 */
export function verifySignedToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return { valid: false, error: "Invalid token format." };
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return { valid: false, error: "Malformed token." };
  }

  const expectedSignature = crypto.createHmac("sha256", MASTER_SECRET).update(encodedPayload).digest("hex");
  if (!timingSafeCompare(signature, expectedSignature)) {
    return { valid: false, error: "Cryptographic signature mismatch. Token is forged or tampered." };
  }

  try {
    const jsonStr = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const payload = JSON.parse(jsonStr);

    // Check expiration if set
    if (payload.expiresAt && Date.now() > payload.expiresAt) {
      return { valid: false, error: "License token has expired." };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, error: "Failed to decode payload." };
  }
}

/**
 * Generates an authentic offline cryptographic license key (e.g. OMNI-PRO-8A9F1B2C-D4E5)
 */
export function generateLicenseKey(tier = "lifetime", customerId = null) {
  const tierCode = tier === "premium" ? "MON" : "PRO";
  const id = customerId || crypto.randomBytes(4).toString("hex").toUpperCase();
  const rawData = `OMNI-${tierCode}-${id}`;
  const signature = crypto.createHmac("sha256", MASTER_SECRET)
    .update(rawData)
    .digest("hex")
    .substring(0, 8)
    .toUpperCase();
  return `${rawData}-${signature}`;
}

/**
 * Verifies an authentic offline cryptographic license key
 */
export function verifyLicenseKey(key) {
  if (!key || typeof key !== "string") return { valid: false, error: "Empty license key." };
  const clean = key.trim().toUpperCase();

  // Pattern: OMNI-(PRO|MON)-XXXXXXXX-XXXXXXXX
  const match = clean.match(/^OMNI-(PRO|MON)-([A-Z0-9]{8})-([A-Z0-9]{8})$/);
  if (!match) {
    return { valid: false, error: "Invalid license key structure." };
  }

  const [, tierCode, id, signature] = match;
  const rawData = `OMNI-${tierCode}-${id}`;
  const expectedSignature = crypto.createHmac("sha256", MASTER_SECRET)
    .update(rawData)
    .digest("hex")
    .substring(0, 8)
    .toUpperCase();

  if (!timingSafeCompare(signature, expectedSignature)) {
    return { valid: false, error: "Invalid cryptographic license signature." };
  }

  const tier = tierCode === "MON" ? "premium" : "lifetime";
  return {
    valid: true,
    tier,
    keyId: clean,
    expiresAt: tier === "premium" ? Date.now() + (30 * 24 * 60 * 60 * 1000) : null
  };
}

/**
 * Verifies Razorpay payment signature
 * signature = HMAC_SHA256(order_id + "|" + payment_id, secret)
 */
export function verifyRazorpaySignature(orderId, paymentId, signature) {
  if (!orderId || !paymentId || !signature) return false;
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(body).digest("hex");
  return timingSafeCompare(signature, expected);
}

/**
 * Verifies a Gumroad License Key against the official Gumroad API
 */
export async function verifyGumroadLicense(licenseKey, permalink = GUMROAD_PRODUCT_PERMALINK) {
  if (!licenseKey || typeof licenseKey !== "string") {
    return { valid: false, error: "License key required." };
  }

  const cleanKey = licenseKey.trim();

  // Ensure format is plausible UUID/alphanumeric (Gumroad keys are typically 32-36 chars)
  if (cleanKey.length < 16) {
    return { valid: false, error: "Invalid license key length." };
  }

  try {
    const params = new URLSearchParams();
    params.append("product_permalink", permalink);
    params.append("license_key", cleanKey);
    params.append("increment_uses_count", "false");

    const resp = await fetch("https://api.gumroad.com/v2/licenses/verify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });

    if (!resp.ok) {
      return { valid: false, error: "Gumroad verification server responded with error." };
    }

    const data = await resp.json();
    if (!data.success) {
      return { valid: false, error: data.message || "Invalid Gumroad license key." };
    }

    const purchase = data.purchase || {};
    if (purchase.refunded || purchase.chargebacked) {
      return { valid: false, error: "This license has been refunded or chargebacked." };
    }

    return {
      valid: true,
      tier: "lifetime",
      email: purchase.email,
      orderNumber: purchase.order_number,
      purchasedAt: purchase.created_at
    };
  } catch (err) {
    return { valid: false, error: "Failed to connect to Gumroad API: " + err.message };
  }
}
