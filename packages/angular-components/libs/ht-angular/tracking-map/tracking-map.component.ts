import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HtMapService} from "../ht/ht-map.service";
import {TrackingMapService} from "./tracking-map.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
@Component({
  selector: 'ht-tracking-map',
  templateUrl: './tracking-map.component.html',
  styleUrls: ['./tracking-map.component.scss']
})
export class TrackingMapComponent implements OnInit {
  mapInstance;
  @Input() showSummary: boolean = false;
  @ViewChild('card') card;
  constructor(
    private mapService: HtMapService,
    public trackingMapService: TrackingMapService
  ) {
    this.mapInstance = this.mapService.mapInstance;
  }

  get dirty$(): BehaviorSubject<boolean> {
    return this.trackingMapService.dirty$
  }

  get setBoundsOptions() {
    const options = this.showSummary ?
      {...this.trackingMapService.defaultSetBoundsOptions, ...this.trackingMapService.summarySetBoundsOptions} :
      {...this.trackingMapService.defaultSetBoundsOptions};
    return options
  }

  ngOnInit() {
    this.mapInstance.setBoundsOptions = this.setBoundsOptions;
  }

}
