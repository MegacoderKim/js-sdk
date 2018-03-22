import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyRollRoutingModule } from './key-roll-routing.module';
import { KeyRollComponent } from './key-roll.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    KeyRollRoutingModule,
    SharedModule
  ],
  declarations: [KeyRollComponent]
})
export class KeyRollModule { }
