import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BuildingBlocksPageComponent} from "./building-blocks-page.component";

const routes: Routes = [
  {path: '', component: BuildingBlocksPageComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingBlocksPageRoutingModule { }
