import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsSummaryChartComponent } from './actions-summary-chart.component';
import {AnalyticsItemLoadModule} from "../analytics-container/analytics-item-load/analytics-item-load.module";
import {UsersSummaryModule} from "../users-summary/users-summary.module";

@NgModule({
  imports: [
    CommonModule,
    UsersSummaryModule,
    AnalyticsItemLoadModule
  ],
  declarations: [ActionsSummaryChartComponent],
  exports: [ActionsSummaryChartComponent]
})
export class ActionsSummaryChartModule { }
