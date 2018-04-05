import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServiceVisitTrackingAndroidComponent} from "./service-visit-tracking-android/service-visit-tracking-android.component";
import {LiveLocationSharingAndroidMessagingAppComponent} from "./live-location-sharing-android-messaging-app/live-location-sharing-android-messaging-app.component";
import {TrackDeliveriesAndroidComponent} from "./track-deliveries-android/track-deliveries-android.component";
import {LiveLocationSharingAndroidMarketplaceAppComponent} from "./live-location-sharing-android-marketplace-app/live-location-sharing-android-marketplace-app.component";

const routes: Routes = [
  {path: 'service-visit-tracking-android', component: ServiceVisitTrackingAndroidComponent},
  {path: 'live-location-sharing-android-messaging-app', component: LiveLocationSharingAndroidMessagingAppComponent},
  {path: 'track-deliveries-android', component: TrackDeliveriesAndroidComponent},
  {path: 'live-location-sharing-android-marketplace-app', component: LiveLocationSharingAndroidMarketplaceAppComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorialsRoutingModule { }
