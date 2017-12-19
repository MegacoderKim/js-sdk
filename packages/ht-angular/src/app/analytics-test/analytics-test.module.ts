import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsTestComponent } from './analytics-test.component';
import {AnalyticsContainerModule} from "../analytics-container/analytics-container.module";

@NgModule({
  imports: [
    CommonModule,
    AnalyticsContainerModule
  ],
  declarations: [AnalyticsTestComponent]
})
export class AnalyticsTestModule { }
