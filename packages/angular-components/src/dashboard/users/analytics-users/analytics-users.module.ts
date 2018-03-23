import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsUsersRoutingModule } from './analytics-users-routing.module';
import { AnalyticsUsersComponent } from './analytics-users.component';
import {SharedModule} from "../../shared/shared.module";
import {AreaGraphModule} from "../../shared/graph/area-graph/area-graph.module";
import {DateRangeModule} from "../../date-range/date-range.module";
import {SummaryCardModule} from "./summary-card/summary-card.module";
import {MapContainerModule} from "../../map-container/map-container.module";
import {TimelineUserModule} from "../timeline-user/timeline-user.module";

@NgModule({
  imports: [
    CommonModule,
    AnalyticsUsersRoutingModule,
    SharedModule,
    AreaGraphModule,
    DateRangeModule,
    MapContainerModule,
    SummaryCardModule,
    TimelineUserModule
  ],
  declarations: [
    AnalyticsUsersComponent
  ]
})
export class AnalyticsUsersModule { }
