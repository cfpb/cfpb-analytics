# Analytics support for consumerfinance.gov sites.

To use the analytics utility, import the `analyticsSendEvent` method and send events:

```js
import { analyticsSendEvent } from '@cfpb/cfpb-analytics';
analyticsSendEvent({
  event: 'test event',
  action: 'test action',
  label: 'test label',
});
```
