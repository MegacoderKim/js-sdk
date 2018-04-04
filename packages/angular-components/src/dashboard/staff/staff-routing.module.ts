import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StaffComponent} from "./staff.component";
import {TraceEventsComponent} from "./trace-events/trace-events.component";

const routes: Routes = [
  { path: '', component: StaffComponent},
  { path: 'events', component: TraceEventsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
