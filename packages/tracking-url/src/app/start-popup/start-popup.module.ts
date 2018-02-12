import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPopupComponent } from './start-popup.component';
import {SharedModule} from "ht-angular";
import {PopperModule} from "../popper/popper.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PopperModule
  ],
  declarations: [StartPopupComponent],
  exports: [StartPopupComponent]
})
export class StartPopupModule { }
