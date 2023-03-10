import { EventObserver } from '@cfpb/cfpb-atomic-component';

function Analytics() {
  let isGoogleTagManagerLoaded = false;
  let that = this;

  /**
   * Initialize the Analytics module.
   */
  function init() {
    // Detect if Google tag manager is loaded.
    if ({}.hasOwnProperty.call(window, 'google_tag_manager')) {
      isGoogleTagManagerLoaded = true;
    } else {
      let _tagManager;
      Object.defineProperty(window, 'google_tag_manager', {
        enumerable: true,
        configurable: true,
        get: function () {
          return _tagManager;
        },
        set: function (value) {
          _tagManager = value;
          if (!isGoogleTagManagerLoaded) {
            isGoogleTagManagerLoaded = true;
            that.dispatchEvent('gtmloaded');
          }
        },
      });
    }
  }

  /**
   * @name sendEvent
   * @kind function
   * @description
   *   Pushes an event to the GTM dataLayer.
   * @param {object} payload - A list or a single event.
   * @param {string} payload.category - Type of event.
   * @param {string} payload.action - Name of event.
   * @param {string} payload.label - DOM element label.
   * @param {Function} [payload.callback] - Function to call on GTM submission.
   * @param {number} [payload.timeout] - Callback invocation fallback time.
   */
  function sendEvent(payload) {
    if (isGoogleTagManagerLoaded) {
      window.dataLayer.push({
        event: payload.category || 'Page Interaction',
        action: payload.action,
        label: payload.label || '',
        eventCallback: payload.callback,
        eventTimeout: payload.timeout || 500,
      });
    } else if (payload.callback && typeof payload.callback === 'function') {
      // eslint-disable-next-line callback-return
      payload.callback();
    }
  }

  // Attach public events.
  const eventObserver = new EventObserver();
  this.addEventListener = eventObserver.addEventListener;
  this.removeEventListener = eventObserver.removeEventListener;
  this.dispatchEvent = eventObserver.dispatchEvent;

  this.init = init;
  this.sendEvent = sendEvent;

  return this;
}

export { Analytics };
