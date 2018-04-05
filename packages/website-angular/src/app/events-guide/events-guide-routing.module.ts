import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {EventsGuideComponent} from "./events-guide.component";

const routes: Routes = [
  {path: '', component: EventsGuideComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsGuideRoutingModule { }
