import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LiveOnboardingComponent} from "./live-onboarding.component";

const routes: Routes = [
  {path: '', component: LiveOnboardingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveOnboardingRoutingModule { }
