import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HtModule} from "ht-angular-client";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {MapModule} from "./map/map.module";
import {SharedModule} from "./shared/shared.module";
import {UserCardModule} from "./user-card/user-card.module";
import {PlacelineModule} from "./placeline/placeline.module";

require('leaflet');

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/empty';
import {UsersModule} from "./users/users.module";
import {UsersContainerModule} from "./users-container/users-container.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HtModule.forRoot({token: 'sk_55fc65eb64c0b10300c54ff79ea3f6ef22981793', mapType: 'google'}),
    MapModule,
    SharedModule,
    UsersContainerModule,
    UserCardModule,
    PlacelineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
