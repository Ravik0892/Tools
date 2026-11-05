// Standalone proxy for JSON Formatter & Validator -> formatter-suite
export default {
  id: "json-formatter-legacy",
  name: "JSON Formatter & Validator",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading JSON Formatter & Validator...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "json";
      appInstance.activeSubtool = "json-formatter";
      appInstance.navigateToTool("formatter-suite", false);
    } else {
      window.location.href = "/tool/json-formatter";
    }
  }
};
