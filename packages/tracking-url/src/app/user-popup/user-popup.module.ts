import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPopupComponent } from './user-popup.component';
import {NgxPopperModule} from "../popper/popper.module";

@NgModule({
  imports: [
    CommonModule,
    NgxPopperModule
  ],
  declarations: [UserPopupComponent],
  exports: [UserPopupComponent]
})
export class UserPopupModule { }