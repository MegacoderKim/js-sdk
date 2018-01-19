import {Component, Input, OnInit} from '@angular/core';
import {IAnalyticsItemService} from "../interfaces/analytics-item";

@Component({
  selector: 'ht-stops-heatmap',
  templateUrl: './stops-heatmap.component.html',
  styleUrls: ['./stops-heatmap.component.scss']
})
export class StopsHeatmapComponent implements OnInit {
  @Input() service: IAnalyticsItemService;
  constructor() {

  }

  ngOnInit() {
  }

}
