import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionStatusComponent } from './action-status.component';
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ActionStatusComponent],
  exports: [ActionStatusComponent]
})
export class ActionStatusModule { }
