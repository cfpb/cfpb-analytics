let isGoogleTagManagerLoaded = false;
let loadTryCount = 0;
/**
 * Initialize the Analytics module.
 */
function _init() {
  // Detect if Google tag manager is loaded.
  const hasGoogleTagManager = {}.hasOwnProperty.call(window, 'google_tag_manager');
  if (hasGoogleTagManager && typeof window.google_tag_manager !== 'undefined') {
    isGoogleTagManagerLoaded = true;
  } else if ( !hasGoogleTagManager ) {
    let tagManager;
    Object.defineProperty(window, 'google_tag_manager', {
      enumerable: true,
      configurable: true,
      get: function () {
        return tagManager;
      },
      set: function (value) {
        tagManager = value;
        isGoogleTagManagerLoaded = true;
      },
    });
  }
}

/**
 * Poll every 0.5 seconds for 10 seconds for if Google Tag Manager has loaded.
 * @returns {Promise} Resolves if Google Tag Manager has loaded.
 *   Rejects if polling has completed.
 */
function ensureGoogleTagManagerLoaded() {
  return new Promise(function (resolve, reject) {
    (function waitForGoogleTagManager(){
      if (++loadTryCount > 9) return reject();
      if (isGoogleTagManagerLoaded) return resolve();
      _init();
      setTimeout(waitForGoogleTagManager, 500);
    })();
  });
}

/**
 * @name analyticsSendEvent
 * @kind function
 * @description
 *   Pushes an event to the GTM dataLayer.
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
  return ensureGoogleTagManagerLoaded().then(() => {
    analyticsLog(
      `Pushing event "${payload.event}",
       with action "${payload.action}" and label "${payload.label}".`
    );
    // isGoogleTagManagerLoaded should equal true at this point.
    window.dataLayer.push({
      event: payload.event || 'Page Interaction',
      action: payload.action,
      label: payload.label || '',
      eventCallback: payload.eventCallback,
      eventTimeout: payload.eventTimeout || 500,
    });
  }).catch(()=> {
    if (payload.eventCallback && typeof payload.eventCallback === 'function') {
      // eslint-disable-next-line callback-return
      payload.eventCallback();
    }
  });
}

/**
 * Log a message to the console if the `debug-gtm` URL parameter is set.
 *
 * @param {string} msg - Message to load to the console.
 */
function analyticsLog(...msg) {
  // Check if URLSearchParams is supported (Chrome > 48; Edge > 16).
  if (typeof window.URLSearchParams === 'function') {
    // Get query params.
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('debug-gtm') === 'true') {
      console.log(`ANALYTICS DEBUG MODE: ${msg}`);
    }
  }
}

/**
 * Try to proactively initialize analytics when custom gtmloaded event fires.
 */
window.addEventListener('gtmloaded', function() {
  ensureGoogleTagManagerLoaded().catch(()=> {
    loadTryCount = 0;
  });
}, { once: true });


export { analyticsSendEvent, analyticsLog };
