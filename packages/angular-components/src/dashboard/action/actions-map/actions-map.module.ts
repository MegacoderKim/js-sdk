import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsMapRoutingModule } from './actions-map-routing.module';
import { ActionsMapComponent } from './actions-map.component';
import {MapContainerModule, ActionCardModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    ActionsMapRoutingModule,
    MapContainerModule,
    ActionCardModule
  ],
  declarations: [ActionsMapComponent]
})
export class ActionsMapModule { }
