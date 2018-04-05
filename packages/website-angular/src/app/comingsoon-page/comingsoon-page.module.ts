import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComingsoonPageRoutingModule } from './comingsoon-page-routing.module';
import {ComingsoonPageComponent} from "./comingsoon-page.component";

@NgModule({
  imports: [
    CommonModule,
    ComingsoonPageRoutingModule
  ],
  declarations: [ComingsoonPageComponent]
})
export class ComingsoonPageModule { }
