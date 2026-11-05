// Standalone proxy for AES-256 Encryption & Decryption -> crypto-suite
export default {
  id: "aes-crypto-legacy",
  name: "AES-256 Encryption & Decryption",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading AES-256 Encryption & Decryption...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "aes";
      appInstance.activeSubtool = "aes-crypto";
      appInstance.navigateToTool("crypto-suite", false);
    } else {
      window.location.href = "/tool/aes-crypto";
    }
  }
};
