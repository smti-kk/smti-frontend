import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'leaflet-spin';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';


try {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // eslint-disable-next-line global-require
  require('leaflet-spin/example/spin/dist/spin');
} catch (ignore) {
  //
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
