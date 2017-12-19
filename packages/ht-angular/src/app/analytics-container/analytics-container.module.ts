import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsContainerComponent } from './analytics-container.component';
import {ActionsStatusGraphModule} from "../actions-status-graph/actions-status-graph.module";
import {UsersAnalyticsListModule} from "../users-analytics-list/users-analytics-list.module";
import {AnalyticsTestRoutingModule} from "../analytics-test/analytics-test-routing.module";

@NgModule({
  imports: [
    CommonModule,
    AnalyticsTestRoutingModule,
    ActionsStatusGraphModule,
    UsersAnalyticsListModule
  ],
  declarations: [AnalyticsContainerComponent],
  exports: [AnalyticsContainerComponent]
})
export class AnalyticsContainerModule { }
