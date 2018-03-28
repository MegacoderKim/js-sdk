import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeComponent } from './date-range.component';
import {InnerSharedModule} from "../shared/shared.module";
import {DateRangePickerModule, SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    InnerSharedModule,
    DateRangePickerModule,
    SharedModule
  ],
  declarations: [
      DateRangeComponent
  ],
  exports: [
      DateRangeComponent
  ]
})
export class DateRangeModule { }
