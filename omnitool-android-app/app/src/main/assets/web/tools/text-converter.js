// Standalone proxy for Text Case Converter -> text-encoder-suite
export default {
  id: "text-converter-legacy",
  name: "Text Case Converter",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading Text Case Converter...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "case";
      appInstance.activeSubtool = "text-converter";
      appInstance.navigateToTool("text-encoder-suite", false);
    } else {
      window.location.href = "/tool/text-converter";
    }
  }
};
