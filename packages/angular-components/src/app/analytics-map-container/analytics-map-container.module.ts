import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsMapContainerComponent } from './analytics-map-container.component';
import {MapModule} from "../map/map.module";

@NgModule({
  imports: [
    CommonModule,
    MapModule
  ],
  declarations: [AnalyticsMapContainerComponent],
  exports: [AnalyticsMapContainerComponent]
})
export class AnalyticsMapContainerModule { }
