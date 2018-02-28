import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPopupComponent } from './user-popup.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [UserPopupComponent],
  exports: [UserPopupComponent]
})
export class UserPopupModule { }
