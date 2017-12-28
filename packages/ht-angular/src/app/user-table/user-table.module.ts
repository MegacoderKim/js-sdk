import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table.component';
import { SharedModule } from "../shared/shared.module";
import {DataTableModule} from "../data-table/data-table.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DataTableModule
  ],
  declarations: [UserTableComponent],
  exports: [UserTableComponent]
})
export class UserTableModule { }
