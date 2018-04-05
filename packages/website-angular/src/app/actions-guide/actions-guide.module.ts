import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsGuideComponent } from './actions-guide.component';
import {ActionsGuideRoutingModule} from "./actions-guide-routing.module";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    ActionsGuideRoutingModule,
    SharedModule,
    RouterModule
  ],
  declarations: [ActionsGuideComponent]
})
export class ActionsGuideModule { }
