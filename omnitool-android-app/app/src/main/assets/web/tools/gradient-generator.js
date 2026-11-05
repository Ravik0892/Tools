// Standalone module proxy for CSS Gradient Generator -> CSS Studio Suite
export default {
  id: "gradient-generator-legacy",
  name: "CSS Gradient Generator",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading CSS Gradient Generator...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "gradient";
      appInstance.activeSubtool = "gradient-generator";
      appInstance.navigateToTool("css-studio", false);
    } else {
      window.location.href = "/tool/gradient-generator";
    }
  }
};
