import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsTestComponent } from './analytics-test.component';
import {AnalyticsContainerModule} from "../analytics-container/analytics-container.module";
import {AnalyticsTestRoutingModule} from "./analytics-test-routing.module";

@NgModule({
  imports: [
    CommonModule,
    AnalyticsContainerModule,
    AnalyticsTestRoutingModule
  ],
  declarations: [AnalyticsTestComponent]
})
export class AnalyticsTestModule { }
