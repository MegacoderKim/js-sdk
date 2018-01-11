import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitySearchComponent } from './entity-search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EntitySearchComponent],
  exports: [EntitySearchComponent]
})
export class EntitySearchModule { }
