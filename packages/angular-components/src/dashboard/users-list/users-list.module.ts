import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list.component';
import {ClientTableModule, UsersFilterModule, PlacelineMapContainerModule, SharedModule, PaginationModule, ReplayModule} from "ht-angular";
import {CsvDownloadModule} from "../shared/csv-download/csv-download.module";

@NgModule({
  imports: [
    CommonModule,
    UsersListRoutingModule,
    ClientTableModule,
    UsersFilterModule,
    PlacelineMapContainerModule,
    SharedModule,
    PaginationModule,
    ReplayModule,
    CsvDownloadModule
  ],
  declarations: [UsersListComponent]
})
export class UsersListModule { }
