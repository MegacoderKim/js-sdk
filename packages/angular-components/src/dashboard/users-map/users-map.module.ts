import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersMapRoutingModule } from './users-map-routing.module';
import { UsersMapComponent } from './users-map.component';
import {ContainerModule, UsersContainerModule, UsersFilterModule} from "ht-angular";
import {ReplayModule} from "../map-container/replay/replay.module";

@NgModule({
  imports: [
    CommonModule,
    UsersMapRoutingModule,
    ContainerModule,
    UsersContainerModule,
    UsersFilterModule,
    ReplayModule,
  ],
  declarations: [UsersMapComponent]
})
export class UsersMapModule { }
