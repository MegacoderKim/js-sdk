import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsContainerComponent } from './groups-container.component';
import {GroupsModule} from "../groups/groups.module";

@NgModule({
  imports: [
    CommonModule,
    GroupsModule
  ],
  declarations: [GroupsContainerComponent],
  exports: [GroupsContainerComponent]
})
export class GroupsContainerModule { }
