import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {ActionsGuideComponent} from "./actions-guide.component";

const routes: Routes = [
  {path: '', component: ActionsGuideComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsGuideRoutingModule { }
