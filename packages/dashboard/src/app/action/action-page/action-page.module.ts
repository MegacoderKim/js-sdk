import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ActionPageRoutingModule} from './action-page-routing.module';
import {ActionPageComponent} from './action-page.component';
import {SharedModule} from "../../shared/shared.module";
import {ActionDetailModule} from "../action-detail/action-detail.module";
import {UserCardModule} from "../../users/user-card/user-card.module";
import {MapSwitchModule} from "../../map-container/map-switch/map-switch.module";
import {ActionInfoComponent} from '../action-info/action-info.component';
import {PlacelineModule} from "ht-angular";
import {UserDeviceModule} from "../../user-device/user-device.module";

@NgModule({
  imports: [
    CommonModule,
    ActionPageRoutingModule,
    SharedModule,
    UserCardModule,
    ActionDetailModule,
    MapSwitchModule,
    PlacelineModule,
    UserDeviceModule
  ],
  declarations: [
    ActionPageComponent,
    ActionInfoComponent
  ],
  exports: [
    ActionPageComponent,
    ActionInfoComponent
  ]
})
export class ActionPageModule { }
