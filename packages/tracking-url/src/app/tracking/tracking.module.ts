import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingComponent } from './tracking.component';
import { MapContainerModule } from '../map-container/map-container.module';
import { TrackingService } from './tracking.service';
import {ActionSummaryModule} from "../action-summary/action-summary.module";
import {DestinationPopupModule} from "../destination-popup/destination-popup.module";
import {UserPopupModule} from "../user-popup/user-popup.module";
import {ActionStatusModule} from "../action-status/action-status.module";
import {StartPopupModule} from "../start-popup/start-popup.module";

@NgModule({
  imports: [
    CommonModule,
    MapContainerModule,
    ActionSummaryModule,
    DestinationPopupModule,
    UserPopupModule,
    ActionStatusModule,
    StartPopupModule
  ],
  declarations: [TrackingComponent],
  exports: [TrackingComponent],
  providers: [TrackingService],
})
export class TrackingModule { }
