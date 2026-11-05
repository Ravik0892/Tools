// Standalone proxy for URL Percent-Encoder & Decoder -> text-encoder-suite
export default {
  id: "url-encoder-legacy",
  name: "URL Percent-Encoder & Decoder",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading URL Percent-Encoder & Decoder...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "url";
      appInstance.activeSubtool = "url-encoder";
      appInstance.navigateToTool("text-encoder-suite", false);
    } else {
      window.location.href = "/tool/url-encoder";
    }
  }
};
