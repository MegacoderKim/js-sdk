import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {CoreServiceModule} from "./core/core.module";
import {AuthInterceptor} from "./default-header.service";
import {mainBoot} from "./main-boot";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/expand';
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HtModule} from "ht-angular";
import {GetToken} from "../utils/get-token";
import {config} from "./config";

// import * as L from "leaflet";
// import {mapTypeService} from "ht-maps";
// require('leaflet');
// require('mapzen.js');
// require('mapbox.js');
// import 'mapzen.js';
// require('leaflet.markercluster');
// require('leaflet.heat');
// require('leaflet.vectorgrid');
// require('vector-tile');
// require('pbf');
var $ = require('jquery');
if(window) window['$'] = $;
if(global) global['jQuery'] = require('jquery');
// import * as $ from "jquery"
// import * as jQuery from "jquery"
// require('bootstrap');
require('smoothscroll-polyfill').polyfill();
import "leaflet";
import "leaflet.heat";
import "leaflet.markercluster";

mainBoot();
// mapTypeService.getInstance('leaflet');
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreServiceModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
