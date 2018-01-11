import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IAnalyticsItemService} from "../interfaces/analytics-item";

@Component({
  selector: 'ht-actions-summary-chart',
  templateUrl: './actions-summary-chart.component.html',
  styleUrls: ['./actions-summary-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsSummaryChartComponent implements OnInit {
  @Input() service;
  constructor() { }

  ngOnInit() {
  }

}
