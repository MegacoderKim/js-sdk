import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationPopupComponent } from './destination-popup.component';
import {NgxPopperModule} from "../popper/popper.module";

@NgModule({
  imports: [
    CommonModule,
    NgxPopperModule
  ],
  declarations: [DestinationPopupComponent],
  exports: [DestinationPopupComponent]
})
export class DestinationPopupModule { }
