import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsMapRoutingModule } from './actions-map-routing.module';
import { ActionsMapComponent } from './actions-map.component';
import {MapContainerModule, ActionCardModule, ActionsFiltersModule, ActionsSummaryContainerModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    ActionsMapRoutingModule,
    MapContainerModule,
    ActionCardModule,
    ActionsFiltersModule,
    ActionsSummaryContainerModule
  ],
  declarations: [ActionsMapComponent]
})
export class ActionsMapModule { }
