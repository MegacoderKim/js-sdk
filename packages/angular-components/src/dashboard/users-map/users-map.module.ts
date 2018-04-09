import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersMapRoutingModule } from './users-map-routing.module';
import { UsersMapComponent } from './users-map.component';
import {ContainerModule, UsersContainerModule, UsersFilterModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    UsersMapRoutingModule,
    ContainerModule,
    UsersContainerModule,
    UsersFilterModule
  ],
  declarations: [UsersMapComponent]
})
export class UsersMapModule { }
