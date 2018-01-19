import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopsHeatmapComponent } from './stops-heatmap.component';
import {MapModule} from "../map/map.module";

@NgModule({
  imports: [
    CommonModule,
    MapModule
  ],
  declarations: [StopsHeatmapComponent],
  exports: [StopsHeatmapComponent]
})
export class StopsHeatmapModule { }
