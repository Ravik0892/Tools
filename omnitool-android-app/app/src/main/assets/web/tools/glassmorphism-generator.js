// Standalone module proxy for Glassmorphism CSS Generator -> CSS Studio Suite
export default {
  id: "glassmorphism-generator-legacy",
  name: "Glassmorphism CSS Generator",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading Glassmorphism CSS Generator...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "glass";
      appInstance.activeSubtool = "glassmorphism-generator";
      appInstance.navigateToTool("css-studio", false);
    } else {
      window.location.href = "/tool/glassmorphism-generator";
    }
  }
};
