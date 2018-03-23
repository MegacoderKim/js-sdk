import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SaasAgreementComponent} from "./saas-agreement.component";

const routes: Routes = [
  { path: "", component: SaasAgreementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaasAgreementRoutingModule { }
