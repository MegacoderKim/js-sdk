import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TechnologyPageComponent} from "./technology-page.component";

const routes: Routes = [
  {path: '', component: TechnologyPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnologyPageRoutingModule { }
