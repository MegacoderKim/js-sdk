import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveRoutingModule } from './live-routing.module';
import { LiveComponent } from './live.component';
import {MapContainerModule} from "../map-container/map-container.module";

@NgModule({
  imports: [
    CommonModule,
    LiveRoutingModule,
      MapContainerModule
  ],
  declarations: [LiveComponent]
})
export class LiveModule { }
