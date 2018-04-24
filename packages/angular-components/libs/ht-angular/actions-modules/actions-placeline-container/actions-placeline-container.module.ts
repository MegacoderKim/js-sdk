import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsPlacelineContainerComponent } from './actions-placeline-container.component';
import {SharedModule} from "../../shared/shared.module";
import {PlacelineModule} from "../../placeline/placeline.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlacelineModule
  ],
  declarations: [ActionsPlacelineContainerComponent],
  exports: [ActionsPlacelineContainerComponent]
})
export class ActionsPlacelineContainerModule { }
