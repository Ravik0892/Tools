export default {
  id: "sql-beautifier",
  name: "SQL Formatter & Beautifier",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Input SQL Query</h3>
            <div class="panel-actions">
              <button class="tool-btn" id="sql-clear">Clear</button>
            </div>
          </div>
          <textarea class="input-textarea" id="sql-input" placeholder="SELECT * FROM users JOIN orders ON users.id = orders.user_id WHERE users.active = 1 ORDER BY orders.created_at DESC;" aria-label="Input SQL"></textarea>
          <div class="form-row">
            <button class="tool-btn primary" id="sql-format-btn">Format SQL</button>
          </div>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Formatted SQL</h3>
            <div class="panel-actions">
              <button class="tool-btn accent-emerald" id="sql-copy-btn"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy</button>
            </div>
          </div>
          <textarea class="input-textarea" id="sql-output" readonly placeholder="Formatted SQL query will appear here..." aria-label="Formatted SQL"></textarea>
        </div>

        <!-- Quick Guide -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Paste SQL</strong>: Input raw, messy, or single-line SQL query code.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Format</strong>: Click <strong>Format SQL</strong> to split lines at clauses and capitalize keywords.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Local Processing</strong>: The SQL parser executes fully in-browser; your queries are never sent to external servers.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const input = container.querySelector("#sql-input");
    const output = container.querySelector("#sql-output");

    container.querySelector("#sql-format-btn")?.addEventListener("click", () => {
      const sql = input.value.trim();
      if (!sql) return;
      try {
        // SQL keywords list for formatting
        const keywords = [
          "SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
          "OUTER JOIN", "ON", "AND", "OR", "GROUP BY", "ORDER BY", "HAVING", "LIMIT",
          "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "UNION", "AS", "IN"
        ];

        let formatted = sql;

        // Capitalize matching keywords case-insensitively
        keywords.forEach(kw => {
          const regex = new RegExp("\\b" + kw + "\\b", "gi");
          formatted = formatted.replace(regex, kw);
        });

        // Insert new lines before major keywords
        const newlineKeywords = [
          "SELECT", "FROM", "WHERE", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
          "OUTER JOIN", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM"
        ];

        newlineKeywords.forEach(kw => {
          const regex = new RegExp("\\b" + kw + "\\b", "g");
          formatted = formatted.replace(regex, "\n" + kw);
        });

        // Clean up double newlines and spaces
        formatted = formatted.split("\n")
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .join("\n");

        output.value = formatted;
        appInstance.showToast("SQL Formatted!", "success");
      } catch (e) {
        appInstance.showToast("Formatting failed: " + e.message, "error");
      }
    });

    container.querySelector("#sql-clear")?.addEventListener("click", () => {
      input.value = "";
      output.value = "";
    });

    container.querySelector("#sql-copy-btn")?.addEventListener("click", () => {
      appInstance.copyText(output.value);
    });
  }
};
