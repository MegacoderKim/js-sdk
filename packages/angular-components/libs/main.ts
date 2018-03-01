import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerAsCustomElements } from './@angular/elements';

import { AppModule, customElements } from './elements-module/elements.module';

registerAsCustomElements(customElements, () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
})
  .then(() => { }, () => { });
