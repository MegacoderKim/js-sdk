import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnalyticsTestComponent} from "./analytics-test.component";

const routes: Routes = [
  { path: "", component: AnalyticsTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsTestRoutingModule { }
