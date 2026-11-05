// Standalone proxy for Base64 Encoder & Decoder -> text-encoder-suite
export default {
  id: "base64-legacy",
  name: "Base64 Encoder & Decoder",
  renderUI() {
    return `<div style="display: flex; align-items: center; justify-content: center; padding: 60px; color: var(--text-muted); font-weight: 600;">
      <span class="clock-widget" style="border: none; background: none;">
        Loading Base64 Encoder & Decoder...
      </span>
    </div>`;
  },
  init(container, appInstance) {
    if (appInstance && typeof appInstance.navigateToTool === "function") {
      appInstance.activeSubtab = "base64";
      appInstance.activeSubtool = "base64";
      appInstance.navigateToTool("text-encoder-suite", false);
    } else {
      window.location.href = "/tool/base64";
    }
  }
};
