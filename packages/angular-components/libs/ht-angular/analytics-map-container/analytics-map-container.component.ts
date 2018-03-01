import {Component, Input, OnInit} from '@angular/core';
// import {IAnalyticsItemService} from "../interfaces/analytics-item";
import {IAnalyticsMapService} from "../interfaces/analytics";

@Component({
  selector: 'ht-analytics-map-container',
  templateUrl: './analytics-map-container.component.html',
  styleUrls: ['./analytics-map-container.component.scss']
})
export class AnalyticsMapContainerComponent implements OnInit {
  @Input() service: IAnalyticsMapService;
  mapOptions = {
    scrollWheelZoom: false
  };
  constructor() {

  }

  ngOnInit() {
  }

}
