import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleaveDirective } from './cleave.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CleaveDirective],
  exports: [CleaveDirective]
})
export class CleaveModule { }
