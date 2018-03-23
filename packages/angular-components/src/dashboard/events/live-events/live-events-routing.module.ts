import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LiveEventsComponent} from "./live-events.component";

const routes: Routes = [
  { path: "", component: LiveEventsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LiveEventsRoutingModule { }
