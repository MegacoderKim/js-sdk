import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActionPageComponent} from "./action-page.component";

const routes: Routes = [
  { path: '', component: ActionPageComponent},
  { path: ':id', component: ActionPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionPageRoutingModule { }
