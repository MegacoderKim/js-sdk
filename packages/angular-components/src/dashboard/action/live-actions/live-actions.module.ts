import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveActionsRoutingModule } from './live-actions-routing.module';
import {LiveActionsComponent} from "./live-actions.component";
import { LiveActionComponent } from './live-action/live-action.component';
import {InnerSharedModule} from "../../shared/shared.module";
import {ActionPageModule} from "../action-page/action-page.module";
import {SharedModule, UsersSummaryModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    LiveActionsRoutingModule,
      InnerSharedModule,
    ActionPageModule,
    UsersSummaryModule,
    SharedModule
  ],
  declarations: [
      LiveActionsComponent,
      LiveActionComponent
  ]
})
export class LiveActionsModule { }
