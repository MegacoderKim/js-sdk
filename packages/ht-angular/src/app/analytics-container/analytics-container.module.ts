import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsContainerComponent } from './analytics-container.component';
import {ActionsStatusGraphModule} from "../actions-status-graph/actions-status-graph.module";
import {UsersAnalyticsListModule} from "../users-analytics-list/users-analytics-list.module";
import {AnalyticsTestRoutingModule} from "../analytics-test/analytics-test-routing.module";
import { AnalyticsSlotDirective } from './analytics-item/analytics-slot.directive';
import {ActionsStatusGraphComponent} from "../actions-status-graph/actions-status-graph.component";
import {UsersAnalyticsListComponent} from "../users-analytics-list/users-analytics-list.component";
import { AnalyticsItemsService } from './analytics-items.service';
import { AnalyticsItemComponent } from './analytics-item/analytics-item.component';
import { AnalyticsSelectorComponent } from './analytics-selector/analytics-selector.component';
import {UsersSummaryChartModule} from "../users-summary-chart/users-summary-chart.module";
import {UsersSummaryChartComponent} from "../users-summary-chart/users-summary-chart.component";

@NgModule({
  imports: [
    CommonModule,
    AnalyticsTestRoutingModule,
    ActionsStatusGraphModule,
    UsersAnalyticsListModule,
    UsersSummaryChartModule
  ],
  declarations: [
    AnalyticsContainerComponent,
    AnalyticsSlotDirective,
    AnalyticsItemComponent,
    AnalyticsSelectorComponent
  ],
  exports: [
    AnalyticsContainerComponent,
    AnalyticsSlotDirective,
    AnalyticsItemComponent,
    AnalyticsSelectorComponent
  ],
  entryComponents: [
    UsersAnalyticsListComponent,
    ActionsStatusGraphComponent,
    UsersSummaryChartComponent
  ],
  providers: [AnalyticsItemsService]
})
export class AnalyticsContainerModule { }
