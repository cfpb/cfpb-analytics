import { jest } from '@jest/globals';
import {
  Analytics,
} from './Analytics.js';

let analytics;

describe('cfpb-analytics', () => {
  beforeEach(() => {
    /**
     * Mock for window.dataLayer.push.
     *
     * @param {*} object - What to push onto the window.dataLayer.
     * @returns {Array} New pushed array items.
     */
    function push(object) {
      if (
        {}.hasOwnProperty.call(object, 'eventCallback') &&
        typeof object.eventCallback === 'function'
      ) {
        return object.eventCallback();
      }
      return [].push.call(this, object);
    }

    window.dataLayer = [];
    window.dataLayer.push = push;
    delete window['google_tag_manager'];

    analytics = new Analytics();
  });

  describe('.init()', () => {
    it('should have a proper state after initialization', () => {
      expect(window['google_tag_manager']).toBeUndefined();
      window['google_tag_manager'] = {};
      analytics.init();
      expect(typeof window['google_tag_manager'] === 'object').toBe(true);
    });

    it('should properly set the google_tag_manager object', () => {
      const mockGTMObject = { testing: true };
      analytics.init();
      expect(window['google_tag_manager']).toBeUndefined();
      window['google_tag_manager'] = mockGTMObject;
      analytics.addEventListener('gtmloaded', ()=>{
        expect(window['google_tag_manager']).toStrictEqual(mockGTMObject);
      })
    });
  });

  describe('.sendEvent()', () => {
    it('should properly add objects to the dataLayer Array', () => {
      const payload = {
        action: 'inbox:clicked',
        label: 'text:null'
      }
      let UNDEFINED;
      const dataLayerOptions = {
        event: 'Page Interaction',
        eventCallback: UNDEFINED,
        action: '',
        label: '',
        eventTimeout: 500,
      };
      const options = { ...dataLayerOptions, ...payload };
      window['google_tag_manager'] = {};
      analytics.init();
      analytics.sendEvent(payload);
      expect(window.dataLayer.length).toEqual(1);
      expect(window.dataLayer[0]).toStrictEqual(options);
    });

    it("shouldn't add objects to the dataLayer Array if GTM is undefined", () => {
      const payload = {
        action: 'inbox:clicked',
        label: 'text:null',
        callback: ()=>{}
      }
      delete window['google_tag_manager'];
      analytics.init();
      analytics.sendEvent(payload);
      expect(window.dataLayer.length).toEqual(0);
    });

    it('should invoke the callback if provided', () => {
      analytics.init();
      const payload = {
        action: 'inbox:clicked',
        label: 'text:null',
        callback: jest.fn()
      }
      const callbackSpy = jest.spyOn(payload, 'callback');
      window['google_tag_manager'] = {};
      analytics.sendEvent(payload);
      expect(callbackSpy).toHaveBeenCalledTimes(1);

      // Check code branch for when tagManagerIsLoaded is not set.
      delete window['google_tag_manager'];
      analytics.init();
      analytics.sendEvent(payload);
      expect(callbackSpy).toHaveBeenCalledTimes(2);
    });
  });
});
