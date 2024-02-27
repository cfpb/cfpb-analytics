import { jest } from '@jest/globals';

describe('cfpb-analytics', () => {
  let analyticsSendEvent;
  beforeEach(() => {
    /**
     * Mock for window.dataLayer.push.
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

    return import('./cfpb-analytics.js').then((module) => {
      analyticsSendEvent = module.analyticsSendEvent;
      jest.resetModules();
    });
  });

  describe('.analyticsSendEvent()', () => {
    it('should properly add objects to the dataLayer array', async () => {
      let UNDEFINED;
      const payload = {
        event: 'Page Interaction',
        action: 'inbox:clicked',
        label: 'text:null',
        eventCallback: UNDEFINED,
        eventTimeout: 500,
      };

      window.dataLayer.push({
        'gtm.start': true,
        'gtm.uniqueEventId': true,
      });
      await analyticsSendEvent(payload);
      expect(window.dataLayer.length).toEqual(2);
      expect(window.dataLayer[1]).toStrictEqual(payload);
    });

    it("shouldn't add objects to the dataLayer array if GTM is undefined", async () => {
      const payload = {
        action: 'inbox:clicked',
        label: 'text:null',
        eventCallback: () => {},
      };
      delete window['dataLayer'];
      await analyticsSendEvent(payload);
      expect(window.dataLayer.length).toEqual(0);
    });

    it('should invoke the callback when GTM is loaded', async () => {
      const payload = {
        action: 'inbox:clicked',
        label: 'text:null',
        eventCallback: jest.fn(),
      };
      const callbackSpy = jest.spyOn(payload, 'eventCallback');
      window.dataLayer.push({
        'gtm.start': true,
        'gtm.uniqueEventId': true,
      });
      await analyticsSendEvent(payload);
      expect(callbackSpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke the callback when GTM is not loaded', async () => {
      const payload = {
        action: 'inbox:clicked',
        label: 'text:null',
        eventCallback: jest.fn(),
      };
      const callbackSpy = jest.spyOn(payload, 'eventCallback');
      delete window['dataLayer'];
      await analyticsSendEvent(payload);
      expect(callbackSpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke the callback when GTM is loaded externally', () => {
      const payload = {
        action: 'inbox:clicked',
        label: 'text:null',
        eventCallback: jest.fn(),
      };
      const callbackSpy = jest.spyOn(payload, 'eventCallback');
      delete window['dataLayer'];
      analyticsSendEvent(payload).then(async () => {
        window['dataLayer'] = [];
        window.dataLayer.push({
          'gtm.start': true,
          'gtm.uniqueEventId': true,
        });
        await analyticsSendEvent(payload);
        expect(callbackSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
