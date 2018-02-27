import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsTestRoutingModule } from './groups-test-routing.module';
import { GroupsTestComponent } from './groups-test.component';
import {GroupsContainerModule} from "ht-angular";
import {RouterModule} from "@angular/router";
import {GroupsChartContainerModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    GroupsTestRoutingModule,
    GroupsContainerModule,
    GroupsChartContainerModule,
    RouterModule
  ],
  declarations: [GroupsTestComponent]
})
export class GroupsTestModule { }
