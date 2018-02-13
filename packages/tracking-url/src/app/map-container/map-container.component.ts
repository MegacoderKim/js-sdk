import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
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
  defaultSetBoundsOptions = {
    paddingTopLeft: [15, 15],
    paddingBottomRight: [15, 70],
    duration: 2,
    animate: true,
    easeLinearity: 0.2,
    // easeLinearity: 0.58,
  };
  @Input() showSummary: boolean = false;
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

  get setBoundsOptions() {
    //todo fix this, not passing defaultSetOptions now
    const options = this.showSummary ? {...this.defaultSetBoundsOptions, paddingBottomRight: [15, 120]} : {...this.defaultSetBoundsOptions};
    return options
  }

  ngOnInit() {
    this.mapInstance.setBoundsOptions = this.setBoundsOptions;
  }

}
