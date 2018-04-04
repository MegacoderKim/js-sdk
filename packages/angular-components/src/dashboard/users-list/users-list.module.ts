import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list.component';
import {UsersContainerModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    UsersListRoutingModule,
    UsersContainerModule,
  ],
  declarations: [UsersListComponent]
})
export class UsersListModule { }
