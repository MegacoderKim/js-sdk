import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplayComponent } from './replay.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ReplayComponent],
  exports: [ReplayComponent]
})
export class ReplayModule { }
