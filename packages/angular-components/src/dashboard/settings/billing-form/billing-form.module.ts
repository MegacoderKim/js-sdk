import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { BillingFormComponent } from './billing-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [BillingFormComponent],
  exports: [BillingFormComponent]
})
export class BillingFormModule { }
