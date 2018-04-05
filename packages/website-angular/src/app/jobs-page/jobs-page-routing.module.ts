import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JobsPageComponent} from "./jobs-page.component";

const routes: Routes = [
  {path: '', component: JobsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsPageRoutingModule { }
