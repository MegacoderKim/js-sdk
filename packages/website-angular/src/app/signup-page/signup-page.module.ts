import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupPageRoutingModule } from './signup-page-routing.module';
import { SignupPageComponent } from './signup-page.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SignupPageRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    SignupPageComponent
  ],
  exports: []
})
export class SignupPageModule { }
