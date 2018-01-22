import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IAnalyticsService} from "../interfaces/analytics";
import {ActionsSummaryService} from "./actions-summary.service";

@Component({
  selector: 'ht-actions-summary-chart',
  templateUrl: './actions-summary-chart.component.html',
  styleUrls: ['./actions-summary-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsSummaryChartComponent implements OnInit {
  @Input() service: ActionsSummaryService;
  constructor() { }

  ngOnInit() {
  }

}
