import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LiveComponent} from "./live.component";

const routes: Routes = [
  {path: "", component: LiveComponent, children: [
    { path: "map/users", loadChildren: "../users/live-users/live-users.module#LiveUsersModule"},
    { path: "map/actions", loadChildren: "../action/live-actions/live-actions.module#LiveActionsModule"},
    // { path: "map/test", loadChildren: "../users-list/users-list.module#UsersListModule"},
    {path: "users", loadChildren: "../users/timeline-user/timeline-user.module#TimelineUserModule"},
    {path: "actions", loadChildren: "../action/action-page/action-page.module#ActionPageModule"}
  ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveRoutingModule { }
