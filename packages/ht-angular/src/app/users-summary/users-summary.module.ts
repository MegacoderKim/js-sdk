import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersSummaryComponent } from './users-summary.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [UsersSummaryComponent],
  exports: [UsersSummaryComponent]
})
export class UsersSummaryModule { }
