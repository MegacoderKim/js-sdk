import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingMapComponent } from './tracking-map.component';
import {MapModule} from "../map/map.module";
import { TrackingMapService } from './tracking-map.service';

@NgModule({
  imports: [
    CommonModule,
    MapModule
  ],
  declarations: [TrackingMapComponent],
  exports: [TrackingMapComponent],
  providers: [TrackingMapService]
})
export class TrackingMapModule { }
