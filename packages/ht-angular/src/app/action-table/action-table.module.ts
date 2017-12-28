import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionTableComponent } from './action-table.component';
import {UserTableModule} from "../user-table/user-table.module";
import {DataTableModule} from "../data-table/data-table.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    UserTableModule,
    DataTableModule,
    SharedModule
  ],
  declarations: [ActionTableComponent],
  exports: [ActionTableComponent]
})
export class ActionTableModule { }
