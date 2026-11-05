// Standalone proxy for Date Difference & Duration Calculator -> datetime-suite
export default {
  id: "date-calculator-legacy",
  name: "Date Difference & Duration Calculator",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading Date Difference & Duration Calculator...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "date";
      appInstance.activeSubtool = "date-calculator";
      appInstance.navigateToTool("datetime-suite", false);
    } else {
      window.location.href = "/tool/date-calculator";
    }
  }
};
