import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLoggedoffComponent } from './header-loggedoff.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [HeaderLoggedoffComponent],
  exports: [
    HeaderLoggedoffComponent
  ]
})
export class HeaderLoggedoffModule { }
