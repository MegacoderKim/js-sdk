import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineUserRoutingModule } from './timeline-user-routing.module';
import {TimelineUserComponent} from "./timeline-user.component";
import {InnerSharedModule} from "../../shared/shared.module";
import {ActionDetailModule} from "../../action/action-detail/action-detail.module";
import {UserCardModule} from "../user-card/user-card.module";
import {MapSwitchModule} from "../../map-container/map-switch/map-switch.module";
import {PlacelineModule, SharedModule} from "ht-angular";
import {PlacelineDateModule} from "../placeline-date/placeline-date.module";
import {UserDeviceModule} from "../../user-device/user-device.module";

@NgModule({
  imports: [
    CommonModule,
      InnerSharedModule,
    SharedModule,
    TimelineUserRoutingModule,
      ActionDetailModule,
      UserCardModule,
      MapSwitchModule,
    PlacelineModule,
    PlacelineDateModule,
    UserDeviceModule
  ],
  declarations: [
    TimelineUserComponent
  ],
  exports: [
      TimelineUserComponent
  ]
})
export class TimelineUserModule { }
