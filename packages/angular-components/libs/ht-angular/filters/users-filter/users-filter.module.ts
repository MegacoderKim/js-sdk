import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFilterComponent } from './users-filter.component';
import {EntitySearchModule} from "../entity-search/entity-search.module";
import {SharedModule} from "../../shared/shared.module";
import {DateRangeModule} from "../date-range/date-range.module";
import {PlacelineDateModule} from "../../placeline-date/placeline-date.module";

@NgModule({
  imports: [
    CommonModule,
    EntitySearchModule,
    SharedModule,
    DateRangeModule,
    PlacelineDateModule
  ],
  declarations: [UsersFilterComponent],
  exports: [UsersFilterComponent]
})
export class UsersFilterModule { }
