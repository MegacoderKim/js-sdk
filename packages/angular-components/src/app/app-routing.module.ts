import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupKeyGuard} from "./guard/group-key.guard";
import {GroupKeyResolver} from "./guard/group-key-resolver";
import {ModalComponent} from "./modal/modal.component";
import {environment} from "../environments/environment";

const routes: Routes = [
  // { path: 'ui', component: UikitComponent},
  { path: 'users', loadChildren: "./test/test.module#TestModule"},
  { path: 'groups', loadChildren: "./groups-test/groups-test.module#GroupsTestModule"},
  { path: 'analytics', loadChildren: "./analytics-test/analytics-test.module#AnalyticsTestModule"},
  { path: 'groups/:id', loadChildren: "./group-test/group-test.module#GroupTestModule"},
  { path: '',   redirectTo: '/analytics', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: environment.production
    // onSameUrlNavigation: 'reload'
  }
  )],
  exports: [RouterModule],
})
export class AppRoutingModule { }
