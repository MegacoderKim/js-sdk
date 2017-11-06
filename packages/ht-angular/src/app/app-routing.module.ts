import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupKeyGuard} from "./guard/group-key.guard";
import {GroupKeyResolver} from "./guard/group-key-resolver";
import {UikitComponent} from "./uikit/uikit.component";

const routes: Routes = [
  // { path: 'ui', component: UikitComponent},
  { path: '', loadChildren: "./test/test.module#TestModule"},
  { path: 'groups', loadChildren: "./groups-test/groups-test.module#GroupsTestModule"},
  { path: 'groups/:id', loadChildren: "./group-test/group-test.module#GroupTestModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
