import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPageRoutingModule } from './privacy-page-routing.module';
import { PrivacyPageComponent } from './privacy-page.component';

@NgModule({
  imports: [
    CommonModule,
    PrivacyPageRoutingModule
  ],
  declarations: [PrivacyPageComponent]
})
export class PrivacyPageModule { }
