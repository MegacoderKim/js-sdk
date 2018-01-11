import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountUsersModalComponent } from './account-users-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AccountUsersModalComponent],
  exports: [AccountUsersModalComponent]
})
export class AccountUsersModalModule { }
