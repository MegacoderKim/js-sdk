import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveEventsRoutingModule } from './live-events-routing.module';
import {LiveEventComponent} from "../live-event/live-event.component";
import {LiveEventsComponent} from "./live-events.component";
import {TimelineUserModule} from "../../users/timeline-user/timeline-user.module";
import {InnerSharedModule} from "../../shared/shared.module";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    LiveEventsRoutingModule,
    InnerSharedModule,
    SharedModule,
    TimelineUserModule,
  ],
  declarations: [
    LiveEventsComponent,
    LiveEventComponent
  ]
})
export class LiveEventsModule { }
