import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupKeyGuard} from "./guard/group-key.guard";
import {GroupKeyResolver} from "./guard/group-key-resolver";
import {ModalComponent} from "./modal/modal.component";

const routes: Routes = [
  // { path: 'ui', component: UikitComponent},
  { path: 'users', loadChildren: "./test/test.module#TestModule"},
  { path: 'groups', loadChildren: "./groups-test/groups-test.module#GroupsTestModule"},
  { path: 'groups/:id', loadChildren: "./group-test/group-test.module#GroupTestModule"},
  { path: '',   redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  //   {
  //   onSameUrlNavigation: 'reload'
  // }
  )],
  exports: [RouterModule],
})
export class AppRoutingModule { }
