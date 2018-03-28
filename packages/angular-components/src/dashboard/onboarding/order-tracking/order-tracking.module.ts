import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderLoggedoffModule} from "../../core/header-loggedoff/header-loggedoff.module";
import {CodeContainerComponent} from "../code-container/code-container.component";
import {InnerSharedModule} from "../../shared/shared.module";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    HeaderLoggedoffModule,
    SharedModule,
    InnerSharedModule
  ],
  declarations: [
    CodeContainerComponent
  ]
})
export class OrderTrackingModule { }
