import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule} from './app-routing.module';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HtModule} from "ht-angular";
import { environment } from '../environments/environment';

// import * as Hammer from 'hammerjs';
// import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
// export class MyHammerConfig extends HammerGestureConfig  {
//   overrides = <any>{
//     // override hammerjs default configuration
//     'swipe': { direction: Hammer.DIRECTION_ALL  }
//   }
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HtModule.forRoot({
      token: 'pk_fe8200189bbdfd44b078bd462b08cb86174aa97c',
      mapType: 'leaflet',
      baseUrl: environment.baseUrl
    })
  ],
  // providers: [ {
  //   provide: HAMMER_GESTURE_CONFIG,
  //   useClass: MyHammerConfig
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }
