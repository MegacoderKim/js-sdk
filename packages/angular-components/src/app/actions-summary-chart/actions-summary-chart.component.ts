import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IAnalyticsService} from "../interfaces/analytics";

@Component({
  selector: 'ht-actions-summary-chart',
  templateUrl: './actions-summary-chart.component.html',
  styleUrls: ['./actions-summary-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsSummaryChartComponent implements OnInit {
  @Input() service: IAnalyticsService;
  constructor() { }

  ngOnInit() {
  }

}
