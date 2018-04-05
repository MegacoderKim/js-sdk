import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderTrackingComponent} from "./order-tracking/order-tracking.component";
import {WorkforceMonitoringComponent} from "./workforce-monitoring/workforce-monitoring.component";
import {MileageTrackingComponent} from "./mileage-tracking/mileage-tracking.component";
import {LocationBasedAssignmentComponent} from "./location-based-assignment/location-based-assignment.component";
import {LiveLocationSharingComponent} from "./live-location-sharing/live-location-sharing.component";
import {ProfilingUserPlacesComponent} from "./profiling-user-places/profiling-user-places.component";
import {AppsForConsumersComponent} from "./apps-for-consumers/apps-for-consumers.component";
import {AppsForWorkComponent} from "./apps-for-work/apps-for-work.component";
import {UsecasesComponent} from "./usecases.component";

const routes: Routes = [
  {path: 'order-tracking', component: OrderTrackingComponent},
  {path: 'workforce-monitoring', component: WorkforceMonitoringComponent},
  {path: 'mileage-tracking', component: MileageTrackingComponent},
  {path: 'location-based-assignment', component: LocationBasedAssignmentComponent},
  {path: 'live-location-sharing', component: LiveLocationSharingComponent},
  {path: 'profiling-user-places', component: ProfilingUserPlacesComponent},
  {path: 'apps-for-consumers', component: AppsForConsumersComponent},
  {path: 'apps-for-work', component: AppsForWorkComponent},
  {path: '', component: UsecasesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsecasesRoutingModule { }
