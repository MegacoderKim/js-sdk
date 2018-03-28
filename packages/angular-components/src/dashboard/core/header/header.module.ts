import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header.component";
import {InnerSharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    InnerSharedModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
