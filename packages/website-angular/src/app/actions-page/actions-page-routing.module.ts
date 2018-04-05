import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActionsPageComponent} from "./actions-page.component";

const routes: Routes = [
  {path: '', component: ActionsPageComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsPageRoutingModule { }
