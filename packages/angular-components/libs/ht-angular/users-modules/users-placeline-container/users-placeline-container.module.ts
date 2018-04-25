import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionCardModule} from "../../actions-modules/action-card/action-card.module";
import {CollapsableModule} from "../../common/collapsable/collapsable.module";
import {PlacelineModule} from "../../placeline/placeline.module";
import {UserCardModule} from "../user-card/user-card.module";
import {SharedModule} from "../../shared/shared.module";
import {UserDeviceModule} from "../user-device/user-device.module";
import {UsersPlacelineContainerComponent} from "./users-placeline-container.component";

@NgModule({
  imports: [
    CommonModule,
    PlacelineModule,
    UserCardModule,
    SharedModule,
    UserDeviceModule,
    CollapsableModule,
    ActionCardModule
  ],
  declarations: [UsersPlacelineContainerComponent],
  exports: [UsersPlacelineContainerComponent]
})
export class UsersPlacelineContainerModule { }
