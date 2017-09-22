import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsTestRoutingModule } from './groups-test-routing.module';
import { GroupsTestComponent } from './groups-test.component';
import {GroupsContainerModule} from "../groups-container/groups-container.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    GroupsTestRoutingModule,
    GroupsContainerModule,
    RouterModule
  ],
  declarations: [GroupsTestComponent]
})
export class GroupsTestModule { }
