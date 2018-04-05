import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyPageComponent } from './technology-page.component';
import {TechnologyPageRoutingModule} from "./technology-page-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TechnologyPageRoutingModule
  ],
  declarations: [TechnologyPageComponent]
})
export class TechnologyPageModule { }
