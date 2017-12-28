import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersSummaryChartComponent } from './users-summary-chart.component';
import {UsersSummaryModule} from "../users-summary/users-summary.module";
import {AnalyticsItemLoadModule} from "../analytics-container/analytics-item-load/analytics-item-load.module";

@NgModule({
  imports: [
    CommonModule,
    UsersSummaryModule,
    AnalyticsItemLoadModule
  ],
  declarations: [UsersSummaryChartComponent],
  exports: [UsersSummaryChartComponent]
})
export class UsersSummaryChartModule { }
