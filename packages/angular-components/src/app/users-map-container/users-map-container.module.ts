import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersMapContainerComponent } from './users-map-container.component';
import {UsersModule} from "../users/users.module";
import {MapModule} from "../map/map.module";
import {UsersContainerModule} from "../users-container/users-container.module";
import {MapContainerModule} from "../map-container/map-container.module";
import {UsersFilterModule} from "../filters/users-filter/users-filter.module";

@NgModule({
  imports: [
    CommonModule,
    UsersContainerModule,
    MapContainerModule,
    UsersFilterModule
  ],
  declarations: [UsersMapContainerComponent],
  exports: [UsersMapContainerComponent]
})
export class UsersMapContainerModule { }
