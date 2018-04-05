import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HowItWorksPageComponent} from "./how-it-works-page.component";

const routes: Routes = [
  {path: '', component: HowItWorksPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HowItWorksPageRoutingModule { }
