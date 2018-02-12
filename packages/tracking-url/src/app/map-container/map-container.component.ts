import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MapService } from '../core/map-service';
import { mapTypeService } from 'ht-maps';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapContainerComponent implements OnInit {
  mapInstance;
  @Input() setBoundsOptions = {
    paddingTopLeft: [15, 15],
    paddingBottomRight: [15, 70],
    duration: 2,
    animate: true,
    easeLinearity: 0.2,
    // easeLinearity: 0.58,
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

  resetMap() {

  }

  ngOnInit() {
    this.mapInstance.setBoundsOptions = this.setBoundsOptions;
  }

}
