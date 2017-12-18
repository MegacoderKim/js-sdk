import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsStatusGraphComponent } from './actions-status-graph.component';
import {DateRangeModule} from "../filters/date-range/date-range.module";

@NgModule({
  imports: [
    CommonModule,
    DateRangeModule
  ],
  declarations: [ActionsStatusGraphComponent],
  exports: [ActionsStatusGraphComponent]
})
export class ActionsStatusGraphModule { }
