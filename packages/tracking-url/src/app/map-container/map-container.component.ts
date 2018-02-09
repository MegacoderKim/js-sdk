import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { MapService } from '../core/map-service';
import { mapTypeService } from 'ht-maps';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit {
  mapInstance;
  @Input() setBoundsOptions = {
    paddingTopLeft: [10, 10],
    paddingBottomRight: [10, 50]
  };
  @ViewChild('card') card;
  constructor(
    private mapService: MapService
  ) {
    this.mapInstance = this.mapService.mapInstance;
    let add = window.devicePixelRatio > 1 ? '@2x' : '';
    const url = environment.tileUrl ? `${environment.tileUrl}${add}.png?key=${environment.mapKey}` : null;
    url && this.mapInstance.mapUtils.setDefaultMapOptions({tileLayerUrl: url, tileLayerOptions: {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }});
   }

  ngOnInit() {
    this.mapInstance.setBoundsOptions = this.setBoundsOptions;
  }

}
