import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
      ReactiveFormsModule
  ],
  declarations: [ResetPasswordComponent, ForgotPasswordComponent]
})
export class ResetPasswordModule { }
