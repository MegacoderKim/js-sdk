import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedirectComponentRoutingModule } from './redirect-component-routing.module';
import { RedirectComponentComponent } from './redirect-component.component';

@NgModule({
  imports: [
    CommonModule,
    RedirectComponentRoutingModule
  ],
  declarations: [RedirectComponentComponent]
})
export class RedirectComponentModule { }
