import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPopupComponent } from './user-popup.component';
import {PopperModule} from "../popper/popper.module";

@NgModule({
  imports: [
    CommonModule,
    PopperModule
  ],
  declarations: [UserPopupComponent],
  exports: [UserPopupComponent]
})
export class UserPopupModule { }
