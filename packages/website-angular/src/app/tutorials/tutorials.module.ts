import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorialsRoutingModule } from './tutorials-routing.module';
import { ServiceVisitTrackingAndroidComponent } from './service-visit-tracking-android/service-visit-tracking-android.component';
import { LiveLocationSharingAndroidMessagingAppComponent } from './live-location-sharing-android-messaging-app/live-location-sharing-android-messaging-app.component';
import { TrackDeliveriesAndroidComponent } from './track-deliveries-android/track-deliveries-android.component';
import { LiveLocationSharingAndroidMarketplaceAppComponent } from './live-location-sharing-android-marketplace-app/live-location-sharing-android-marketplace-app.component';

@NgModule({
  imports: [
    CommonModule,
    TutorialsRoutingModule
  ],
  declarations: [
    ServiceVisitTrackingAndroidComponent,
    LiveLocationSharingAndroidMessagingAppComponent,
    TrackDeliveriesAndroidComponent,
    LiveLocationSharingAndroidMarketplaceAppComponent
  ]
})
export class TutorialsModule { }
