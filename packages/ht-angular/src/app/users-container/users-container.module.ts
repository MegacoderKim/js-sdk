import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersContainerComponent } from './users-container.component';
import {UsersModule} from "../users/users.module";
import {PlacelineModule} from "../placeline/placeline.module";
import {SharedModule} from "../shared/shared.module";
import {UserCardModule} from "../user-card/user-card.module";
import {PlacelineContainerModule} from "../placeline-container/placeline-container.module";
import {UsersSummaryModule} from "../users-summary/users-summary.module";
import {UsersSummaryContainerModule} from "../users-summary-container/users-summary-container.module";
import {PaginationModule} from "../pagination/pagination.module";

@NgModule({
  imports: [
    CommonModule,
    UsersModule,
    // UserCardModule,
    PlacelineModule,
    PlacelineContainerModule,
    SharedModule,
    UsersSummaryContainerModule,
    PaginationModule
  ],
  declarations: [UsersContainerComponent],
  exports: [UsersContainerComponent]
})
export class UsersContainerModule { }
