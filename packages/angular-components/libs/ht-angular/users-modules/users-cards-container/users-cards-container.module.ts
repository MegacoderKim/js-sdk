import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersCardsContainerComponent } from './users-cards-container.component';
import {SharedModule} from "../../shared/shared.module";
import {UserCardModule} from "../user-card/user-card.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserCardModule,
  ],
  declarations: [UsersCardsContainerComponent],
  exports: [UsersCardsContainerComponent]
})
export class UsersCardsContainerModule { }
