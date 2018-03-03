import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HtMapService} from "../ht/ht-map.service";
import {TrackingMapService} from "./tracking-map.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
const mapResetAssert = require("../../assets/img/reset-map.svg");
@Component({
  selector: 'ht-tracking-map',
  templateUrl: './tracking-map.component.html',
  styleUrls: ['./tracking-map.component.scss']
})
export class TrackingMapComponent implements OnInit {
  mapInstance;
  @Input() showSummary: boolean = false;
  @ViewChild('card') card;
  mapReset;
  constructor(
    private mapService: HtMapService,
    public trackingMapService: TrackingMapService
  ) {
    this.mapInstance = this.mapService.mapInstance;
    // let add = window.devicePixelRatio > 1 ? '@2x' : '';
    // const url = environment.tileUrl ? `${environment.tileUrl}${add}.png?key=${environment.mapKey}` : null;
    // url && this.mapInstance.mapUtils.setDefaultMapOptions({tileLayerUrl: url, tileLayerOptions: {
    //     attribution:
    //       '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //   }});
  }

  get dirty$(): BehaviorSubject<boolean> {
    return this.trackingMapService.dirty$
  }

  get setBoundsOptions() {
    //todo fix this, not passing defaultSetOptions now
    const options = this.showSummary ? {...this.trackingMapService.defaultSetBoundsOptions, paddingBottomRight: [15, 120]} : {...this.trackingMapService.defaultSetBoundsOptions};
    return options
  }

  ngOnInit() {
    setTimeout(() => {

      this.mapReset = mapResetAssert;
    }, 10)
    this.mapInstance.setBoundsOptions = this.setBoundsOptions;
  }

}
