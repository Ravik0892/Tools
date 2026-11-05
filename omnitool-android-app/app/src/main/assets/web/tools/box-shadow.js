// Standalone module proxy for CSS Box Shadow Generator -> CSS Studio Suite
export default {
  id: "box-shadow-legacy",
  name: "CSS Box Shadow Generator",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading CSS Box Shadow Generator...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "shadow";
      appInstance.activeSubtool = "box-shadow";
      appInstance.navigateToTool("css-studio", false);
    } else {
      window.location.href = "/tool/box-shadow";
    }
  }
};
