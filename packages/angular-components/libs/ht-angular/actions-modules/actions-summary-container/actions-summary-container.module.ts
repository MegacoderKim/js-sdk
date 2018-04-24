import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsSummaryContainerComponent } from './actions-summary-container.component';
import {UsersSummaryModule} from "../../users-summary/users-summary.module";

@NgModule({
  imports: [
    CommonModule,
    UsersSummaryModule
  ],
  declarations: [ActionsSummaryContainerComponent],
  exports: [ActionsSummaryContainerComponent]
})
export class ActionsSummaryContainerModule { }
