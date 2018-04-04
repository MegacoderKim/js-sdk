import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContainerRoutingModule} from './container-routing.module';
import {ContainerComponent} from './container.component';
import {UserFilterComponent} from './user-filter/user-filter.component';
import {ActionFilterComponent} from './action-filter/action-filter.component';
import {SearchModule} from "../core/search/search.module";
import {DateRangeModule} from "../date-range/date-range.module";
import {FilterCommonComponent} from './filter-common/filter-common.component';
import {EntityFilterComponent} from './entity-filter/entity-filter.component';
import {RouterModule} from "@angular/router";
import {EntityListComponent} from './entity-list/entity-list.component';
import {InnerSharedModule} from "../shared/shared.module";
import {UsersListComponent} from './users-list/users-list.component';
import {ActionsListComponent} from './actions-list/actions-list.component';
import {MapSwitchModule} from "../map-container/map-switch/map-switch.module";
import { MobileTabComponent } from './mobile-tab/mobile-tab.component';
import { UserFilterMobileComponent } from './user-filter-mobile/user-filter-mobile.component';
import { ActionFilterMobileComponent } from './action-filter-mobile/action-filter-mobile.component';
import {LoadingModule} from "../core/loading/loading.module";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    ContainerRoutingModule,
    SearchModule,
      DateRangeModule,
      RouterModule,
      InnerSharedModule,
    MapSwitchModule,
    LoadingModule,
    SharedModule
  ],
  declarations: [
    ContainerComponent,
    UserFilterComponent,
    ActionFilterComponent,
    FilterCommonComponent,
    EntityFilterComponent,
    EntityListComponent,
    UsersListComponent,
    ActionsListComponent,
    MobileTabComponent,
    UserFilterMobileComponent,
    ActionFilterMobileComponent
  ]
})
export class ContainerModule { }
