import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerAsCustomElements } from '@angular/elements';

import { AppModule } from './elements-module/elements.module';

const customElements = [];
registerAsCustomElements(customElements, () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
})
  .then(() => { }, () => { });
