import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgreementPageRoutingModule } from './agreement-page-routing.module';
import { AgreementPageComponent } from './agreement-page.component';

@NgModule({
  imports: [
    CommonModule,
    AgreementPageRoutingModule
  ],
  declarations: [AgreementPageComponent]
})
export class AgreementPageModule { }
