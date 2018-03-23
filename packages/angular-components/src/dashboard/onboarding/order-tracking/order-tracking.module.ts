import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderLoggedoffModule} from "../../core/header-loggedoff/header-loggedoff.module";
import {CodeContainerComponent} from "../code-container/code-container.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HeaderLoggedoffModule,
    SharedModule
  ],
  declarations: [
    CodeContainerComponent
  ]
})
export class OrderTrackingModule { }
