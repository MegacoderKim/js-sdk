import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersMapComponent} from "./users-map.component";

const routes: Routes = [
  {path:"map", component: UsersMapComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersMapRoutingModule { }
