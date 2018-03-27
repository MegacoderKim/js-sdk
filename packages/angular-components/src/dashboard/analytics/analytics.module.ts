import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsContainerModule } from  "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    AnalyticsContainerModule
    // PlacelineModule
  ],
  declarations: [AnalyticsComponent]
})
export class AnalyticsModule { }
