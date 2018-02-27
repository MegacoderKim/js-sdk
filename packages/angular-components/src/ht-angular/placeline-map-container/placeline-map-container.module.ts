import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlacelineMapContainerComponent} from './placeline-map-container.component';
import {MapContainerModule} from "../map-container/map-container.module";
import {PlacelineContainerModule} from "../placeline-container/placeline-container.module";

@NgModule({
  imports: [
    CommonModule,
    MapContainerModule,
    PlacelineContainerModule
  ],
  declarations: [PlacelineMapContainerComponent],
  exports: [PlacelineMapContainerComponent]
})
export class PlacelineMapContainerModule { }
