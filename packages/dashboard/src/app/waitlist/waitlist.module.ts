import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitlistRoutingModule } from './waitlist-routing.module';
import { WaitlistComponent } from './waitlist.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    WaitlistRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
      WaitlistComponent
  ]
})
export class WaitlistModule { }
