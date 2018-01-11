import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModalComponent} from "./modal.component";

const routes: Routes = [
  { path: "", component: ModalComponent, outlet: 'modal', children: [
    {path : "login", loadChildren: "../login/login.module#LoginModule"},
    {path : "accounts", loadChildren: "../account-users-switcher/account-users-switcher.module#AccountUsersSwitcherModule"},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalRoutingModule { }
