import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingContainerRoutingModule } from './tracking-container-routing.module';
import { TrackingContainerComponent } from './tracking-container.component';
import {TrackingModule} from "../tracking/tracking.module";

@NgModule({
  imports: [
    CommonModule,
    TrackingContainerRoutingModule,
    TrackingModule
  ],
  declarations: [TrackingContainerComponent]
})
export class TrackingContainerModule { }
