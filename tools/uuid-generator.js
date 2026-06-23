// Legacy standalone module - consolidated into a unified suite.
export default {
  id: "uuid-generator-legacy",
  name: "Legacy UUID Generator",
  renderUI() {
    return `<div style="padding: 40px; text-align: center; color: var(--text-muted); font-weight: bold;">
      This standalone tool has been consolidated into the Security & Passwords Suite.
    </div>`;
  },
  init(container, appInstance) {
    console.warn("Legacy standalone module accessed. Redirecting to dashboard...");
    appInstance.navigateToTool("dashboard");
  }
};
