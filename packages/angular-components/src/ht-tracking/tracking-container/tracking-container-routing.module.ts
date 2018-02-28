import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrackingContainerComponent} from "./tracking-container.component";

const routes: Routes = [
  { path: ":shortCode", component: TrackingContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingContainerRoutingModule { }
