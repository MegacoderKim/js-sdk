import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import {SharedModule} from "../shared/shared.module";
import {MainComponent} from "./main.component";
import {HeaderModule} from "../header/header.module";
import {FooterModule} from "../footer/footer.module";
import {SignupPageModule} from "../signup-page/signup-page.module";
import {ModalModule} from "../modal/modal.module";

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    HeaderModule,
    SignupPageModule,
    FooterModule,
    ModalModule,
  ],
  declarations: [
    MainComponent
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
