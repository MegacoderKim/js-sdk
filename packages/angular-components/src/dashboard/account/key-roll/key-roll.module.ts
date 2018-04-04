import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyRollRoutingModule } from './key-roll-routing.module';
import { KeyRollComponent } from './key-roll.component';
import {InnerSharedModule} from "../../shared/shared.module";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    KeyRollRoutingModule,
    InnerSharedModule,
    SharedModule
  ],
  declarations: [KeyRollComponent]
})
export class KeyRollModule { }
