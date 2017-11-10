import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupsTestComponent} from "./groups-test.component";
import {GroupsContainerComponent} from "../groups-container/groups-container.component";
import {GroupsChartContainerComponent} from "../groups-chart-container/groups-chart-container.component";

const routes: Routes = [
  { path: "", component: GroupsContainerComponent},
  { path: "chart", component: GroupsChartContainerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsTestRoutingModule { }
