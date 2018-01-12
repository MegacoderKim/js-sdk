import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountUsersSwitcherRoutingModule } from './account-users-switcher-routing.module';
import {AccountUsersModalModule} from "../account-users-modal/account-users-modal.module";

@NgModule({
  imports: [
    CommonModule,
    AccountUsersModalModule,
    AccountUsersSwitcherRoutingModule
  ],
  declarations: []
})
export class AccountUsersSwitcherModule { }
