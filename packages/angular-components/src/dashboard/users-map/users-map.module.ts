import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersMapRoutingModule } from './users-map-routing.module';
import { UsersMapComponent } from './users-map.component';
import { UsersFilterModule, ReplayModule, UsersMapContainerModule} from "ht-angular";
import {MapSwitchModule} from "../map-container/map-switch/map-switch.module";
import {CsvDownloadModule} from "../shared/csv-download/csv-download.module";

@NgModule({
  imports: [
    CommonModule,
    UsersMapRoutingModule,
    UsersFilterModule,
    ReplayModule,
    MapSwitchModule,
    CsvDownloadModule,
    UsersMapContainerModule
  ],
  declarations: [UsersMapComponent]
})
export class UsersMapModule { }
