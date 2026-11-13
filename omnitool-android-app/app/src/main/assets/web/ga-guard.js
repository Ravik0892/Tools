/**
 * OmniTool Hub - Google Analytics 4 Opt-Out & Developer Exclusion Guard
 *
 * Provides 100% client-side privacy controls to stop GA4 and Cloudflare Web Analytics
 * from tracking searches, tool usage, and pageviews on developer PC & mobile devices.
 */
(function() {
  'use strict';

  var GA_MEASUREMENT_ID = 'G-7FG02T8BFR';
  var STORAGE_KEY = 'omnitool_ga_optout';

  // 1. Process URL query triggers (?no_track=1 or ?optout=1 to disable, ?no_track=0 to re-enable)
  try {
    var params = new URLSearchParams(window.location.search);
    var noTrackParam = params.get('no_track') || params.get('optout') || params.get('dev_mode');
    if (noTrackParam === '1' || noTrackParam === 'true') {
      localStorage.setItem(STORAGE_KEY, 'true');
    } else if (noTrackParam === '0' || noTrackParam === 'false') {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (_) {}

  // 2. Detect Developer / Local / Android App Environments
  var host = window.location.hostname || '';
  var isLocalDev = window.location.protocol === 'file:' ||
                   host === 'localhost' ||
                   host === '127.0.0.1' ||
                   host.startsWith('192.168.') ||
                   host.startsWith('10.') ||
                   host.startsWith('172.16.') ||
                   host.endsWith('.local');

  var isAndroidApp = host === 'appassets.androidplatform.net' ||
                     (typeof navigator !== 'undefined' && navigator.userAgent && (navigator.userAgent.indexOf('OmniToolAndroid') !== -1 || navigator.userAgent.indexOf('wv') !== -1)) ||
                     window.location.search.indexOf('embed=1') !== -1 ||
                     window.location.hash.indexOf('embed=1') !== -1;

  var isUserOptedOut = false;
  try {
    isUserOptedOut = localStorage.getItem(STORAGE_KEY) === 'true';
  } catch (_) {}

  // 3. If opted out, local dev, or inside Android App: completely disable GA4 & tracking
  if (isUserOptedOut || isLocalDev || isAndroidApp) {
    // Official Google Analytics opt-out window property
    window['ga-disable-' + GA_MEASUREMENT_ID] = true;
    window.__GA_DISABLED__ = true;

    // Suppress gtag calls immediately
    var originalGtag = window.gtag;
    window.gtag = function() {
      // Intentionally drop all events, searches, and pageviews
      return;
    };

    if (window.console && console.info) {
      console.info('🛡️ [OmniTool Privacy] Google Analytics 4 tracking is DISABLED on this device (Opt-out active).');
    }
  }

  // 4. Hook into Aesthetics Modal to provide an in-app toggle switch
  function initAestheticsToggle() {
    var modal = document.getElementById('aesthetics-modal');
    if (!modal) return;

    var audioGroup = modal.querySelector('#aesthetics-audio');
    var existingToggle = document.getElementById('aesthetics-ga-optout');

    // If toggle doesn't exist yet in modal DOM, insert it right after Audio Feedback
    if (!existingToggle && audioGroup) {
      var parentGroup = audioGroup.closest('.form-group');
      if (parentGroup && parentGroup.parentNode) {
        var optoutContainer = document.createElement('div');
        optoutContainer.className = 'form-group';
        optoutContainer.style.cssText = 'display: flex; flex-direction: column; gap: 4px; padding: 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 6px; margin-top: 4px;';
        optoutContainer.innerHTML = [
          '<label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; font-weight: 700; color: var(--text-main);">',
          '  <input type="checkbox" id="aesthetics-ga-optout" style="width: 16px; height: 16px; accent-color: var(--accent-cyan);">',
          '  <span>Developer / Private Mode (Block GA4)</span>',
          '</label>',
          '<p style="margin: 0; font-size: 11px; color: var(--text-muted); line-height: 1.4; padding-left: 24px;">',
          '  Stops Google Analytics from tracking searches, clicks, and pageviews on this device.',
          '</p>'
        ].join('');
        parentGroup.parentNode.insertBefore(optoutContainer, parentGroup.nextSibling);
        existingToggle = document.getElementById('aesthetics-ga-optout');
      }
    }

    if (existingToggle) {
      existingToggle.checked = localStorage.getItem(STORAGE_KEY) === 'true';
    }

    var saveBtn = modal.querySelector('#aesthetics-modal-save');
    if (saveBtn && !saveBtn.dataset.gaHooked) {
      saveBtn.dataset.gaHooked = 'true';
      saveBtn.addEventListener('click', function() {
        var toggle = document.getElementById('aesthetics-ga-optout');
        if (!toggle) return;
        if (toggle.checked) {
          localStorage.setItem(STORAGE_KEY, 'true');
          window['ga-disable-' + GA_MEASUREMENT_ID] = true;
          window.__GA_DISABLED__ = true;
          window.gtag = function() { return; };
          if (window.app && typeof window.app.showToast === 'function') {
            window.app.showToast('🛡️ Developer Private Mode active: GA4 tracking blocked!', 'info');
          }
        } else {
          localStorage.removeItem(STORAGE_KEY);
          window['ga-disable-' + GA_MEASUREMENT_ID] = false;
          window.__GA_DISABLED__ = false;
        }
      });
    }
  }

  // Bind to DOMContentLoaded or execute immediately if document is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAestheticsToggle);
  } else {
    initAestheticsToggle();
  }

  // Also hook when user clicks Aesthetics button in header or sidebar
  document.addEventListener('click', function(e) {
    var target = e.target;
    if (target && target.closest && (target.closest('#desktop-aesthetics-btn') || target.closest('#sidebar-aesthetics-btn'))) {
      setTimeout(initAestheticsToggle, 50);
    }
  });

  // Expose global controller for easy console or programmatic activation
  window.OmniToolAnalyticsGuard = {
    disable: function() {
      localStorage.setItem(STORAGE_KEY, 'true');
      window['ga-disable-' + GA_MEASUREMENT_ID] = true;
      window.__GA_DISABLED__ = true;
      window.gtag = function() { return; };
      console.log('✅ Google Analytics 4 has been disabled for this device/browser.');
    },
    enable: function() {
      localStorage.removeItem(STORAGE_KEY);
      window['ga-disable-' + GA_MEASUREMENT_ID] = false;
      window.__GA_DISABLED__ = false;
      console.log('ℹ️ Google Analytics 4 has been enabled for this device/browser.');
    },
    isBlocked: function() {
      return Boolean(window['ga-disable-' + GA_MEASUREMENT_ID] || window.__GA_DISABLED__);
    }
  };
})();
