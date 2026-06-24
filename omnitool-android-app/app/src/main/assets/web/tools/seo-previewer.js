export default {
  id: "seo-previewer",
  name: "Meta Tag & SEO Previewer",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Meta Properties</h3>
          </div>
          
          <div class="form-group">
            <div style="display: flex; justify-content: space-between;">
              <label for="seo-title">Page Title</label>
              <span id="seo-title-count" style="font-size: 11px; color: var(--text-muted);">0 / 60 chars</span>
            </div>
            <input type="text" id="seo-title" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 13px;" value="OmniTool Hub | The Ultimate All-in-One Utility Suite" placeholder="Enter page title...">
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between;">
              <label for="seo-desc">Meta Description</label>
              <span id="seo-desc-count" style="font-size: 11px; color: var(--text-muted);">0 / 160 chars</span>
            </div>
            <textarea id="seo-desc" class="input-textarea" style="min-height: 80px;" placeholder="Enter page meta description...">A premium, privacy-focused developer and designer utility suite running entirely client-side for complete data security and offline-first performance.</textarea>
          </div>

          <div class="form-group">
            <label for="seo-url">Page URL</label>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="seo-url" class="search-bar" style="flex: 1; border: 1px solid var(--border-color); font-size: 13px;" value="https://omnitoolhub.app" placeholder="https://example.com">
              <button type="button" class="tool-btn primary" id="seo-fetch-btn" style="font-size: 11px; padding: 0 12px; white-space: nowrap; height: 38px;">Fetch Tags</button>
            </div>
          </div>

          <div class="form-group">
            <label for="seo-sitename">Site Name</label>
            <input type="text" id="seo-sitename" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 13px;" value="OmniTool Hub" placeholder="e.g. My App">
          </div>

          <div class="form-group">
            <label for="seo-og-image">Open Graph Image (URL or Upload)</label>
            <input type="text" id="seo-og-image" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 13px; margin-bottom: 8px;" value="https://omnitoolhub.app/assets/og-banner.jpg" placeholder="https://example.com/image.jpg">
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="file" id="seo-file-input" accept="image/*" style="display: none;">
              <button type="button" class="tool-btn secondary" id="seo-file-btn" style="font-size: 11px; padding: 6px 12px;">Upload Test Image</button>
              <span style="font-size: 11px; color: var(--text-muted);" id="seo-file-status">Or use text URL above</span>
            </div>
            <div id="seo-upload-preview" style="display: none; margin-top: 10px; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background: rgba(0,0,0,0.25); max-width: 260px;">
              <img id="seo-upload-thumb" alt="Uploaded Open Graph preview" style="display: block; width: 100%; max-height: 130px; object-fit: cover;">
            </div>
          </div>

          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 14px; margin-top: 14px;">
            <label for="seo-schema-type">Structured Data (JSON-LD Schema)</label>
            <select id="seo-schema-type" class="form-select" style="margin-bottom: 12px;">
              <option value="none">None (Disabled)</option>
              <option value="article">Article Schema</option>
              <option value="product">Product Schema</option>
              <option value="local-business">Local Business Schema</option>
            </select>
          </div>

          <!-- Dynamic Schema Forms -->
          <div id="schema-fields-article" class="schema-fields-group" style="display: none;">
            <div class="form-group">
              <label for="schema-art-author">Author Name</label>
              <input type="text" id="schema-art-author" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 12px;" value="John Doe">
            </div>
            <div class="form-group">
              <label for="schema-art-pub">Publisher Name</label>
              <input type="text" id="schema-art-pub" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 12px;" value="OmniTool Hub">
            </div>
            <div class="form-group">
              <label for="schema-art-date">Date Published</label>
              <input type="date" id="schema-art-date" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 12px;">
            </div>
          </div>

          <div id="schema-fields-product" class="schema-fields-group" style="display: none;">
            <div class="form-group">
              <label for="schema-prod-price">Price</label>
              <input type="number" id="schema-prod-price" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 12px;" value="49.99" step="0.01">
            </div>
            <div class="form-group">
              <label for="schema-prod-currency">Currency Code</label>
              <input type="text" id="schema-prod-currency" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 12px;" value="USD">
            </div>
            <div class="form-group">
              <label for="schema-prod-sku">SKU</label>
              <input type="text" id="schema-prod-sku" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 12px;" value="OTH-1001">
            </div>
            <div class="form-group">
              <label for="schema-prod-avail">Availability</label>
              <select id="schema-prod-avail" class="form-select">
                <option value="InStock">In Stock</option>
                <option value="OutOfStock">Out Of Stock</option>
                <option value="PreOrder">Pre Order</option>
              </select>
            </div>
          </div>

          <div id="schema-fields-local-business" class="schema-fields-group" style="display: none;">
            <div class="form-group">
              <label for="schema-loc-addr">Street Address</label>
              <input type="text" id="schema-loc-addr" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 12px;" value="123 Cyber Way">
            </div>
            <div class="form-group">
              <label for="schema-loc-city">City</label>
              <input type="text" id="schema-loc-city" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 12px;" value="San Francisco">
            </div>
            <div class="form-group">
              <label for="schema-loc-post">Postal Code</label>
              <input type="text" id="schema-loc-post" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 12px;" value="94107">
            </div>
            <div class="form-group">
              <label for="schema-loc-phone">Phone Number</label>
              <input type="text" id="schema-loc-phone" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 12px;" value="+1-555-0199">
            </div>
          </div>
        </div>
        <div class="tool-panel">
          <div class="panel-header" style="flex-wrap: wrap; gap: 8px;">
            <h3>Mockup Previews</h3>
            <div style="display: flex; gap: 4px;" id="seo-tabs">
              <button class="tool-btn secondary active" data-tab="google" style="font-size: 11px; padding: 4px 8px;">Google</button>
              <button class="tool-btn secondary" data-tab="facebook" style="font-size: 11px; padding: 4px 8px;">Facebook</button>
              <button class="tool-btn secondary" data-tab="twitter" style="font-size: 11px; padding: 4px 8px;">X (Twitter)</button>
              <button class="tool-btn secondary" data-tab="discord" style="font-size: 11px; padding: 4px 8px;">Discord</button>
            </div>
          </div>

          <!-- MOCKUP CONTAINER -->
          <div id="seo-mockup-viewport" style="min-height: 240px; background: rgba(0,0,0,0.25); border-radius: 8px; padding: 20px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color);">
            
            <!-- Google Mockup -->
            <div id="mock-google" class="mockup-item" style="width: 100%; max-width: 520px; text-align: left; font-family: arial, sans-serif; display: block;">
              <div style="font-size: 12px; color: #202124; margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
                <div style="width: 26px; height: 26px; border-radius: 50%; background: #f1f3f4; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #5f6368; font-size: 11px;" id="google-fav-mock">O</div>
                <div style="display: flex; flex-direction: column;">
                  <span id="google-domain-label" style="line-height: 1.2; font-weight: 400;">omnitoolhub.app</span>
                  <span id="google-url-label" style="font-size: 11px; color: #5f6368; line-height: 1.2;">https://omnitoolhub.app</span>
                </div>
              </div>
              <h3 id="google-title-mock" style="font-size: 19px; color: #1a0dab; font-weight: 400; margin: 0 0 4px 0; line-height: 1.3; cursor: pointer; text-decoration: none;">Page Title</h3>
              <p id="google-desc-mock" style="font-size: 14px; color: #4d5156; margin: 0; line-height: 1.4; word-wrap: break-word;">Page description snippet will go here...</p>
            </div>

            <!-- Facebook Mockup -->
            <div id="mock-facebook" class="mockup-item" style="width: 100%; max-width: 500px; border: 1px solid #dddfe2; background: #ffffff; color: #1c1e21; border-radius: 8px; overflow: hidden; display: none; text-align: left; font-family: Helvetica, Arial, sans-serif; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
              <div style="width: 100%; height: 260px; background: #ebedf0; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
                <img id="fb-img-mock" style="width: 100%; height: 100%; object-fit: cover;">
                <div id="fb-img-placeholder" style="color: #8d949e; font-size: 13px;">No Image Chosen</div>
              </div>
              <div style="padding: 12px; background: #f2f3f5; border-top: 1px solid #dddfe2;">
                <div id="fb-domain-mock" style="font-size: 12px; color: #606770; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">OMNITOOLHUB.APP</div>
                <div id="fb-title-mock" style="font-size: 16px; font-weight: 600; line-height: 20px; color: #1c1e21; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Page Title</div>
                <div id="fb-desc-mock" style="font-size: 13px; line-height: 18px; color: #606770; height: 36px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">Page description summary content.</div>
              </div>
            </div>

            <!-- Twitter Mockup -->
            <div id="mock-twitter" class="mockup-item" style="width: 100%; max-width: 440px; border: 1px solid #38444d; background: #15202b; color: #ffffff; border-radius: 14px; overflow: hidden; display: none; text-align: left; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              <div style="width: 100%; height: 220px; background: #192734; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; border-bottom: 1px solid #38444d;">
                <img id="tw-img-mock" style="width: 100%; height: 100%; object-fit: cover;">
                <div id="tw-img-placeholder" style="color: #8899a6; font-size: 13px;">No Image Chosen</div>
              </div>
              <div style="padding: 12px;">
                <div id="tw-domain-mock" style="font-size: 13px; color: #8899a6; margin-bottom: 3px;">omnitoolhub.app</div>
                <div id="tw-title-mock" style="font-size: 15px; font-weight: bold; margin-bottom: 3px; color: #ffffff;">Page Title</div>
                <div id="tw-desc-mock" style="font-size: 13px; color: #8899a6; line-height: 17px; height: 34px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">Page description summary content.</div>
              </div>
            </div>

            <!-- Discord Mockup -->
            <div id="mock-discord" class="mockup-item" style="width: 100%; max-width: 480px; background: #2f3136; border-left: 4px solid #10b981; border-radius: 4px; padding: 16px; display: none; text-align: left; font-family: 'gg sans', 'Noto Sans', sans-serif;">
              <div style="font-size: 12px; color: #dcddde; font-weight: 500; margin-bottom: 4px;" id="discord-sitename-mock">Site Name</div>
              <div id="discord-title-mock" style="font-size: 16px; font-weight: 600; color: #00aff4; margin-bottom: 8px; cursor: pointer;">Page Title</div>
              <div id="discord-desc-mock" style="font-size: 14px; color: #dcddde; line-height: 1.35; margin-bottom: 12px;">Page description summary content.</div>
              <div style="width: 100%; max-height: 250px; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #36393f;">
                <img id="dc-img-mock" style="max-width: 100%; max-height: 250px; object-fit: contain;">
                <div id="dc-img-placeholder" style="color: #72767d; font-size: 12px; padding: 20px;">No Image Chosen</div>
              </div>
            </div>

          </div>

          <!-- HTML Header Tags Code Output -->
          <div class="form-group" style="margin-top: 16px;">
            <div class="panel-header" style="border: none; padding: 0; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
              <label>Generated Header HTML Tags</label>
              <button class="tool-btn accent-emerald" id="seo-copy-btn" style="font-size: 11px;"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Meta Tags</button>
            </div>
            <pre class="output-pre" id="seo-html-output" style="max-height: 180px; font-family: monospace; font-size: 11px; overflow-x: auto; white-space: pre; text-align: left;"></pre>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide &amp; SEO Standards</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Title Restrictions</strong>: Google truncates titles after 60 characters. Keep your core keywords at the front.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Meta Description Limits</strong>: Maintain description sizes between 120 and 160 characters. Descriptions outside this window may get cropped or overridden by search engine algorithms.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Open Graph Tags</strong>: Standardized <code>og:</code> tags ensure social networks parse and build card shapes correctly, driving higher click-through click rates.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const titleInput = container.querySelector("#seo-title");
    const titleCount = container.querySelector("#seo-title-count");
    const descInput = container.querySelector("#seo-desc");
    const descCount = container.querySelector("#seo-desc-count");
    const urlInput = container.querySelector("#seo-url");
    const sitenameInput = container.querySelector("#seo-sitename");
    const ogImageInput = container.querySelector("#seo-og-image");
    
    const fileInput = container.querySelector("#seo-file-input");
    const fileBtn = container.querySelector("#seo-file-btn");
    const fileStatus = container.querySelector("#seo-file-status");
    const uploadPreview = container.querySelector("#seo-upload-preview");
    const uploadThumb = container.querySelector("#seo-upload-thumb");

    const fetchBtn = container.querySelector("#seo-fetch-btn");
    const schemaTypeSelect = container.querySelector("#seo-schema-type");

    // Previews Elements
    const googleFav = container.querySelector("#google-fav-mock");
    const googleDomain = container.querySelector("#google-domain-label");
    const googleUrl = container.querySelector("#google-url-label");
    const googleTitle = container.querySelector("#google-title-mock");
    const googleDesc = container.querySelector("#google-desc-mock");

    const fbImg = container.querySelector("#fb-img-mock");
    const fbPlaceholder = container.querySelector("#fb-img-placeholder");
    const fbDomain = container.querySelector("#fb-domain-mock");
    const fbTitle = container.querySelector("#fb-title-mock");
    const fbDesc = container.querySelector("#fb-desc-mock");

    const twImg = container.querySelector("#tw-img-mock");
    const twPlaceholder = container.querySelector("#tw-img-placeholder");
    const twDomain = container.querySelector("#tw-domain-mock");
    const twTitle = container.querySelector("#tw-title-mock");
    const twDesc = container.querySelector("#tw-desc-mock");

    const dcImg = container.querySelector("#dc-img-mock");
    const dcPlaceholder = container.querySelector("#dc-img-placeholder");
    const dcSitename = container.querySelector("#discord-sitename-mock");
    const dcTitle = container.querySelector("#discord-title-mock");
    const dcDesc = container.querySelector("#discord-desc-mock");

    const htmlOutput = container.querySelector("#seo-html-output");
    const copyBtn = container.querySelector("#seo-copy-btn");
    const tabs = container.querySelectorAll("#seo-tabs button");
    const mockups = container.querySelectorAll(".mockup-item");
    let localImageUrl = "";

    const setActiveTab = (targetTab) => {
      tabs.forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-tab") === targetTab);
      });

      mockups.forEach(mockup => {
        mockup.style.display = mockup.id === `mock-${targetTab}` ? "block" : "none";
      });
    };

    const clearLocalUploadPreview = () => {
      if (localImageUrl) {
        URL.revokeObjectURL(localImageUrl);
        localImageUrl = "";
      }
      uploadThumb.removeAttribute("src");
      uploadPreview.style.display = "none";
      fileStatus.innerText = "Or use text URL above";
      fileInput.value = "";
    };

    // CORS scraper implementation
    fetchBtn?.addEventListener("click", async () => {
      const targetUrl = urlInput.value.trim();
      if (!targetUrl) {
        appInstance.showToast("Please enter a Page URL first!", "error");
        return;
      }
      
      fetchBtn.disabled = true;
      fetchBtn.innerText = "Scraping...";
      appInstance.showToast("Scraping metadata via proxy...", "info");

      try {
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
        if (!response.ok) throw new Error("HTTP error " + response.status);
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        
        // Extract title
        const scrapedTitle = doc.querySelector("title")?.innerText || 
                             doc.querySelector("meta[property='og:title']")?.getAttribute("content") || 
                             doc.querySelector("meta[name='twitter:title']")?.getAttribute("content") || "";
                             
        // Extract description
        const scrapedDesc = doc.querySelector("meta[name='description']")?.getAttribute("content") || 
                            doc.querySelector("meta[property='og:description']")?.getAttribute("content") || 
                            doc.querySelector("meta[name='twitter:description']")?.getAttribute("content") || "";
                             
        // Extract og:image
        const scrapedImage = doc.querySelector("meta[property='og:image']")?.getAttribute("content") || 
                             doc.querySelector("meta[name='twitter:image']")?.getAttribute("content") || "";
                             
        // Extract og:site_name
        const scrapedSiteName = doc.querySelector("meta[property='og:site_name']")?.getAttribute("content") || "";

        if (scrapedTitle) titleInput.value = scrapedTitle;
        if (scrapedDesc) descInput.value = scrapedDesc;
        if (scrapedImage) {
          ogImageInput.value = scrapedImage;
          clearLocalUploadPreview();
        }
        if (scrapedSiteName) sitenameInput.value = scrapedSiteName;

        updatePreviews();
        appInstance.showToast("Successfully scraped & loaded meta tags!", "success");
      } catch (err) {
        console.error(err);
        appInstance.showToast("Failed to scrape target URL. Check CORS or URL validity.", "error");
      } finally {
        fetchBtn.disabled = false;
        fetchBtn.innerText = "Fetch Tags";
      }
    });

    // Local Test Upload Image
    fileBtn?.addEventListener("click", () => fileInput.click());
    fileInput?.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
          fileStatus.innerText = "Please choose an image file";
          appInstance.showToast("Please choose an image file.", "error");
          return;
        }

        if (localImageUrl) {
          URL.revokeObjectURL(localImageUrl);
        }

        localImageUrl = URL.createObjectURL(file);
        ogImageInput.value = localImageUrl;
        uploadThumb.src = localImageUrl;
        uploadPreview.style.display = "block";
        fileStatus.innerText = `Loaded ${file.name}`;
        setActiveTab("facebook");
        updatePreviews();
        appInstance.showToast("Loaded local SEO preview image.", "success");
      }
    });

    // Handle image load error gracefully to avoid broken image icons
    const handleImgError = (imgEl, placeholderEl) => {
      imgEl.style.display = "none";
      placeholderEl.style.display = "block";
    };
    if (fbImg) fbImg.onerror = () => handleImgError(fbImg, fbPlaceholder);
    if (twImg) twImg.onerror = () => handleImgError(twImg, twPlaceholder);
    if (dcImg) dcImg.onerror = () => handleImgError(dcImg, dcPlaceholder);

    // Extract Domain Helper
    const getDomain = (url) => {
      try {
        const clean = url.trim();
        if (!/^https?:\/\//i.test(clean)) {
          return clean.split("/")[0] || "example.com";
        }
        const parsed = new URL(clean);
        return parsed.hostname;
      } catch (e) {
        return "example.com";
      }
    };

    // Toggle Schema field displays
    schemaTypeSelect?.addEventListener("change", (e) => {
      container.querySelectorAll(".schema-fields-group").forEach(el => el.style.display = "none");
      const activeGroup = container.querySelector(`#schema-fields-${e.target.value}`);
      if (activeGroup) activeGroup.style.display = "block";
      updatePreviews();
    });

    // Main Update Function
    const updatePreviews = () => {
      const title = titleInput.value;
      const desc = descInput.value;
      const url = urlInput.value;
      const sitename = sitenameInput.value;
      const ogImg = ogImageInput.value;

      // Title & Desc character counters
      titleCount.innerText = `${title.length} / 60 chars`;
      titleCount.style.color = title.length > 60 ? "var(--accent-rose)" : "var(--text-muted)";
      descCount.innerText = `${desc.length} / 160 chars`;
      descCount.style.color = desc.length > 160 ? "var(--accent-rose)" : "var(--text-muted)";

      const domain = getDomain(url);

      // Google Mockup
      googleTitle.innerText = title || "Please enter title";
      googleDesc.innerText = desc.length > 155 ? desc.slice(0, 155) + "..." : desc || "Please enter description";
      googleDomain.innerText = domain;
      googleUrl.innerText = url || "https://example.com";
      googleFav.innerText = domain.charAt(0).toUpperCase();

      // Facebook Mockup
      fbTitle.innerText = title;
      fbDesc.innerText = desc;
      fbDomain.innerText = domain.toUpperCase();
      if (ogImg) {
        fbImg.src = ogImg;
        fbImg.style.display = "block";
        fbPlaceholder.style.display = "none";
      } else {
        fbImg.style.display = "none";
        fbPlaceholder.style.display = "block";
      }

      // Twitter Mockup
      twTitle.innerText = title;
      twDesc.innerText = desc;
      twDomain.innerText = domain.toLowerCase();
      if (ogImg) {
        twImg.src = ogImg;
        twImg.style.display = "block";
        twPlaceholder.style.display = "none";
      } else {
        twImg.style.display = "none";
        twPlaceholder.style.display = "block";
      }

      // Discord Mockup
      dcTitle.innerText = title;
      dcDesc.innerText = desc;
      dcSitename.innerText = sitename;
      if (ogImg) {
        dcImg.src = ogImg;
        dcImg.style.display = "block";
        dcPlaceholder.style.display = "none";
      } else {
        dcImg.style.display = "none";
        dcPlaceholder.style.display = "block";
      }

      // Format JSON-LD block
      const schemaType = schemaTypeSelect?.value || "none";
      let jsonLdString = "";
      if (schemaType === "article") {
        const author = container.querySelector("#schema-art-author").value;
        const pub = container.querySelector("#schema-art-pub").value;
        const pubDate = container.querySelector("#schema-art-date").value || new Date().toISOString().split('T')[0];
        const obj = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title || "Article Title",
          "image": ogImg || "",
          "datePublished": pubDate,
          "author": {
            "@type": "Person",
            "name": author
          },
          "publisher": {
            "@type": "Organization",
            "name": pub,
            "logo": {
              "@type": "ImageObject",
              "url": ogImg || ""
            }
          },
          "description": desc || ""
        };
        jsonLdString = `

<!-- Schema.org JSON-LD (Structured Data) -->
<script type="application/ld+json">
${JSON.stringify(obj, null, 2)}
</script>`;
      } else if (schemaType === "product") {
        const price = container.querySelector("#schema-prod-price").value || "0.00";
        const currency = container.querySelector("#schema-prod-currency").value || "USD";
        const sku = container.querySelector("#schema-prod-sku").value;
        const avail = container.querySelector("#schema-prod-avail").value;
        const obj = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": title || "Product Name",
          "image": ogImg || "",
          "description": desc || "",
          "sku": sku,
          "offers": {
            "@type": "Offer",
            "url": url || "",
            "priceCurrency": currency,
            "price": price,
            "availability": `https://schema.org/${avail}`
          }
        };
        jsonLdString = `

<!-- Schema.org JSON-LD (Structured Data) -->
<script type="application/ld+json">
${JSON.stringify(obj, null, 2)}
</script>`;
      } else if (schemaType === "local-business") {
        const addr = container.querySelector("#schema-loc-addr").value;
        const city = container.querySelector("#schema-loc-city").value;
        const post = container.querySelector("#schema-loc-post").value;
        const phone = container.querySelector("#schema-loc-phone").value;
        const obj = {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": sitename || title || "Business Name",
          "image": ogImg || "",
          "telephone": phone,
          "url": url || "",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": addr,
            "addressLocality": city,
            "postalCode": post,
            "addressCountry": "US"
          }
        };
        jsonLdString = `

<!-- Schema.org JSON-LD (Structured Data) -->
<script type="application/ld+json">
${JSON.stringify(obj, null, 2)}
</script>`;
      }

      // Generate HTML Tag text
      const htmlString = `<!-- Standard Meta Tags -->
<title>${title}</title>
<meta name="description" content="${desc}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImg}">
<meta property="og:site_name" content="${sitename}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${desc}">
<meta property="twitter:image" content="${ogImg}">${jsonLdString}`;

      htmlOutput.innerText = htmlString;
    };

    // Tabs logic
    tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        setActiveTab(btn.getAttribute("data-tab"));
      });
    });

    // Inputs bindings
    const elements = [titleInput, descInput, urlInput, sitenameInput];
    elements.forEach(el => el?.addEventListener("input", updatePreviews));
    
    // Bind all Schema inputs to auto update previews
    const schemaInputs = container.querySelectorAll(".schema-fields-group input, .schema-fields-group select");
    schemaInputs.forEach(el => el?.addEventListener("input", updatePreviews));
    schemaInputs.forEach(el => el?.addEventListener("change", updatePreviews));

    ogImageInput?.addEventListener("input", () => {
      if (localImageUrl && ogImageInput.value !== localImageUrl) {
        clearLocalUploadPreview();
      }
      updatePreviews();
    });

    // Copy tags handler
    copyBtn?.addEventListener("click", () => {
      appInstance.copyText(htmlOutput.innerText);
    });

    // Set default Article Publish Date to today
    const dateInput = container.querySelector("#schema-art-date");
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Initial draw
    updatePreviews();
  }
};
