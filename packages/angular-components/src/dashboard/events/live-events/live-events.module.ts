import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveEventsRoutingModule } from './live-events-routing.module';
import {LiveEventComponent} from "../live-event/live-event.component";
import {LiveEventsComponent} from "./live-events.component";
import {TimelineUserModule} from "../../users/timeline-user/timeline-user.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    LiveEventsRoutingModule,
    SharedModule,
    TimelineUserModule,
  ],
  declarations: [
    LiveEventsComponent,
    LiveEventComponent
  ]
})
export class LiveEventsModule { }
