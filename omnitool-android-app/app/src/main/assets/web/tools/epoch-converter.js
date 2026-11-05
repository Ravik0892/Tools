// Standalone proxy for Unix Epoch Timestamp Converter -> datetime-suite
export default {
  id: "epoch-converter-legacy",
  name: "Unix Epoch Timestamp Converter",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading Unix Epoch Timestamp Converter...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "epoch";
      appInstance.activeSubtool = "epoch-converter";
      appInstance.navigateToTool("datetime-suite", false);
    } else {
      window.location.href = "/tool/epoch-converter";
    }
  }
};
