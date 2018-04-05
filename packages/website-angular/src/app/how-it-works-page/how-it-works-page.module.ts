import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HowItWorksPageRoutingModule } from './how-it-works-page-routing.module';
import { HowItWorksPageComponent } from './how-it-works-page.component';

@NgModule({
  imports: [
    CommonModule,
    HowItWorksPageRoutingModule
  ],
  declarations: [HowItWorksPageComponent]
})
export class HowItWorksPageModule { }
