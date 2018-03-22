import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapContainerComponent} from "./map-container.component";

const routes: Routes = [
  {path: "", component: MapContainerComponent, children: [
    { path: "map/users", loadChildren: "../users/live-users/live-users.module#LiveUsersModule"},
    { path: "map/actions", loadChildren: "../action/live-actions/live-actions.module#LiveActionsModule"},
    { path: "map/events", loadChildren: "../events/live-events/live-events.module#LiveEventsModule"},
    {path: "users", loadChildren: "../users/timeline-user/timeline-user.module#TimelineUserModule"},
    {path: "actions", loadChildren: "../action/action-page/action-page.module#ActionPageModule"}
  ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapContainerRoutingModule { }
