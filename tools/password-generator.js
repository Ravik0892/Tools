// Standalone proxy for Strong Password Generator -> security-suite
export default {
  id: "password-generator-legacy",
  name: "Strong Password Generator",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading Strong Password Generator...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "pass";
      appInstance.activeSubtool = "password-generator";
      appInstance.navigateToTool("security-suite", false);
    } else {
      window.location.href = "/tool/password-generator";
    }
  }
};
