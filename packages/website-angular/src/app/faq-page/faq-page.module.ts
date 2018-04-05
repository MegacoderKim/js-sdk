import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqPageRoutingModule } from './faq-page-routing.module';
import { FaqPageComponent } from './faq-page.component';
import {FooterModule} from "../footer/footer.module";
import {HeaderModule} from "../header/header.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FaqPageRoutingModule,
    HeaderModule,
    FooterModule,
    SharedModule
  ],
  declarations: [FaqPageComponent]
})
export class FaqPageModule { }
