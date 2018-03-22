import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnalyticsUsersComponent} from "./analytics-users.component";

const routes: Routes = [
  { path: "list/users", component: AnalyticsUsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AnalyticsUsersRoutingModule { }
