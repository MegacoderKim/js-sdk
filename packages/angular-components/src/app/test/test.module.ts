import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import {MapModule} from "ht-angular";
import {MapContainerModule} from "ht-angular";
import {SharedModule} from "ht-angular";
import {UsersContainerModule} from "ht-angular";
import {UserCardModule} from "ht-angular";
import {PlacelineModule} from "ht-angular";
import {UsersMapContainerModule} from "ht-angular";
import {UsersPlacelineContainerModule} from "ht-angular";
import {PlacelineMapContainerModule} from "ht-angular";
import {UsersSummaryContainerModule} from "ht-angular";

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
    UsersPlacelineContainerModule,
    PlacelineMapContainerModule,
  ],
  declarations: [TestComponent]
})
export class TestModule { }
