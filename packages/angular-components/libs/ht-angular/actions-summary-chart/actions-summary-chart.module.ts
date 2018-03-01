import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsSummaryChartComponent } from './actions-summary-chart.component';
import {UsersSummaryModule} from "../users-summary/users-summary.module";

@NgModule({
  imports: [
    CommonModule,
    UsersSummaryModule,
  ],
  declarations: [ActionsSummaryChartComponent],
  exports: [ActionsSummaryChartComponent]
})
export class ActionsSummaryChartModule { }
