import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationPopupComponent } from './destination-popup.component';
import {PopperModule} from "../popper/popper.module";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    PopperModule,
    SharedModule
  ],
  declarations: [DestinationPopupComponent],
  exports: [DestinationPopupComponent]
})
export class DestinationPopupModule { }
