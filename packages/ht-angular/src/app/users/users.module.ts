import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {SharedModule} from "../shared/shared.module";
import {UserCardModule} from "../user-card/user-card.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserCardModule
  ],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})
export class UsersModule { }
