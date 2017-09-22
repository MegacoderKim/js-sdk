import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupTestComponent} from "./group-test.component";
import {GroupKeyResolver} from "../guard/group-key-resolver";
import {GroupLookupKeyResolver} from "../guard/group-lookup-key-resolver";

const routes: Routes = [
  {path: "", component: GroupTestComponent, resolve: {key: GroupKeyResolver}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GroupTestRoutingModule { }
