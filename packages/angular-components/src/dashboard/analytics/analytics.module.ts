import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsContainerModule, HtModule } from  "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    HtModule.forRoot({token: 'sk_55fc65eb64c0b10300c54ff79ea3f6ef22981793', mapType: 'leaflet'}),
    AnalyticsContainerModule
    // PlacelineModule
  ],
  declarations: [AnalyticsComponent]
})
export class AnalyticsModule { }
