import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimelineUserComponent} from "./timeline-user.component";

const routes: Routes = [
  { path: ':id/timeline', component: TimelineUserComponent},
  { path: ':id', component: TimelineUserComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TimelineUserRoutingModule { }
