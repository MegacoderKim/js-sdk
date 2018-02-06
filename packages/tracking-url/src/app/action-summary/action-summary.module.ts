import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionSummaryComponent } from './action-summary.component';
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ActionSummaryComponent],
  declarations: [ActionSummaryComponent]
})
export class ActionSummaryModule { }
