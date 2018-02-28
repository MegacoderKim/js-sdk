import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPopupComponent } from './user-popup.component';
import {PopperModule} from "../popper/popper.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    PopperModule,
    SharedModule
  ],
  declarations: [UserPopupComponent],
  exports: [UserPopupComponent]
})
export class UserPopupModule { }
