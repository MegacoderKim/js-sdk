import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupTestRoutingModule } from './group-test-routing.module';
import { GroupTestComponent } from './group-test.component';
import {UsersMapContainerModule} from "../users-map-container/users-map-container.module";
import {GroupKeyResolver} from "../guard/group-key-resolver";
import {GroupLookupKeyResolver} from "../guard/group-lookup-key-resolver";

@NgModule({
  imports: [
    CommonModule,
    GroupTestRoutingModule,
    UsersMapContainerModule
  ],
  declarations: [GroupTestComponent],
  providers: [GroupKeyResolver, GroupLookupKeyResolver],
})
export class GroupTestModule { }
