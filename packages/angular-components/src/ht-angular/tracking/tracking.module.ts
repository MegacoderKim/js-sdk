import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingComponent } from './tracking.component';
import {ActionSummaryModule} from "../action-summary/action-summary.module";
import {DestinationPopupModule} from "../destination-popup/destination-popup.module";
import {UserPopupModule} from "../user-popup/user-popup.module";
import {ActionStatusModule} from "../action-status/action-status.module";
import {StartPopupModule} from "../start-popup/start-popup.module";
import {TrackingMapModule} from "../tracking-map/tracking-map.module";
import {InfoboxModule} from "../infobox/infobox.module";

@NgModule({
  imports: [
    CommonModule,
    TrackingMapModule,
    ActionSummaryModule,
    DestinationPopupModule,
    UserPopupModule,
    ActionStatusModule,
    StartPopupModule,
    InfoboxModule
  ],
  declarations: [TrackingComponent],
  exports: [TrackingComponent],
})
export class TrackingModule { }
