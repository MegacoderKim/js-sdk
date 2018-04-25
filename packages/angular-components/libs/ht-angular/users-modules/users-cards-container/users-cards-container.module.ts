import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersCardsContainerComponent } from './users-cards-container.component';
import {SharedModule} from "../../shared/shared.module";
import {UserCardModule} from "../user-card/user-card.module";
import {ActionCardModule} from "../../actions-modules/action-card/action-card.module";
import {CollapsableModule} from "../../common/collapsable/collapsable.module";
import {UserDeviceModule} from "../user-device/user-device.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserCardModule,
    ActionCardModule,
    CollapsableModule,
    UserDeviceModule
  ],
  declarations: [UsersCardsContainerComponent],
  exports: [UsersCardsContainerComponent]
})
export class UsersCardsContainerModule { }
