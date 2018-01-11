import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersSummaryChartComponent } from './users-summary-chart.component';
import {UsersSummaryModule} from "../users-summary/users-summary.module";

@NgModule({
  imports: [
    CommonModule,
    UsersSummaryModule,
  ],
  declarations: [UsersSummaryChartComponent],
  exports: [UsersSummaryChartComponent]
})
export class UsersSummaryChartModule { }
