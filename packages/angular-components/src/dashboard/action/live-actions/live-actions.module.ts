import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveActionsRoutingModule } from './live-actions-routing.module';
import {LiveActionsComponent} from "./live-actions.component";
import { LiveActionComponent } from './live-action/live-action.component';
import {SharedModule} from "../../shared/shared.module";
import {ActionPageModule} from "../action-page/action-page.module";
import {UsersSummaryModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    LiveActionsRoutingModule,
      SharedModule,
    ActionPageModule,
    UsersSummaryModule
  ],
  declarations: [
      LiveActionsComponent,
      LiveActionComponent
  ]
})
export class LiveActionsModule { }
