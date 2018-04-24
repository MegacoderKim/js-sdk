import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsTableRoutingModule } from './actions-table-routing.module';
import { ActionsTableComponent } from './actions-table.component';
import {ClientTableModule, PaginationModule, SharedModule, ActionsFiltersModule, MapContainerModule, ActionsPlacelineContainerModule, ReplayModule} from "ht-angular";
import {CsvDownloadModule} from "../../shared/csv-download/csv-download.module";

@NgModule({
  imports: [
    CommonModule,
    ActionsTableRoutingModule,
    ClientTableModule,
    PaginationModule,
    SharedModule,
    ActionsFiltersModule,
    CsvDownloadModule,
    MapContainerModule,
    ActionsPlacelineContainerModule,
    ReplayModule
  ],
  declarations: [ActionsTableComponent]
})
export class ActionsTableModule { }
