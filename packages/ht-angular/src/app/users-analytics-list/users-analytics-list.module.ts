import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersAnalyticsListComponent } from './users-analytics-list.component';
import {DateRangeModule} from "../filters/date-range/date-range.module";

@NgModule({
  imports: [
    CommonModule,
    DateRangeModule,
  ],
  declarations: [UsersAnalyticsListComponent],
  exports: [UsersAnalyticsListComponent]
})
export class UsersAnalyticsListModule { }
