import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContainerComponent } from './list-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListContainerComponent],
  exports: [ListContainerComponent]
})
export class ListContainerModule { }
