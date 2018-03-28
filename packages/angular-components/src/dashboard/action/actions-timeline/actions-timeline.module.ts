import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionsTimelineComponent} from "./actions-timeline.component";
import {InnerSharedModule} from "../../shared/shared.module";
import {UserCardModule} from "../../users/user-card/user-card.module";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
      InnerSharedModule,
    UserCardModule,
    SharedModule
  ],
  declarations: [
      ActionsTimelineComponent
  ],
  exports: [
      ActionsTimelineComponent
  ]
})
export class ActionsTimelineModule { }
