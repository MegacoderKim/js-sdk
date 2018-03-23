import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {mainRoutes} from "../main/main-routing.module";

const routes: Routes = mainRoutes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WidgetRoutingModule { }
