// Standalone proxy for SQL Beautifier & Formatter -> formatter-suite
export default {
  id: "sql-beautifier-legacy",
  name: "SQL Beautifier & Formatter",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading SQL Beautifier & Formatter...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "sql";
      appInstance.activeSubtool = "sql-beautifier";
      appInstance.navigateToTool("formatter-suite", false);
    } else {
      window.location.href = "/tool/sql-beautifier";
    }
  }
};
