import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionSummaryComponent } from './action-summary.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ActionSummaryComponent],
  declarations: [ActionSummaryComponent]
})
export class ActionSummaryModule { }
