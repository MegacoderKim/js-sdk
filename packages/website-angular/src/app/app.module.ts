import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {mainBoot} from './main-boot';
import {ServicesModule} from "./services/services.module";
import {HttpModule} from "@angular/http";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/skip';
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
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";

var smoothscroll = require("smoothscroll-polyfill");
smoothscroll.polyfill();

let $ = require('jquery');
if (window) window['$'] = $;
if (global) global['jQuery'] = require('jquery');

mainBoot();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule,
    HttpModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
