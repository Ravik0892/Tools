// Private CSV/JSON Mock Data Generator Tool Module
export default {
  id: "mock-data-generator",
  name: "Private CSV/JSON Mock Data Generator",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Left Panel: Schema Designer -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Schema Configuration</h3>
            <div class="panel-actions">
              <button class="tool-btn secondary" id="mock-load-presets-btn">Presets</button>
            </div>
          </div>

          <!-- Presets Dropdown Menu -->
          <div id="mock-presets-container" class="hidden" style="margin-bottom: 15px; padding: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px;">
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Select a Preset Schema:</div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="tool-btn secondary text-xs" data-preset="users" style="padding: 4px 10px; font-size: 11px;">User Profiles</button>
              <button class="tool-btn secondary text-xs" data-preset="products" style="padding: 4px 10px; font-size: 11px;">Product Catalog</button>
              <button class="tool-btn secondary text-xs" data-preset="orders" style="padding: 4px 10px; font-size: 11px;">Order Transactions</button>
              <button class="tool-btn secondary text-xs" data-preset="tasks" style="padding: 4px 10px; font-size: 11px;">Task Board</button>
            </div>
          </div>

          <!-- Fields List Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 13px; font-weight: 500; color: var(--text-color);">Columns / Fields</span>
            <button class="tool-btn accent-cyan" id="mock-add-field-btn" style="height: 28px; font-size: 11.5px; padding: 0 10px; line-height: 1;">+ Add Column</button>
          </div>

          <!-- Schema Fields Dynamic Container -->
          <div id="mock-fields-container" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; max-height: 350px; overflow-y: auto; padding-right: 4px;">
            <!-- Fields injected dynamically -->
          </div>

          <hr style="border: 0; border-top: 1px solid rgba(255, 255, 255, 0.08); margin: 20px 0;">

          <!-- Export Settings -->
          <div class="panel-header" style="margin-top: 0; padding-top: 0; height: auto; margin-bottom: 12px;">
            <h3>Export Parameters</h3>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 15px;">
            <div class="form-group">
              <label for="mock-export-format" style="font-size: 12px; margin-bottom: 6px; display: block; color: var(--text-muted);">File Format</label>
              <select class="form-select" id="mock-export-format" style="width: 100%; height: 38px; font-size: 13px;">
                <option value="json" selected>JSON Array</option>
                <option value="csv">CSV (Excel Compatible)</option>
              </select>
            </div>

            <div class="form-group" id="json-root-group">
              <label for="mock-json-root" style="font-size: 12px; margin-bottom: 6px; display: block; color: var(--text-muted);">JSON Root Key (Optional)</label>
              <input type="text" class="form-input" id="mock-json-root" placeholder="None (Raw Array)" style="height: 38px; font-size: 13px;">
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label for="mock-row-count" style="font-size: 12px; color: var(--text-muted);">Rows to Generate</label>
              <input type="number" id="mock-row-count-val" min="1" max="50000" value="100" style="width: 75px; text-align: center; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; font-size: 12px; color: #fff; height: 24px;">
            </div>
            <input type="range" class="form-range" id="mock-row-count" min="10" max="50000" step="10" value="100" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-muted); margin-top: 4px;">
              <span>10 rows</span>
              <span>10k</span>
              <span>25k</span>
              <span>50,000 rows</span>
            </div>
          </div>
        </div>

        <!-- Right Panel: Dynamic Sandbox Preview -->
        <div class="tool-panel" style="display: flex; flex-direction: column;">
          <div class="panel-header">
            <h3>Sandbox Live Preview (5 Sample Rows)</h3>
            <div class="panel-actions">
              <button class="tool-btn secondary" id="mock-refresh-preview-btn" title="Re-generate Preview Samples">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 13px; height: 13px;"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              </button>
            </div>
          </div>

          <!-- Preview Grid Container -->
          <div style="flex: 1; overflow: auto; background: rgba(0,0,0,0.18); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; margin-bottom: 20px; min-height: 250px;">
            <table id="mock-preview-table" style="width: 100%; border-collapse: collapse; font-size: 12.5px; text-align: left; table-layout: auto;">
              <!-- Dynamic Table Head and Body -->
            </table>
            <div id="mock-preview-empty" class="hidden" style="text-align: center; color: var(--text-muted); padding: 40px 10px;">
              Add fields to configure your schema and preview generated values.
            </div>
          </div>

          <!-- Export Actions -->
          <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted);">
              <span>Rows Count: <strong id="mock-export-rows-display" style="color: var(--accent-cyan);">100</strong></span>
              <span>Estimated File Size: <strong id="mock-export-size-display" style="color:#fff;">0 KB</strong></span>
            </div>
            <button class="tool-btn accent-emerald" id="mock-generate-btn" style="width: 100%; height: 44px; font-weight: 600; font-size: 14.5px; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 16px; height: 16px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              Generate & Download Dataset
            </button>
          </div>
        </div>
      </div>

      <!-- Asynchronous Progress Modal -->
      <div id="mock-progress-overlay" class="hidden" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10, 10, 12, 0.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 9999;">
        <div style="background: rgba(20, 20, 25, 0.95); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 16px; padding: 30px; width: 90%; max-width: 400px; box-shadow: 0 15px 40px rgba(0,0,0,0.6); text-align: center;">
          <h4 style="margin: 0 0 10px 0; color: #fff; font-size: 18px;">Generating Dataset</h4>
          <p id="mock-progress-text" style="margin: 0 0 20px 0; font-size: 13px; color: var(--text-muted);">Preparing rows...</p>
          
          <div style="height: 8px; background: rgba(255, 255, 255, 0.06); border-radius: 4px; overflow: hidden; margin-bottom: 25px;">
            <div id="mock-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, var(--accent-cyan), #9d4edd); transition: width 0.1s; border-radius: 4px;"></div>
          </div>
          
          <button class="tool-btn" id="mock-cancel-btn" style="color: var(--accent-rose); border-color: rgba(244, 63, 94, 0.3); width: 120px; font-size: 13px; height: 36px; padding: 0;">Cancel</button>
        </div>
      </div>
    `;
  },

  init(container, appInstance) {
    // UI elements mapping
    const addFieldBtn = container.querySelector("#mock-add-field-btn");
    const fieldsContainer = container.querySelector("#mock-fields-container");
    const exportFormat = container.querySelector("#mock-export-format");
    const jsonRootInput = container.querySelector("#mock-json-root");
    const jsonRootGroup = container.querySelector("#json-root-group");
    const rowRangeInput = container.querySelector("#mock-row-count");
    const rowNumberInput = container.querySelector("#mock-row-count-val");
    const refreshPreviewBtn = container.querySelector("#mock-refresh-preview-btn");
    const previewTable = container.querySelector("#mock-preview-table");
    const previewEmpty = container.querySelector("#mock-preview-empty");
    const generateBtn = container.querySelector("#mock-generate-btn");
    
    // Progress Overlay
    const progressOverlay = container.querySelector("#mock-progress-overlay");
    const progressText = container.querySelector("#mock-progress-text");
    const progressBar = container.querySelector("#mock-progress-bar");
    const cancelBtn = container.querySelector("#mock-cancel-btn");
    const rowsDisplay = container.querySelector("#mock-export-rows-display");
    const sizeDisplay = container.querySelector("#mock-export-size-display");

    // Presets
    const presetsToggle = container.querySelector("#mock-load-presets-btn");
    const presetsContainer = container.querySelector("#mock-presets-container");

    // Sample Local Data Sets for Procedural Mock Generator
    const firstNames = [
      "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth",
      "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen",
      "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra",
      "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
      "Kenneth", "Dorothy", "Kevin", "Carol", "Brian", "Amanda", "George", "Melissa", "Timothy", "Deborah",
      "Ronald", "Stephanie", "Edward", "Rebecca", "Jason", "Sharon", "Jeffrey", "Laura", "Gary", "Cynthia",
      "Jacob", "Kathleen", "Nicholas", "Amy", "Ray", "Shirley", "Tyler", "Angela", "Jose", "Helen",
      "Alexander", "Anna", "Dmitry", "Maria", "Yuki", "Kenji", "Juan", "Sofia", "Carlos", "Ana",
      "Jean", "Marie", "Hans", "Ursula", "Ahmed", "Fatima", "Luis", "Elena", "Ravi", "Priya"
    ];

    const lastNames = [
      "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
      "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
      "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
      "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
      "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
      "Gomez", "Phillips", "Evans", "Diaz", "Reyes", "Cruz", "Wang", "Li", "Zhang", "Chen",
      "Sato", "Suzuki", "Takahashi", "Tanaka", "Ito", "Yamamoto", "Nakamura", "Kobayashi", "Saito", "Sharma"
    ];

    const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "proton.me", "company.com", "corporate.org", "enterprise.net", "edu.in", "ac.uk"];
    const productNames = ["Laptop Pro", "Wireless Earbuds", "Smart Watch v3", "Mechanical Keyboard", "USB-C Hub", "Bluetooth Speaker", "HD Monitor 27", "Ergonomic Mouse", "Gaming Headset", "SSD External 1TB", "Webcam 4K", "Desk Pad XL", "Phone Stand", "Cable Organizer", "LED Desk Lamp"];
    const productCategories = ["Electronics", "Accessories", "Office Supplies", "Gaming", "Computers", "Audio"];
    const taskTitles = ["Fix navigation styling bug", "Implement OAuth login integration", "Optimize DB indexing query", "Design product details mockups", "Write deployment pipeline YAML", "Draft legal privacy page", "Audit security packages", "Update packages dependency list"];
    const taskStatuses = ["To Do", "In Progress", "Code Review", "Done"];
    const taskPriorities = ["Low", "Medium", "High", "Critical"];

    // Schema Fields State
    let fields = [];
    let isGenerating = false;
    let cancelGeneration = false;

    // Default User Preset Configuration
    const presets = {
      users: [
        { name: "id", type: "incremental", rules: { start: 1, step: 1 } },
        { name: "uuid", type: "uuid", rules: {} },
        { name: "first_name", type: "firstname", rules: {} },
        { name: "last_name", type: "lastname", rules: {} },
        { name: "email", type: "email", rules: {} },
        { name: "phone", type: "phone", rules: {} },
        { name: "joined_date", type: "date", rules: { start: "2025-01-01", end: "2026-06-01" } },
        { name: "is_active", type: "boolean", rules: {} }
      ],
      products: [
        { name: "product_id", type: "incremental", rules: { start: 1001, step: 1 } },
        { name: "title", type: "custom_list", rules: { list: productNames.join(",") } },
        { name: "category", type: "custom_list", rules: { list: productCategories.join(",") } },
        { name: "price", type: "number", rules: { min: 10, max: 1500, precision: 2 } },
        { name: "stock", type: "number", rules: { min: 0, max: 250, precision: 0 } },
        { name: "in_stock", type: "boolean", rules: {} }
      ],
      orders: [
        { name: "order_id", type: "uuid", rules: {} },
        { name: "customer_name", type: "fullname", rules: {} },
        { name: "email", type: "email", rules: {} },
        { name: "amount", type: "number", rules: { min: 5, max: 800, precision: 2 } },
        { name: "transaction_date", type: "date", rules: { start: "2026-01-01", end: "2026-06-20" } },
        { name: "status", type: "custom_list", rules: { list: "Pending,Paid,Shipped,Cancelled" } }
      ],
      tasks: [
        { name: "task_id", type: "incremental", rules: { start: 100, step: 1 } },
        { name: "task_title", type: "custom_list", rules: { list: taskTitles.join(",") } },
        { name: "priority", type: "custom_list", rules: { list: taskPriorities.join(",") } },
        { name: "status", type: "custom_list", rules: { list: taskStatuses.join(",") } },
        { name: "created_at", type: "date", rules: { start: "2026-05-01", end: "2026-06-20" } }
      ]
    };

    // Initialize with Users Preset
    function applyPreset(presetKey) {
      if (presets[presetKey]) {
        // Deep copy the preset definitions
        fields = presets[presetKey].map(f => ({
          id: Math.random().toString(36).substring(2, 9),
          name: f.name,
          type: f.type,
          rules: { ...f.rules }
        }));
        renderFieldsList();
        updatePreview();
        updateSizeDisplay();
      }
    }

    // Toggle Presets Tray
    presetsToggle.addEventListener("click", () => {
      presetsContainer.classList.toggle("hidden");
    });

    presetsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-preset]");
      if (btn) {
        applyPreset(btn.dataset.preset);
        presetsContainer.classList.add("hidden");
        appInstance.showToast(`Applied preset schema: ${btn.innerText}`, "success");
      }
    });

    // Handle Export Format layout changes
    exportFormat.addEventListener("change", () => {
      if (exportFormat.value === "json") {
        jsonRootGroup.style.display = "block";
      } else {
        jsonRootGroup.style.display = "none";
      }
      updateSizeDisplay();
    });

    jsonRootInput.addEventListener("input", updateSizeDisplay);

    // Sync Slider & Numeric Inputs for Rows Count
    rowRangeInput.addEventListener("input", () => {
      rowNumberInput.value = rowRangeInput.value;
      rowsDisplay.innerText = Number(rowRangeInput.value).toLocaleString();
      updateSizeDisplay();
    });

    rowNumberInput.addEventListener("input", () => {
      let val = parseInt(rowNumberInput.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 50000) val = 50000;
      rowRangeInput.value = val;
      rowsDisplay.innerText = val.toLocaleString();
      updateSizeDisplay();
    });

    rowNumberInput.addEventListener("blur", () => {
      rowNumberInput.value = rowRangeInput.value;
    });

    // Helper: Procedural Data generator mapping
    function generateValue(type, index, rules) {
      const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
      
      switch (type) {
        case "incremental": {
          const start = parseInt(rules.start, 10) || 1;
          const step = parseInt(rules.step, 10) || 1;
          return start + (index * step);
        }
        case "uuid": {
          // Cryptographically safe or random UUID layout
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        }
        case "firstname":
          return pickRandom(firstNames);
        case "lastname":
          return pickRandom(lastNames);
        case "fullname":
          return `${pickRandom(firstNames)} ${pickRandom(lastNames)}`;
        case "email": {
          const fname = pickRandom(firstNames).toLowerCase().replace(/[^a-z]/g, '');
          const lname = pickRandom(lastNames).toLowerCase().replace(/[^a-z]/g, '');
          const suffix = Math.floor(Math.random() * 89 + 10);
          const domain = pickRandom(emailDomains);
          return `${fname}.${lname}${suffix}@${domain}`;
        }
        case "phone": {
          const area = Math.floor(Math.random() * 800 + 200);
          const mid = Math.floor(Math.random() * 900 + 100);
          const last = Math.floor(Math.random() * 9000 + 1000);
          return `+1 (${area}) ${mid}-${last}`;
        }
        case "date": {
          const startStr = rules.start || "2025-01-01";
          const endStr = rules.end || "2026-12-31";
          const startTime = new Date(startStr).getTime() || Date.now() - 31536000000;
          const endTime = new Date(endStr).getTime() || Date.now();
          const targetTime = startTime + Math.random() * (endTime - startTime);
          return new Date(targetTime).toISOString().split('T')[0];
        }
        case "number": {
          const min = parseFloat(rules.min) !== undefined && !isNaN(parseFloat(rules.min)) ? parseFloat(rules.min) : 0;
          const max = parseFloat(rules.max) !== undefined && !isNaN(parseFloat(rules.max)) ? parseFloat(rules.max) : 100;
          const precision = parseInt(rules.precision, 10) !== undefined && !isNaN(parseInt(rules.precision, 10)) ? parseInt(rules.precision, 10) : 0;
          const randomVal = min + Math.random() * (max - min);
          return parseFloat(randomVal.toFixed(precision));
        }
        case "boolean":
          return Math.random() > 0.5;
        case "custom_list": {
          const listStr = rules.list || "A,B,C";
          const list = listStr.split(",").map(item => item.trim()).filter(Boolean);
          if (list.length === 0) return "";
          return pickRandom(list);
        }
        default:
          return "";
      }
    };

    // Render columns setup list
    function renderFieldsList() {
      fieldsContainer.innerHTML = "";
      if (fields.length === 0) {
        fieldsContainer.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px 0; border: 1px dashed rgba(255,255,255,0.06); border-radius: 8px;">
            No fields defined. Click "+ Add Column" to start.
          </div>
        `;
        return;
      }

      fields.forEach((field, index) => {
        const div = document.createElement("div");
        div.className = "form-group field-row";
        div.style.background = "rgba(255,255,255,0.02)";
        div.style.border = "1px solid rgba(255,255,255,0.06)";
        div.style.borderRadius = "8px";
        div.style.padding = "10px";
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.gap = "8px";

        div.innerHTML = `
          <!-- Main Grid Row -->
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" class="form-input col-name-input" placeholder="Field Name" value="${escapeHtml(field.name)}" style="flex: 1.2; height: 32px; font-size: 12.5px; padding: 0 8px;" aria-label="Field Name">
            
            <select class="form-select col-type-select" style="flex: 1.5; height: 32px; font-size: 12.5px; padding: 0 4px;" aria-label="Field Type">
              <option value="incremental" ${field.type === 'incremental' ? 'selected' : ''}>ID (Incremental)</option>
              <option value="uuid" ${field.type === 'uuid' ? 'selected' : ''}>UUID v4</option>
              <option value="firstname" ${field.type === 'firstname' ? 'selected' : ''}>First Name</option>
              <option value="lastname" ${field.type === 'lastname' ? 'selected' : ''}>Last Name</option>
              <option value="fullname" ${field.type === 'fullname' ? 'selected' : ''}>Full Name</option>
              <option value="email" ${field.type === 'email' ? 'selected' : ''}>Email Address</option>
              <option value="phone" ${field.type === 'phone' ? 'selected' : ''}>Phone Number</option>
              <option value="date" ${field.type === 'date' ? 'selected' : ''}>Date Range</option>
              <option value="number" ${field.type === 'number' ? 'selected' : ''}>Number Range</option>
              <option value="boolean" ${field.type === 'boolean' ? 'selected' : ''}>Boolean</option>
              <option value="custom_list" ${field.type === 'custom_list' ? 'selected' : ''}>Custom List</option>
            </select>

            <!-- Sorting Buttons -->
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <button class="tool-btn sort-up-btn" style="height: 15px; width: 22px; padding: 0; font-size: 8px; display: flex; align-items: center; justify-content: center;" ${index === 0 ? 'disabled' : ''}>▲</button>
              <button class="tool-btn sort-down-btn" style="height: 15px; width: 22px; padding: 0; font-size: 8px; display: flex; align-items: center; justify-content: center;" ${index === fields.length - 1 ? 'disabled' : ''}>▼</button>
            </div>

            <!-- Remove Button -->
            <button class="tool-btn remove-btn" style="color: var(--accent-rose); border-color: rgba(244, 63, 94, 0.2); height: 32px; width: 32px; padding: 0; display: flex; align-items: center; justify-content: center;" title="Delete Column"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 13px; height: 13px;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
          </div>

          <!-- Parameters Option Sub-panel (Only visible for certain types) -->
          <div class="col-rules-panel" style="display: none; padding-top: 6px; border-top: 1px dashed rgba(255,255,255,0.05); font-size: 11.5px; gap: 8px; flex-wrap: wrap;">
            <!-- Content loaded based on select -->
          </div>
        `;

        const nameInput = div.querySelector(".col-name-input");
        const typeSelect = div.querySelector(".col-type-select");
        const rulesPanel = div.querySelector(".col-rules-panel");
        const removeBtn = div.querySelector(".remove-btn");
        const upBtn = div.querySelector(".sort-up-btn");
        const downBtn = div.querySelector(".sort-down-btn");

        // Set up field name updates
        nameInput.addEventListener("input", (e) => {
          field.name = e.target.value;
          updatePreview();
          updateSizeDisplay();
        });

        // Set up rule fields based on type
        const renderRulesSubPanel = () => {
          rulesPanel.innerHTML = "";
          rulesPanel.style.display = "none";

          if (field.type === "incremental") {
            rulesPanel.style.display = "flex";
            rulesPanel.innerHTML = `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span>Start:</span>
                <input type="number" class="form-input start-rule-val" value="${field.rules.start ?? 1}" style="width: 60px; height: 22px; font-size: 11px; padding: 0 4px;">
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span>Step:</span>
                <input type="number" class="form-input step-rule-val" value="${field.rules.step ?? 1}" style="width: 50px; height: 22px; font-size: 11px; padding: 0 4px;">
              </div>
            `;
            const startVal = rulesPanel.querySelector(".start-rule-val");
            const stepVal = rulesPanel.querySelector(".step-rule-val");
            
            startVal.addEventListener("input", () => {
              field.rules.start = parseInt(startVal.value, 10) || 1;
              updatePreview();
            });
            stepVal.addEventListener("input", () => {
              field.rules.step = parseInt(stepVal.value, 10) || 1;
              updatePreview();
            });

          } else if (field.type === "number") {
            rulesPanel.style.display = "flex";
            rulesPanel.innerHTML = `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span>Min:</span>
                <input type="number" class="form-input min-rule-val" value="${field.rules.min ?? 0}" style="width: 60px; height: 22px; font-size: 11px; padding: 0 4px;">
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span>Max:</span>
                <input type="number" class="form-input max-rule-val" value="${field.rules.max ?? 100}" style="width: 65px; height: 22px; font-size: 11px; padding: 0 4px;">
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span>Decimals:</span>
                <input type="number" min="0" max="6" class="form-input precision-rule-val" value="${field.rules.precision ?? 0}" style="width: 40px; height: 22px; font-size: 11px; padding: 0 4px;">
              </div>
            `;
            const minVal = rulesPanel.querySelector(".min-rule-val");
            const maxVal = rulesPanel.querySelector(".max-rule-val");
            const precisionVal = rulesPanel.querySelector(".precision-rule-val");
            
            minVal.addEventListener("input", () => {
              field.rules.min = parseFloat(minVal.value) ?? 0;
              updatePreview();
            });
            maxVal.addEventListener("input", () => {
              field.rules.max = parseFloat(maxVal.value) ?? 100;
              updatePreview();
            });
            precisionVal.addEventListener("input", () => {
              let p = parseInt(precisionVal.value, 10);
              if (isNaN(p) || p < 0) p = 0;
              if (p > 6) p = 6;
              field.rules.precision = p;
              updatePreview();
            });

          } else if (field.type === "date") {
            rulesPanel.style.display = "flex";
            rulesPanel.innerHTML = `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span>Start:</span>
                <input type="date" class="form-input date-start-val" value="${field.rules.start ?? '2025-01-01'}" style="width: 100px; height: 22px; font-size: 10px; padding: 0 2px;">
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span>End:</span>
                <input type="date" class="form-input date-end-val" value="${field.rules.end ?? '2026-12-31'}" style="width: 100px; height: 22px; font-size: 10px; padding: 0 2px;">
              </div>
            `;
            const startVal = rulesPanel.querySelector(".date-start-val");
            const endVal = rulesPanel.querySelector(".date-end-val");
            
            startVal.addEventListener("input", () => {
              field.rules.start = startVal.value || "2025-01-01";
              updatePreview();
            });
            endVal.addEventListener("input", () => {
              field.rules.end = endVal.value || "2026-12-31";
              updatePreview();
            });

          } else if (field.type === "custom_list") {
            rulesPanel.style.display = "flex";
            rulesPanel.innerHTML = `
              <div style="display: flex; align-items: center; gap: 4px; width: 100%;">
                <span>Values:</span>
                <input type="text" class="form-input list-rule-val" placeholder="Standard, Premium, VIP" value="${escapeHtml(field.rules.list ?? 'A,B,C')}" style="flex: 1; height: 22px; font-size: 11px; padding: 0 6px;">
              </div>
            `;
            const listVal = rulesPanel.querySelector(".list-rule-val");
            
            listVal.addEventListener("input", () => {
              field.rules.list = listVal.value;
              updatePreview();
            });
          }
        };

        typeSelect.addEventListener("change", () => {
          field.type = typeSelect.value;
          // Set default rules when type changes
          field.rules = {};
          if (field.type === "incremental") {
            field.rules = { start: 1, step: 1 };
          } else if (field.type === "number") {
            field.rules = { min: 0, max: 100, precision: 0 };
          } else if (field.type === "date") {
            field.rules = { start: "2025-01-01", end: "2026-12-31" };
          } else if (field.type === "custom_list") {
            field.rules = { list: "A,B,C" };
          }
          renderRulesSubPanel();
          updatePreview();
          updateSizeDisplay();
        });

        // Initialize up/down sort
        upBtn.addEventListener("click", () => {
          if (index > 0) {
            fields.splice(index - 1, 0, fields.splice(index, 1)[0]);
            renderFieldsList();
            updatePreview();
          }
        });

        downBtn.addEventListener("click", () => {
          if (index < fields.length - 1) {
            fields.splice(index + 1, 0, fields.splice(index, 1)[0]);
            renderFieldsList();
            updatePreview();
          }
        });

        // Remove column
        removeBtn.addEventListener("click", () => {
          fields.splice(index, 1);
          renderFieldsList();
          updatePreview();
          updateSizeDisplay();
        });

        renderRulesSubPanel();
        fieldsContainer.appendChild(div);
      });
    };

    // Helper: Update live preview samples
    function updatePreview() {
      previewTable.innerHTML = "";
      
      if (fields.length === 0) {
        previewTable.style.display = "none";
        previewEmpty.classList.remove("hidden");
        return;
      }

      previewTable.style.display = "table";
      previewEmpty.classList.add("hidden");

      // Build Headers
      const thead = document.createElement("thead");
      thead.style.background = "rgba(255,255,255,0.04)";
      thead.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
      
      const trHead = document.createElement("tr");
      fields.forEach(f => {
        const th = document.createElement("th");
        th.style.padding = "8px 12px";
        th.style.fontWeight = "600";
        th.style.color = "var(--text-muted)";
        th.innerText = f.name || "unnamed";
        trHead.appendChild(th);
      });
      thead.appendChild(trHead);
      previewTable.appendChild(thead);

      // Build Body (5 Sample Rows)
      const tbody = document.createElement("tbody");
      
      // Fix incremental field start point logic for preview
      const localSeedState = new Map();

      for (let r = 0; r < 5; r++) {
        const trRow = document.createElement("tr");
        trRow.style.borderBottom = "1px solid rgba(255,255,255,0.03)";
        if (r % 2 === 1) {
          trRow.style.background = "rgba(255,255,255,0.01)";
        }

        fields.forEach(f => {
          const td = document.createElement("td");
          td.style.padding = "8px 12px";
          td.style.whiteSpace = "nowrap";
          td.style.maxWidth = "200px";
          td.style.overflow = "hidden";
          td.style.textOverflow = "ellipsis";
          
          const val = generateValue(f.type, r, f.rules);
          td.innerText = val.toString();
          trRow.appendChild(td);
        });
        tbody.appendChild(trRow);
      }
      previewTable.appendChild(tbody);
    };

    // Estimate file size of generated export
    function updateSizeDisplay() {
      const rows = parseInt(rowRangeInput.value, 10);
      if (fields.length === 0) {
        sizeDisplay.innerText = "0 KB";
        return;
      }

      // Estimate avg row size in bytes depending on configuration
      let avgRowSize = 0;
      fields.forEach(f => {
        if (f.type === "uuid") avgRowSize += 36;
        else if (f.type === "email") avgRowSize += 25;
        else if (f.type === "phone") avgRowSize += 16;
        else if (f.type === "date") avgRowSize += 10;
        else if (f.type === "boolean") avgRowSize += 5;
        else if (f.type === "number") avgRowSize += 8;
        else avgRowSize += 12; // generic string size
      });

      let totalBytes = 0;
      const format = exportFormat.value;

      if (format === "csv") {
        // field names row
        const headerSize = fields.map(f => f.name).join(",").length + 1;
        totalBytes = headerSize + ((avgRowSize + fields.length) * rows);
      } else {
        // JSON structure includes braces, quotes, colons, commas
        const keyOverhead = fields.reduce((sum, f) => sum + (f.name.length + 6), 0);
        totalBytes = ((avgRowSize + keyOverhead + 4) * rows);
        const rootKey = jsonRootInput.value.trim();
        if (rootKey) {
          totalBytes += rootKey.length + 12;
        }
      }

      const sizeKb = totalBytes / 1024;
      if (sizeKb < 1024) {
        sizeDisplay.innerText = `${sizeKb.toFixed(1)} KB`;
      } else {
        sizeDisplay.innerText = `${(sizeKb / 1024).toFixed(2)} MB`;
      }
    };

    // Add field
    addFieldBtn.addEventListener("click", () => {
      const colNum = fields.length + 1;
      fields.push({
        id: Math.random().toString(36).substring(2, 9),
        name: `column_${colNum}`,
        type: "firstname",
        rules: {}
      });
      renderFieldsList();
      updatePreview();
      updateSizeDisplay();
    });

    // Refresh Preview button
    refreshPreviewBtn.addEventListener("click", () => {
      updatePreview();
      appInstance.showToast("Re-generated live preview sample rows", "info");
    });

    // Cancel Asynchronous bulk generation
    cancelBtn.addEventListener("click", () => {
      cancelGeneration = true;
    });

    // Trigger Asynchronous Bulk Data Generation and file trigger download
    generateBtn.addEventListener("click", () => {
      if (fields.length === 0) {
        appInstance.showToast("Please add at least one column to generate data.", "error");
        return;
      }

      const rowsCount = parseInt(rowRangeInput.value, 10);
      const format = exportFormat.value;
      const rootKey = jsonRootInput.value.trim();

      isGenerating = true;
      cancelGeneration = false;

      // Show Progress Modal
      progressOverlay.classList.remove("hidden");
      progressBar.style.width = "0%";
      progressText.innerText = "Initializing generator pipeline...";

      // Asynchronous Batch Processor variables
      const BATCH_SIZE = 5000;
      let currentIndex = 0;
      const dataPool = [];

      const processBatch = () => {
        if (cancelGeneration) {
          progressOverlay.classList.add("hidden");
          isGenerating = false;
          appInstance.showToast("Generation cancelled by user", "info");
          return;
        }

        const limit = Math.min(currentIndex + BATCH_SIZE, rowsCount);
        
        for (let i = currentIndex; i < limit; i++) {
          const rowObj = {};
          fields.forEach(f => {
            rowObj[f.name || "unnamed"] = generateValue(f.type, i, f.rules);
          });
          dataPool.push(rowObj);
        }

        currentIndex = limit;
        const progress = Math.round((currentIndex / rowsCount) * 100);
        progressBar.style.width = `${progress}%`;
        progressText.innerText = `Generated ${currentIndex.toLocaleString()} of ${rowsCount.toLocaleString()} rows (${progress}%)`;

        if (currentIndex < rowsCount) {
          // Yield main-thread control to prevent locking UI
          setTimeout(processBatch, 0);
        } else {
          // Finished generating. Serialize and download.
          progressText.innerText = "Formatting output buffer...";
          setTimeout(() => {
            try {
              let outputContent = "";
              let mimeType = "";
              let fileExtension = "";

              if (format === "csv") {
                outputContent = serializeCSV(dataPool);
                mimeType = "text/csv;charset=utf-8;";
                fileExtension = "csv";
              } else {
                let serializedJson = "";
                if (rootKey) {
                  const rootObj = {};
                  rootObj[rootKey] = dataPool;
                  serializedJson = JSON.stringify(rootObj, null, 2);
                } else {
                  serializedJson = JSON.stringify(dataPool, null, 2);
                }
                outputContent = serializedJson;
                mimeType = "application/json;charset=utf-8;";
                fileExtension = "json";
              }

              const blob = new Blob([outputContent], { type: mimeType });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = `mock_dataset_${Date.now()}.${fileExtension}`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(link.href);

              appInstance.showToast(`Successfully generated and downloaded ${rowsCount.toLocaleString()} rows!`, "success");
            } catch (err) {
              console.error(err);
              appInstance.showToast("Failed to serialize file buffer: " + err.message, "error");
            } finally {
              progressOverlay.classList.add("hidden");
              isGenerating = false;
            }
          }, 50);
        }
      };

      // Launch process batch
      setTimeout(processBatch, 100);
    });

    // Helper: RFC 4180 Compliant CSV builder
    function serializeCSV(arr) {
      if (arr.length === 0) return "";
      
      const columnNames = fields.map(f => f.name || "unnamed");
      
      // Escape CSV values (double quotes, commas, newlines)
      const escapeCsvVal = (val) => {
        if (val === null || val === undefined) return "";
        let str = val.toString();
        if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
          str = '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
      };

      const csvLines = [];
      // Add Header
      csvLines.push(columnNames.map(escapeCsvVal).join(","));

      // Add Data Rows
      arr.forEach(row => {
        const line = columnNames.map(col => escapeCsvVal(row[col]));
        csvLines.push(line.join(","));
      });

      return csvLines.join("\n");
    };

    // Helper: HTML escaping
    function escapeHtml(str) {
      if (!str) return "";
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    // Initialize with default preset schema
    applyPreset("users");
  }
};
