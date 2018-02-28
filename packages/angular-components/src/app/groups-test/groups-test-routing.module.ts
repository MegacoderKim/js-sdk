import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupsTestComponent} from "./groups-test.component";

const routes: Routes = [
  { path: "", component: GroupsTestComponent},
  { path: ":id", component: GroupsTestComponent},
  // { path: "chart", component: GroupsChartContainerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsTestRoutingModule { }
