import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContainerComponent} from "./container.component";

const routes: Routes = [
  { path: '', component: ContainerComponent, children: [
    {path: '', loadChildren: "../live/live.module#LiveModule"},
    {path: '', loadChildren: "../users/analytics-users/analytics-users.module#AnalyticsUsersModule"},
    {path: '', loadChildren: "../action/analytics-actions/analytics-actions.module#AnalyticsActionsModule"},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
