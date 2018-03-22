import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LiveActionsComponent} from "./live-actions.component";

const routes: Routes = [
  { path: "", component: LiveActionsComponent, children: [
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LiveActionsRoutingModule { }
