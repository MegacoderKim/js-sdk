import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersAnalyticsListComponent } from './users-analytics-list.component';
import {DateRangeModule} from "../filters/date-range/date-range.module";
import {UserTableModule} from "../user-table/user-table.module";
import {DataTableModule} from "../data-table/data-table.module";

@NgModule({
  imports: [
    CommonModule,
    DateRangeModule,
    UserTableModule,
    DataTableModule,
  ],
  declarations: [UsersAnalyticsListComponent],
  exports: [UsersAnalyticsListComponent]
})
export class UsersAnalyticsListModule { }
