import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapContainerComponent } from './map-container.component';
import { MapModule } from 'ht-angular';

import { MapService , MAP_TYPE} from '../core/map-service';

export function mapServiceFactory(mapType) {
  if (mapType === void 0) { mapType = 'google'; }
  return new MapService(mapType);
}

@NgModule({
  imports: [
    CommonModule,
    MapModule
  ],
  declarations: [MapContainerComponent],
  exports: [MapContainerComponent],
  providers: [
    { provide: MAP_TYPE, useValue: 'leaflet' },
    { provide: MapService, useFactory: mapServiceFactory, deps: [MAP_TYPE] },
  ]
})
export class MapContainerModule { }
