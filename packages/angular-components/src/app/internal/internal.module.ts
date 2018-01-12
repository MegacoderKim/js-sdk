import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from "@angular/router";
import {AccountsService} from "../accounts/accounts.service";
import {StorageService} from "./storage.service";
import {MembershipsService} from "../accounts/memberships.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    AccountsService,
    StorageService,
    MembershipsService
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class InternalModule { }
