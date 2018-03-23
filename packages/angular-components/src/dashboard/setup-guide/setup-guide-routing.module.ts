import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SetupGuideComponent} from "./setup-guide.component";

const routes: Routes = [
  {path: '', component: SetupGuideComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupGuideRoutingModule { }
