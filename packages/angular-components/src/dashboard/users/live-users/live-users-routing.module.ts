import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LiveUsersComponent} from "./live-users.component";

const routes: Routes = [
  { path: "", component: LiveUsersComponent, children: [
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LiveUsersRoutingModule { }
