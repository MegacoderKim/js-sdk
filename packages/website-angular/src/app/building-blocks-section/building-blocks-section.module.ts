import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingBlocksSectionComponent } from './building-blocks-section.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BuildingBlocksSectionComponent],
  exports: [BuildingBlocksSectionComponent]
})
export class BuildingBlocksSectionModule { }
