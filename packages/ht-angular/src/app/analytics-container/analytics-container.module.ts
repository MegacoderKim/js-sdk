import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsContainerComponent } from './analytics-container.component';
import {ActionsStatusGraphModule} from "../actions-status-graph/actions-status-graph.module";
import {UsersAnalyticsListModule} from "../users-analytics-list/users-analytics-list.module";
import { AnalyticsSlotDirective } from './analytics-item/analytics-slot.directive';
import {ActionsStatusGraphComponent} from "../actions-status-graph/actions-status-graph.component";
import {UsersAnalyticsListComponent} from "../users-analytics-list/users-analytics-list.component";
import { AnalyticsItemsService } from './analytics-items.service';
import { AnalyticsItemComponent } from './analytics-item/analytics-item.component';
import { AnalyticsSelectorComponent } from './analytics-selector/analytics-selector.component';
import {UsersSummaryChartModule} from "../users-summary-chart/users-summary-chart.module";
import {UsersSummaryChartComponent} from "../users-summary-chart/users-summary-chart.component";
import {AnalyticsTagsModule} from "./analytics-tags/analytics-tags.module";
import {ActionsAnalyticsListModule} from "../actions-analytics-list/actions-analytics-list.module";
import {ActionsAnalyticsListComponent} from "../actions-analytics-list/actions-analytics-list.component";
import {ActionsSummaryChartModule} from "../actions-summary-chart/actions-summary-chart.module";
import {ActionsSummaryChartComponent} from "../actions-summary-chart/actions-summary-chart.component";
import { AnalyticsTitleComponent } from './analytics-title/analytics-title.component';
import {DateRangeModule} from "../filters/date-range/date-range.module";

@NgModule({
  imports: [
    CommonModule,
    ActionsStatusGraphModule,
    UsersAnalyticsListModule,
    UsersSummaryChartModule,
    AnalyticsTagsModule,
    ActionsAnalyticsListModule,
    ActionsSummaryChartModule,
    DateRangeModule
  ],
  declarations: [
    AnalyticsContainerComponent,
    AnalyticsSlotDirective,
    AnalyticsItemComponent,
    AnalyticsSelectorComponent,
    AnalyticsTitleComponent
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
    UsersSummaryChartComponent,
    ActionsAnalyticsListComponent,
    ActionsSummaryChartComponent
  ],
  providers: [AnalyticsItemsService]
})
export class AnalyticsContainerModule { }
