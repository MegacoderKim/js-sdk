import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStateComponent } from './users-state.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsersStateComponent],
  exports: [UsersStateComponent]
})
export class UsersStateModule { }
