import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActionsTableComponent} from "./actions-table.component";

const routes: Routes = [
  { path: "list", component: ActionsTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsTableRoutingModule { }
