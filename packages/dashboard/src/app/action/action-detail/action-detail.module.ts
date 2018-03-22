import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActionDetailComponent} from "./action-detail.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {ActionsTimelineModule} from "../actions-timeline/actions-timeline.module";

@NgModule({
  imports: [
    CommonModule,
      SharedModule,
      RouterModule,
      ActionsTimelineModule
  ],
  declarations: [
      ActionDetailComponent
  ],
  exports: [
      ActionDetailComponent
  ]
})
export class ActionDetailModule { }
