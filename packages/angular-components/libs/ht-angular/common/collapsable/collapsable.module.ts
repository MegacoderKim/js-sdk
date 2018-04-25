import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsableComponent } from './collapsable.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CollapsableComponent],
  exports: [CollapsableComponent]
})
export class CollapsableModule { }
