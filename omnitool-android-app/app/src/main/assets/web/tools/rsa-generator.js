// Standalone proxy for RSA Key Pair Generator -> crypto-suite
export default {
  id: "rsa-generator-legacy",
  name: "RSA Key Pair Generator",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading RSA Key Pair Generator...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "rsa";
      appInstance.activeSubtool = "rsa-generator";
      appInstance.navigateToTool("crypto-suite", false);
    } else {
      window.location.href = "/tool/rsa-generator";
    }
  }
};
