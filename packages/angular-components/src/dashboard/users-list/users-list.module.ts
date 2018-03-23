import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list.component';
import {HtModule, UsersContainerModule} from "ht-angular";
import {config} from "../config";

@NgModule({
  imports: [
    CommonModule,
    UsersListRoutingModule,
    UsersContainerModule,
    HtModule.forRoot({token: config.token, mapType: 'leaflet'})
  ],
  declarations: [UsersListComponent]
})
export class UsersListModule { }
