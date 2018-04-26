import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserCardModule} from "../users-modules/user-card/user-card.module";
import { PlacelineComponent } from './placeline.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserCardModule
  ],
  declarations: [PlacelineComponent],
  exports: [PlacelineComponent]
})
export class PlacelineModule { }
