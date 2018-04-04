import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActionDetailComponent} from "./action-detail.component";
import {InnerSharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {ActionsTimelineModule} from "../actions-timeline/actions-timeline.module";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
      InnerSharedModule,
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
