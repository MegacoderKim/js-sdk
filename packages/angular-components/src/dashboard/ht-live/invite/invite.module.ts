import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteRoutingModule } from './invite-routing.module';
import { InviteComponent } from './invite.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { InvitationListComponent } from '../invitation-list/invitation-list.component';

@NgModule({
  imports: [
    CommonModule,
    InviteRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [InviteComponent, InvitationListComponent]
})
export class InviteModule { }
