// Standalone proxy for JSON to CSV & YAML Converter -> formatter-suite
export default {
  id: "json-yaml-csv-legacy",
  name: "JSON to CSV & YAML Converter",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading JSON to CSV & YAML Converter...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "csv";
      appInstance.activeSubtool = "json-yaml-csv";
      appInstance.navigateToTool("formatter-suite", false);
    } else {
      window.location.href = "/tool/json-yaml-csv";
    }
  }
};
