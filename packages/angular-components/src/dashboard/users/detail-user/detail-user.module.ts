import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailUserRoutingModule } from './detail-user-routing.module';
import {DetailUserComponent} from "./detail-user.component";

@NgModule({
  imports: [
    CommonModule,
    DetailUserRoutingModule
  ],
  declarations: [
    DetailUserComponent
  ]
})
export class DetailUserModule { }
