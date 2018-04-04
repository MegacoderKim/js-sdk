import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnalyticsActionsRoutingModule} from './analytics-actions-routing.module';
import {AnalyticsActionsComponent} from "./analytics-actions.component";
import {InnerSharedModule} from "../../shared/shared.module";
import {ActionPageModule} from "../action-page/action-page.module";
import {MapContainerModule} from "../../map-container/map-container.module";
import {DateRangeModule} from "../../date-range/date-range.module";
import {ActionZeroStateComponent} from './action-zero-state/action-zero-state.component';
import {BillingFormModule} from "../../settings/billing-form/billing-form.module";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    InnerSharedModule,
    AnalyticsActionsRoutingModule,
      ActionPageModule,
      MapContainerModule,
      DateRangeModule,
    BillingFormModule,
    SharedModule
  ],
  declarations: [
    AnalyticsActionsComponent,
    ActionZeroStateComponent
  ]
})
export class AnalyticsActionsModule { }
