import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlockComponent} from "./block.component";

const routes: Routes = [
  { path: "", component: BlockComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockRoutingModule { }
