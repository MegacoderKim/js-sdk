import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersMapContainerComponent } from './users-map-container.component';
import {UsersModule} from "../users/users.module";
import {MapModule} from "../map/map.module";
import {UsersContainerModule} from "../users-container/users-container.module";
import {MapContainerModule} from "../map-container/map-container.module";
import {UsersFilterModule} from "../filters/users-filter/users-filter.module";
import {SharedModule} from "../shared/shared.module";
import {ContainerModule} from "../container/container.module";

@NgModule({
  imports: [
    CommonModule,
    UsersContainerModule,
    MapContainerModule,
    UsersFilterModule,
    SharedModule,
    MapContainerModule,
    ContainerModule
  ],
  declarations: [UsersMapContainerComponent],
  exports: [UsersMapContainerComponent]
})
export class UsersMapContainerModule { }
