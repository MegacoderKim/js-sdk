import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReplayComponent} from "./replay.component";
import {SharedModule} from "ht-angular";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [
    ReplayComponent
  ],
  exports: [
    ReplayComponent
  ]
})
export class ReplayModule { }
