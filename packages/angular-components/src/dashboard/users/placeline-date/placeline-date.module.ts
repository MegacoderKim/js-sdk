import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacelineDateComponent } from './placeline-date.component';
import {InnerSharedModule} from "../../shared/shared.module";
import {DateRangePickerModule, SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    InnerSharedModule,
    SharedModule,
    DateRangePickerModule
  ],
  declarations: [PlacelineDateComponent],
  exports: [PlacelineDateComponent],
})
export class PlacelineDateModule { }
