import { Component, OnInit } from '@angular/core';
import { MapService } from '../core/map-service';
import { mapTypeService } from 'ht-maps';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit {
  mapInstance;
  constructor(
    private mapService: MapService
  ) {
    this.mapInstance = this.mapService.mapInstance;
    console.log(this.mapInstance)
   }

  ngOnInit() {
  }

}
