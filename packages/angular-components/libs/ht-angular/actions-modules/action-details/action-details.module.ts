import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionDetailsComponent } from './action-details.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ActionDetailsComponent],
  exports: [ActionDetailsComponent]
})
export class ActionDetailsModule { }
