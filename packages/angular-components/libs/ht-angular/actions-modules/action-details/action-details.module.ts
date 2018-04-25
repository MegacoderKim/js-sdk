import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionDetailsComponent } from './action-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ActionDetailsComponent],
  exports: [ActionDetailsComponent]
})
export class ActionDetailsModule { }
