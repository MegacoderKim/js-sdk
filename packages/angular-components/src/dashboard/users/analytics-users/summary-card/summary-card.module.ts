import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryCardComponent } from './summary-card.component';
import {InnerSharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    InnerSharedModule
  ],
  declarations: [
    SummaryCardComponent
  ],
  exports: [
    SummaryCardComponent
  ]
})
export class SummaryCardModule { }
