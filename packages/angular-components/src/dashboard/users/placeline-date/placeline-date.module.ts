import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacelineDateComponent } from './placeline-date.component';
import {SharedModule} from "../../shared/shared.module";
import {DateRangePickerModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DateRangePickerModule
  ],
  declarations: [PlacelineDateComponent],
  exports: [PlacelineDateComponent],
})
export class PlacelineDateModule { }
