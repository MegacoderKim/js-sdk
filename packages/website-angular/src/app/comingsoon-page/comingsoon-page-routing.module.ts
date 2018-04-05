import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComingsoonPageComponent} from "./comingsoon-page.component";

const routes: Routes = [
  {path: '', component: ComingsoonPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComingsoonPageRoutingModule { }
