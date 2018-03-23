import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionsTimelineComponent} from "./actions-timeline.component";
import {SharedModule} from "../../shared/shared.module";
import {UserCardModule} from "../../users/user-card/user-card.module";

@NgModule({
  imports: [
    CommonModule,
      SharedModule,
    UserCardModule
  ],
  declarations: [
      ActionsTimelineComponent
  ],
  exports: [
      ActionsTimelineComponent
  ]
})
export class ActionsTimelineModule { }
