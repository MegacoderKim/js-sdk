import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingBlocksPageRoutingModule } from './building-blocks-page-routing.module';
import { BuildingBlocksPageComponent } from './building-blocks-page.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    BuildingBlocksPageRoutingModule,
    SharedModule
  ],
  declarations: [
    BuildingBlocksPageComponent
  ]
})
export class BuildingBlocksPageModule { }
