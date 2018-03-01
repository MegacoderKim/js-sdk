import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacelineComponent } from './placeline.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [PlacelineComponent],
  exports: [PlacelineComponent]
})
export class PlacelineModule { }
