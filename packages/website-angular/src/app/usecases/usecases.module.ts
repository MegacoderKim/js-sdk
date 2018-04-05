import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsecasesRoutingModule } from './usecases-routing.module';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { WorkforceMonitoringComponent } from './workforce-monitoring/workforce-monitoring.component';
import { MileageTrackingComponent } from './mileage-tracking/mileage-tracking.component';
import { LocationBasedAssignmentComponent } from './location-based-assignment/location-based-assignment.component';
import { LiveLocationSharingComponent } from './live-location-sharing/live-location-sharing.component';
import { ProfilingUserPlacesComponent } from './profiling-user-places/profiling-user-places.component';
import { AppsForConsumersComponent } from './apps-for-consumers/apps-for-consumers.component';
import { AppsForWorkComponent } from './apps-for-work/apps-for-work.component';
import {SharedModule} from "../shared/shared.module";
import { UsecasesComponent } from './usecases.component';

@NgModule({
  imports: [
    CommonModule,
    UsecasesRoutingModule,
    SharedModule
  ],
  declarations: [
    OrderTrackingComponent,
    WorkforceMonitoringComponent,
    MileageTrackingComponent,
    LocationBasedAssignmentComponent,
    LiveLocationSharingComponent,
    ProfilingUserPlacesComponent,
    AppsForConsumersComponent,
    AppsForWorkComponent,
    UsecasesComponent
  ]
})
export class UsecasesModule { }
