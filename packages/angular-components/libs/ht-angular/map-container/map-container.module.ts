import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapContainerComponent } from './map-container.component';
import {MapModule} from "../map/map.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    MapModule,
    SharedModule
  ],
  declarations: [MapContainerComponent],
  exports: [MapContainerComponent]
})
export class MapContainerModule { }
