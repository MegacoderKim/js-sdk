import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersSummaryContainerComponent } from './users-summary-container.component';
import {UsersSummaryModule} from "../users-summary/users-summary.module";

@NgModule({
  imports: [
    CommonModule,
    UsersSummaryModule
  ],
  declarations: [UsersSummaryContainerComponent],
  exports: [UsersSummaryContainerComponent]
})
export class UsersSummaryContainerModule { }
