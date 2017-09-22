import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupsTestComponent} from "./groups-test.component";

const routes: Routes = [
  { path: "", component: GroupsTestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsTestRoutingModule { }
