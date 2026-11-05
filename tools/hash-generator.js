// Standalone proxy for Cryptographic Hash Generator -> crypto-suite
export default {
  id: "hash-generator-legacy",
  name: "Cryptographic Hash Generator",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading Cryptographic Hash Generator...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "hash";
      appInstance.activeSubtool = "hash-generator";
      appInstance.navigateToTool("crypto-suite", false);
    } else {
      window.location.href = "/tool/hash-generator";
    }
  }
};
