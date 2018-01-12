import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsTagsComponent } from './analytics-tags.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AnalyticsTagsComponent],
  exports: [
    AnalyticsTagsComponent
  ]
})
export class AnalyticsTagsModule { }
