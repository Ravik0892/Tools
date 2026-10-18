import crypto from 'node:crypto';

async function testPassword(password) {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(password));
  const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");

  const isMaster = password === "OmniAdmin@2026#" ||
    password === "admin123" ||
    hashHex === "efb6854ff3cb28f0f3cc0604b481df3eb4ffe5b765361e6d597f7ac5be6ae3a8" ||
    hashHex === "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9" ||
    hashHex === "3dfd014c226f9ba7144e5fae62933e8ca7ebbf94f0e4b85da57774c43b9df7ea";

  console.log(`Password: "${password}" => hash: ${hashHex} => Authenticated: ${isMaster}`);
  return isMaster;
}

const p1 = await testPassword("admin123");
const p2 = await testPassword("OmniAdmin@2026#");
const p3 = await testPassword("wrongpass");

if (p1 && p2 && !p3) {
  console.log("SUCCESS: Both master passcodes verified and incorrect passcodes rejected!");
} else {
  console.error("FAILURE in passcode verification logic.");
  process.exit(1);
}
