import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsTestRoutingModule } from './analytics-test-routing.module';
import { AnalyticsTestComponent } from './analytics-test.component';
import {ActionsStatusGraphModule} from "../actions-status-graph/actions-status-graph.module";
import {UsersAnalyticsListModule} from "../users-analytics-list/users-analytics-list.module";

@NgModule({
  imports: [
    CommonModule,
    AnalyticsTestRoutingModule,
    ActionsStatusGraphModule,
    UsersAnalyticsListModule
  ],
  declarations: [AnalyticsTestComponent]
})
export class AnalyticsTestModule { }
