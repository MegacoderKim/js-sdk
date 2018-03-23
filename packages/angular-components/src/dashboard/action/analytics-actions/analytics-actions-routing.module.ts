import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnalyticsActionsComponent} from "./analytics-actions.component";

const routes: Routes = [
  { path: "list/actions", component: AnalyticsActionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AnalyticsActionsRoutingModule { }
