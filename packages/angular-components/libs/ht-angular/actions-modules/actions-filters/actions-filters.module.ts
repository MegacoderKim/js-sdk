import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsFiltersComponent } from './actions-filters.component';
import {DateRangeModule} from "../../filters/date-range/date-range.module";
import {EntitySearchModule} from "../../filters/entity-search/entity-search.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    DateRangeModule,
    EntitySearchModule,
    SharedModule
  ],
  declarations: [ActionsFiltersComponent],
  exports: [ActionsFiltersComponent]
})
export class ActionsFiltersModule { }
