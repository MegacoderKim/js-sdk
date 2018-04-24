import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlacelineModule} from "../../placeline/placeline.module";
import {UserCardModule} from "../../user-card/user-card.module";
import {SharedModule} from "../../shared/shared.module";
import {UserDeviceModule} from "../../user-device/user-device.module";
import {UsersPlacelineContainerComponent} from "./users-placeline-container.component";

@NgModule({
  imports: [
    CommonModule,
    PlacelineModule,
    UserCardModule,
    SharedModule,
    UserDeviceModule
  ],
  declarations: [UsersPlacelineContainerComponent],
  exports: [UsersPlacelineContainerComponent]
})
export class UsersPlacelineContainerModule { }
