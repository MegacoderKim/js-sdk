import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailUserComponent} from "./detail-user.component";

const routes: Routes = [
  { path: ':id', component: DetailUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DetailUserRoutingModule { }
