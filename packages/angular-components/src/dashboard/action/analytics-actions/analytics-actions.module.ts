import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnalyticsActionsRoutingModule} from './analytics-actions-routing.module';
import {AnalyticsActionsComponent} from "./analytics-actions.component";
import {SharedModule} from "../../shared/shared.module";
import {AreaGraphModule} from "../../shared/graph/area-graph/area-graph.module";
import {ActionPageModule} from "../action-page/action-page.module";
import {MapContainerModule} from "../../map-container/map-container.module";
import {DateRangeModule} from "../../date-range/date-range.module";
import {ActionZeroStateComponent} from './action-zero-state/action-zero-state.component';
import {BillingFormModule} from "../../settings/billing-form/billing-form.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AreaGraphModule,
    AnalyticsActionsRoutingModule,
      ActionPageModule,
      MapContainerModule,
      DateRangeModule,
    BillingFormModule
  ],
  declarations: [
    AnalyticsActionsComponent,
    ActionZeroStateComponent
  ]
})
export class AnalyticsActionsModule { }
