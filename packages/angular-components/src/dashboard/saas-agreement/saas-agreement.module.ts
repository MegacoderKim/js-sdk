import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaasAgreementRoutingModule } from './saas-agreement-routing.module';
import { SaasAgreementComponent } from './saas-agreement.component';

@NgModule({
  imports: [
    CommonModule,
    SaasAgreementRoutingModule
  ],
  declarations: [SaasAgreementComponent]
})
export class SaasAgreementModule { }
