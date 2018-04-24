import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsTableRoutingModule } from './actions-table-routing.module';
import { ActionsTableComponent } from './actions-table.component';
import {ClientTableModule, PaginationModule, SharedModule, ActionsFiltersModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    ActionsTableRoutingModule,
    ClientTableModule,
    PaginationModule,
    SharedModule,
    ActionsFiltersModule
  ],
  declarations: [ActionsTableComponent]
})
export class ActionsTableModule { }
