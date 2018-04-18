import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersMapRoutingModule } from './users-map-routing.module';
import { UsersMapComponent } from './users-map.component';
import {ContainerModule, UsersContainerModule, UsersFilterModule, ReplayModule, PlacelineDateModule} from "ht-angular";
import {MapSwitchModule} from "../map-container/map-switch/map-switch.module";

@NgModule({
  imports: [
    CommonModule,
    UsersMapRoutingModule,
    ContainerModule,
    UsersContainerModule,
    UsersFilterModule,
    ReplayModule,
    PlacelineDateModule,
    MapSwitchModule
  ],
  declarations: [UsersMapComponent]
})
export class UsersMapModule { }
