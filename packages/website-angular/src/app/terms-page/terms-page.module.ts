import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsPageRoutingModule } from './terms-page-routing.module';
import { TermsPageComponent } from './terms-page.component';

@NgModule({
  imports: [
    CommonModule,
    TermsPageRoutingModule
  ],
  declarations: [TermsPageComponent]
})
export class TermsPageModule { }
