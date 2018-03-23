import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {CleaveModule} from "../directives/cleave/cleave.module";
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    CleaveModule
  ],
  declarations: [PaymentComponent, PaymentFormComponent, PaymentSuccessComponent]
})
export class PaymentModule { }
