import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingComponent } from './tracking.component';
import { MapModule } from 'ht-angular';
import { MapContainerModule } from '../map-container/map-container.module';
import { TrackingService } from './tracking.service';

@NgModule({
  imports: [
    CommonModule,
    TrackingRoutingModule,
    MapContainerModule
  ],
  declarations: [TrackingComponent],
  exports: [TrackingComponent],
  providers: [TrackingService]
})
export class TrackingModule { }
