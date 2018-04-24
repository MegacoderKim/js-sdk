import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsMapRoutingModule } from './actions-map-routing.module';
import { ActionsMapComponent } from './actions-map.component';
import {MapContainerModule, ActionCardModule, ActionsFiltersModule, ActionsSummaryContainerModule, ActionsPlacelineContainerModule, ReplayModule} from "ht-angular";
import {CsvDownloadModule} from "../../shared/csv-download/csv-download.module";

@NgModule({
  imports: [
    CommonModule,
    ActionsMapRoutingModule,
    MapContainerModule,
    ActionCardModule,
    ActionsFiltersModule,
    ActionsSummaryContainerModule,
    CsvDownloadModule,
    ActionsPlacelineContainerModule,
    ReplayModule
  ],
  declarations: [ActionsMapComponent]
})
export class ActionsMapModule { }
