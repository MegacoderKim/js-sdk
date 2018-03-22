import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {KeyRollComponent} from "./key-roll.component";

const routes: Routes = [
  { path: ":token/:subAccountId", component: KeyRollComponent },
  { path: ":token", component: KeyRollComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeyRollRoutingModule { }
