import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {environment} from "../environments/environment";

const routes: Routes = [
  { path: "", loadChildren: "./tracking-container/tracking-container.module#TrackingContainerModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      // useHash: environment.production
      // onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
