import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OldPlanComponent} from './old-plan.component';

const routes: Routes = [
  {
    path: "", component: OldPlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OldPlanRoutingModule { }
