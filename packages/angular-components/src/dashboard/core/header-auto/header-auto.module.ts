import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderAutoComponent} from "./header-auto.component";
import {HeaderLoggedoffModule} from "../header-loggedoff/header-loggedoff.module";
import {HeaderModule} from "../header/header.module";

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    HeaderLoggedoffModule
  ],
  declarations: [HeaderAutoComponent],
  exports: [
    HeaderAutoComponent
  ]
})
export class HeaderAutoModule { }
