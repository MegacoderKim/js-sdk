import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { IosSdkComponent } from './ios-sdk/ios-sdk.component';
import { AndroidSdkComponent } from './android-sdk/android-sdk.component';
import { VideoBlockComponent } from './video-block/video-block.component';
import { ActionPickerComponent } from './action-picker/action-picker.component';
import { TrackOptionsComponent } from './track-options/track-options.component';
import { CodeBlockComponent } from './code-block/code-block.component';
import {InnerSharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    InnerSharedModule
  ],
  declarations: [
    OnboardingComponent,
    IosSdkComponent,
    AndroidSdkComponent,
    VideoBlockComponent,
    ActionPickerComponent,
    TrackOptionsComponent,
    CodeBlockComponent
  ],
  exports: [
    OnboardingComponent
  ]
})
export class OnboardingModule { }
