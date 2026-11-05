// Standalone proxy for UUID v4 / GUID Generator -> security-suite
export default {
  id: "uuid-generator-legacy",
  name: "UUID v4 / GUID Generator",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading UUID v4 / GUID Generator...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "uuid";
      appInstance.activeSubtool = "uuid-generator";
      appInstance.navigateToTool("security-suite", false);
    } else {
      window.location.href = "/tool/uuid-generator";
    }
  }
};
