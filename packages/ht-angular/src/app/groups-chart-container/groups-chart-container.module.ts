import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsChartContainerComponent } from './groups-chart-container.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [GroupsChartContainerComponent],
  exports: [GroupsChartContainerComponent]
})
export class GroupsChartContainerModule { }
