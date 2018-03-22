import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeComponent } from './date-range.component';
import {SharedModule} from "../shared/shared.module";
import {DateRangePickerModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DateRangePickerModule
  ],
  declarations: [
      DateRangeComponent
  ],
  exports: [
      DateRangeComponent
  ]
})
export class DateRangeModule { }
