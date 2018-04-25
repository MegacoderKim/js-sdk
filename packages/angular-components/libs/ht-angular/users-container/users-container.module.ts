import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersContainerComponent } from './users-container.component';
import {UsersCardsContainerModule} from "../users-modules/users-cards-container/users-cards-container.module";
import {PlacelineModule} from "../placeline/placeline.module";
import {SharedModule} from "../shared/shared.module";
import {UserCardModule} from "../users-modules/user-card/user-card.module";
import {UsersPlacelineContainerModule} from "../users-modules/users-placeline-container/users-placeline-container.module";
import {UsersSummaryModule} from "../users-summary/users-summary.module";
import {UsersSummaryContainerModule} from "../users-summary-container/users-summary-container.module";
import {PaginationModule} from "../pagination/pagination.module";

@NgModule({
  imports: [
    CommonModule,
    UsersCardsContainerModule,
    // UserCardModule,
    PlacelineModule,
    UsersPlacelineContainerModule,
    SharedModule,
    UsersSummaryContainerModule,
    PaginationModule
  ],
  declarations: [UsersContainerComponent],
  exports: [UsersContainerComponent]
})
export class UsersContainerModule { }
