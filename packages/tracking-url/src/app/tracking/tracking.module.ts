import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingComponent } from './tracking.component';
import { MapContainerModule } from '../map-container/map-container.module';
import { TrackingService } from './tracking.service';
import {ActionSummaryComponent} from "../action-summary/action-summary.component";
import {ActionSummaryModule} from "../action-summary/action-summary.module";

@NgModule({
  imports: [
    CommonModule,
    MapContainerModule,
    ActionSummaryModule,
  ],
  declarations: [TrackingComponent],
  exports: [TrackingComponent],
  providers: [TrackingService],
})
export class TrackingModule { }
