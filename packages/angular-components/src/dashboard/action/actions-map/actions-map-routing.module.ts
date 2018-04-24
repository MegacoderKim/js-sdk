import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActionsMapComponent} from "./actions-map.component";

const routes: Routes = [
  { path: "map", component: ActionsMapComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsMapRoutingModule { }
