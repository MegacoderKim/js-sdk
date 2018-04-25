import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsCardsContainerComponent } from './actions-cards-container.component';
import {ActionCardModule} from "../action-card/action-card.module";
import {CollapsableModule} from "../../common/collapsable/collapsable.module";
import {ActionDetailsModule} from "../action-details/action-details.module";

@NgModule({
  imports: [
    CommonModule,
    ActionCardModule,
    CollapsableModule,
    ActionDetailsModule
  ],
  declarations: [ActionsCardsContainerComponent],
  exports: [ActionsCardsContainerComponent]
})
export class ActionsCardsContainerModule { }
