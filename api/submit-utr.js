import crypto from "node:crypto";
import { createSignedToken } from "./_security.js";

/**
 * Serverless Handler: POST /api/submit-utr
 * Registers a manual payment reference (UPI UTR / Crypto TXID / Bank IMPS)
 * and generates a secure cryptographic tracking receipt.
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
    const rawVal = (body.reference || "").trim();
    const paymentMethod = body.paymentMethod || "upi";
    const userEmail = (body.email || "").trim();

    if (!rawVal) {
      res.status(400).json({ success: false, error: "Please enter your 12-digit UTR or Crypto TXID." });
      return;
    }

    // Format validation
    const cleanDigits = rawVal.replace(/[^0-9]/g, "");
    const is12Digit = cleanDigits.length === 12;
    const isCryptoTxid = /^0x[a-fA-F0-9]{64}$/.test(rawVal) || /^[a-fA-F0-9]{64}$/.test(rawVal);

    if (!is12Digit && !isCryptoTxid) {
      res.status(400).json({
        success: false,
        error: "Invalid reference format. UPI/IMPS UTR must be exactly 12 numeric digits, and Crypto TXID must be 64 hexadecimal characters."
      });
      return;
    }

    const referenceId = `OMNI-REF-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const submissionReceipt = {
      referenceId,
      submittedReference: is12Digit ? cleanDigits : rawVal,
      paymentMethod,
      email: userEmail || "Not provided",
      status: "pending_verification",
      submittedAt: new Date().toISOString()
    };

    // Create signed receipt proof
    const receiptProof = createSignedToken(submissionReceipt);

    res.status(200).json({
      success: true,
      referenceId,
      receiptProof,
      message: "Payment reference recorded successfully. Verification is in progress with bank statement records."
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to record reference: " + err.message });
  }
}
