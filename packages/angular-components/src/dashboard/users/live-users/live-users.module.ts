import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LiveUsersRoutingModule} from "./live-users-routing.module";
import {LiveUsersComponent} from "./live-users.component";
import {InnerSharedModule} from "../../shared/shared.module";
import {ActiveUserComponent} from "./active-user/active-user.component";
import {TimelineUserModule} from "../timeline-user/timeline-user.module";
import {SharedModule, UsersSummaryModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    LiveUsersRoutingModule,
      InnerSharedModule,
    SharedModule,
      TimelineUserModule,
    UsersSummaryModule
  ],
  declarations: [
      LiveUsersComponent,
    ActiveUserComponent,
  ]
})
export class LiveUsersModule { }
