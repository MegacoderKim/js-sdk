import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteRoutingModule } from './invite-routing.module';
import { InviteComponent } from './invite.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InnerSharedModule} from "../../shared/shared.module";
import { InvitationListComponent } from '../invitation-list/invitation-list.component';
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    InviteRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    InnerSharedModule
  ],
  declarations: [InviteComponent, InvitationListComponent]
})
export class InviteModule { }
