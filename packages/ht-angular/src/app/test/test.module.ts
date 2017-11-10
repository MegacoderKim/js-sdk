import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import {MapModule} from "../map/map.module";
import {MapContainerModule} from "../map-container/map-container.module";
import {SharedModule} from "../shared/shared.module";
import {UsersContainerModule} from "../users-container/users-container.module";
import {UserCardModule} from "../user-card/user-card.module";
import {PlacelineModule} from "../placeline/placeline.module";
import {UsersMapContainerModule} from "../users-map-container/users-map-container.module";
import {PlacelineContainerModule} from "../placeline-container/placeline-container.module";
import {PlacelineMapContainerModule} from "../placeline-map-container/placeline-map-container.module";
import {UsersSummaryContainerModule} from "../users-summary-container/users-summary-container.module";

@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    MapModule,
    MapContainerModule,
    SharedModule,
    UsersContainerModule,
    UserCardModule,
    UsersSummaryContainerModule,
    PlacelineModule,
    UsersMapContainerModule,
    PlacelineContainerModule,
    PlacelineMapContainerModule
  ],
  declarations: [TestComponent]
})
export class TestModule { }
