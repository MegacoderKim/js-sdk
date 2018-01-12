import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountUsersModalComponent} from "../account-users-modal/account-users-modal.component";

const routes: Routes = [
  { path: "", component: AccountUsersModalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountUsersSwitcherRoutingModule { }
