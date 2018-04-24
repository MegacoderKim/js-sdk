import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlacelineMapContainerComponent} from './placeline-map-container.component';
import {MapContainerModule} from "../map-container/map-container.module";
import {UsersPlacelineContainerModule} from "../users-modules/users-placeline-container/users-placeline-container.module";

@NgModule({
  imports: [
    CommonModule,
    MapContainerModule,
    UsersPlacelineContainerModule
  ],
  declarations: [PlacelineMapContainerComponent],
  exports: [PlacelineMapContainerComponent]
})
export class PlacelineMapContainerModule { }
