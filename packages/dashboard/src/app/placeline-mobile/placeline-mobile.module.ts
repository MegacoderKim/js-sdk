import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacelineMobileComponent } from './placeline-mobile.component';
import {UserCardModule} from "../users/user-card/user-card.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    UserCardModule,
    SharedModule
  ],
  declarations: [PlacelineMobileComponent],
  exports: [PlacelineMobileComponent]
})
export class PlacelineMobileModule { }
