import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { TraceEventsComponent } from './trace-events/trace-events.component';
import {MapContainerModule} from "../map-container/map-container.module";
import {InnerSharedModule} from "../shared/shared.module";
import { EventTraceService } from './event-trace.service';
import {UserDeviceModule} from "../user-device/user-device.module";
import {MapModule, SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    StaffRoutingModule,
    MapContainerModule,
    SharedModule,
    InnerSharedModule,
    UserDeviceModule,
    MapModule
  ],
  declarations: [StaffComponent, TraceEventsComponent],
  exports: [StaffComponent],
  providers: [EventTraceService]
})
export class StaffModule { }
