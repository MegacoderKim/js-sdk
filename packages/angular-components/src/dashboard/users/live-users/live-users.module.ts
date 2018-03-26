import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LiveUsersRoutingModule} from "./live-users-routing.module";
import {LiveUsersComponent} from "./live-users.component";
import {SharedModule} from "../../shared/shared.module";
import {ActiveUserComponent} from "./active-user/active-user.component";
import {TimelineUserModule} from "../timeline-user/timeline-user.module";
import {GraphsModule} from "../../graphs/graphs.module";

@NgModule({
  imports: [
    CommonModule,
    LiveUsersRoutingModule,
      SharedModule,
      TimelineUserModule,
      GraphsModule,
  ],
  declarations: [
      LiveUsersComponent,
    ActiveUserComponent,
  ]
})
export class LiveUsersModule { }