import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import {ListContainerModule} from "../list-container/list-container.module";
import {MapModule} from "../map/map.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ListContainerModule,
    MapModule,
    SharedModule
  ],
  declarations: [ContainerComponent],
  exports: [ContainerComponent]
})
export class ContainerModule { }
