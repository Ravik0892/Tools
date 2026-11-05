// Standalone proxy for Color Palette & Contrast Checker -> color-lab
export default {
  id: "color-palette-legacy",
  name: "Color Palette & Contrast Checker",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading Color Palette & Contrast Checker...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "palette";
      appInstance.activeSubtool = "color-palette";
      appInstance.navigateToTool("color-lab", false);
    } else {
      window.location.href = "/tool/color-palette";
    }
  }
};
