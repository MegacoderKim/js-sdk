import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsPageRoutingModule } from './actions-page-routing.module';
import {ActionsPageComponent} from "./actions-page.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ActionsPageRoutingModule,
    SharedModule
  ],
  declarations: [
    ActionsPageComponent
  ]
})
export class ActionsPageModule { }
