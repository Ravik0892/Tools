// Standalone proxy for Color Shades & Tints Generator -> color-lab
export default {
  id: "color-shades-legacy",
  name: "Color Shades & Tints Generator",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading Color Shades & Tints Generator...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "shades";
      appInstance.activeSubtool = "color-shades";
      appInstance.navigateToTool("color-lab", false);
    } else {
      window.location.href = "/tool/color-shades";
    }
  }
};
