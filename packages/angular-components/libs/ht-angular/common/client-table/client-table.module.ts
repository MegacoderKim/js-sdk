import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTableComponent } from './client-table.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ClientTableComponent],
  exports: [ClientTableComponent]
})
export class ClientTableModule { }
