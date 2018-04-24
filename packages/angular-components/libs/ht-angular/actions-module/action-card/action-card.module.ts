import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionCardComponent } from './action-card.component';
import {SharedModule} from "../../shared/shared.module";
import {ActionDotModule} from "../action-dot/action-dot.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ActionDotModule
  ],
  declarations: [ActionCardComponent],
  exports: [ActionCardComponent]
})
export class ActionCardModule { }
