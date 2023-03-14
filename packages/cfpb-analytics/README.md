# Analytics support for consumerfinance.gov sites.

To use the analytics utilities, import the module, create an instance, initialize it, and send events:

```js
import {
  analyticsSendEvent
} from '@cfpb/cfpb-analytics';
analyticsSendEvent({
  category: 'test category',
  action: 'test action',
  label: 'test label'
})
```

