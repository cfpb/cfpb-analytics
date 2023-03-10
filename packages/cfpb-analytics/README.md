# Analytics support for consumerfinance.gov sites.

To use the analytics utilities, import the module, create an instance, initialize it, and send events:

```js
import {
  Analytics
} from '@cfpb/cfpb-analytics';
const analytics = new Analytics();
analytics.init()
analytics.sendEvent({
  category: 'test category',
  action: 'test action',
  label: 'test label'
})
```

