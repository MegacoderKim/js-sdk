import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestPlacelineComponent} from "./test-placeline.component";

const routes: Routes = [
  { path: ":id", component: TestPlacelineComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestPlacelineRoutingModule { }
