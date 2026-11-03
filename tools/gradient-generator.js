// Legacy standalone module - consolidated into a unified suite.
export default {
  id: "gradient-generator-legacy",
  name: "Legacy Gradient Creator",
  renderUI() {
    return `<div style="padding: 40px; text-align: center; color: var(--text-muted); font-weight: bold;">
      This standalone tool has been consolidated into the CSS Studio.
    </div>`;
  },
  init(container, appInstance) {
    console.warn("Legacy standalone module accessed. Redirecting to dashboard...");
    appInstance.backToDashboard();
  }
};
