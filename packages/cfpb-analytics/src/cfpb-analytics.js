/**
 * Log a message to the console if the `debug-gtm` URL parameter is set.
 * @param {string} msg - Message to load to the console.
 */
function analyticsLog(...msg) {
  // Check if URLSearchParams is supported (Chrome > 48; Edge > 16).
  if (typeof window.URLSearchParams === 'function') {
    // Get query params.
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('debug-gtm') === 'true') {
      // eslint-disable-next-line no-console
      console.log(`ANALYTICS DEBUG MODE: ${msg}`);
    }
  }
}

let loadTryCount = 0;

/**
 * @returns {boolean} Whether GTM has been loaded or not.
 */
function _isGtmLoaded() {
  window.dataLayer = window.dataLayer || [];
  const gtmStartedEvent = window.dataLayer.find(
    (element) => element['gtm.start'],
  );

  if (!gtmStartedEvent) {
    // Not even the GTM inline config has executed.
    return false;
  } else if (!gtmStartedEvent['gtm.uniqueEventId']) {
    // GTM inline config has run, but the main GTM JS has not loaded.
    return false;
  }

  // GTM is fully loaded and working.
  return true;
}

/**
 * Poll every 0.5 seconds for 10 seconds for if Google Tag Manager has loaded.
 * @returns {Promise} Resolves if Google Tag Manager has loaded.
 *   Rejects if polling has completed.
 */
function ensureGoogleTagManagerLoaded() {
  return new Promise(function (resolve, reject) {
    (function waitForGoogleTagManager() {
      if (_isGtmLoaded()) return resolve();
      if (++loadTryCount > 9) return reject();
      setTimeout(waitForGoogleTagManager, 500);
    })();
  });
}

/**
 * @name analyticsSendEvent
 * @kind function
 * @description
 *   Pushes an event to the GTM dataLayer.
 *   This can accept arbitrary values, but traditionally (pre-GA4) would accept
 *   event, action, and label. Th eventCallback and eventTimeout values can also
 *   be sent, which are called if there's an issue loading GTM.
 * @param {object} payload - A list or a single event.
 * @param {string} payload.event - Type of event.
 * @param {string} payload.action - Name of event.
 * @param {string} payload.label - DOM element label.
 * @param {Function} [payload.eventCallback] - Function to call on GTM submission.
 * @param {number} [payload.eventTimeout] - Callback invocation fallback time.
 * @returns {Promise} Resolves if the event is sent,
 *   otherwise calls the callback if provided.
 */
function analyticsSendEvent(payload) {
  return ensureGoogleTagManagerLoaded()
    .then(() => {
      // GTM should be loaded at this point.
      const printPayload = [];
      Object.entries(payload).forEach(([key, value]) => {
        printPayload.push(`(${key}: ${value})`);
      });

      analyticsLog(`Sending "${printPayload.join(', ')}"`);
      window.dataLayer.push(payload);
    })
    .catch(() => {
      if (
        payload.eventCallback &&
        typeof payload.eventCallback === 'function'
      ) {
        // eslint-disable-next-line callback-return
        payload.eventCallback();
      }
    });
}

export { analyticsSendEvent, analyticsLog };
