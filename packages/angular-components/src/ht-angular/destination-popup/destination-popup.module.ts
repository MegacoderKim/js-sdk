import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationPopupComponent } from './destination-popup.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [DestinationPopupComponent],
  exports: [DestinationPopupComponent]
})
export class DestinationPopupModule { }
