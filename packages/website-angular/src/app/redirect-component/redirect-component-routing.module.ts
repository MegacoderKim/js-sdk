import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RedirectComponentComponent} from "./redirect-component.component";

const routes: Routes = [
  {path: '', component: RedirectComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedirectComponentRoutingModule { }
