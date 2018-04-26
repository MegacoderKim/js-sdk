import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsCardsContainerComponent } from './actions-cards-container.component';
import {ActionCardModule} from "../action-card/action-card.module";

@NgModule({
  imports: [
    CommonModule,
    ActionCardModule,
  ],
  declarations: [ActionsCardsContainerComponent],
  exports: [ActionsCardsContainerComponent]
})
export class ActionsCardsContainerModule { }
