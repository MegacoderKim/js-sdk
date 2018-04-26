import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CollapsableModule} from "../../common/collapsable/collapsable.module";
import {ActionCardModule} from "../action-card/action-card.module";
import {ActionDetailsModule} from "../action-details/action-details.module";
import { ActionsPlacelineContainerComponent } from './actions-placeline-container.component';
import {SharedModule} from "../../shared/shared.module";
import {PlacelineModule} from "../../placeline/placeline.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlacelineModule,
    ActionCardModule,
    CollapsableModule,
    ActionDetailsModule
  ],
  declarations: [ActionsPlacelineContainerComponent],
  exports: [ActionsPlacelineContainerComponent]
})
export class ActionsPlacelineContainerModule { }
