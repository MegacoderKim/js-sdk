import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTableComponent } from './client-table.component';
import {SharedModule} from "../../shared/shared.module";
import {ActionDotModule} from "../../actions-module/action-dot/action-dot.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ActionDotModule
  ],
  declarations: [ClientTableComponent],
  exports: [ClientTableComponent]
})
export class ClientTableModule { }
