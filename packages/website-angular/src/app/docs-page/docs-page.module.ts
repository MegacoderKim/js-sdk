import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsPageComponent } from './docs-page.component';
import {DocsPageRoutingModule} from "./docs-page-routing.module";
import { QuickstartAndroidComponent } from './quickstart-android/quickstart-android.component';
import {OnboardingModule} from "../onboarding/onboarding.module";
import {LiveOnboardingModule} from "../live-onboarding/live-onboarding.module";
import {SharedModule} from "../shared/shared.module";
import {BuildingBlocksSectionModule} from "../building-blocks-section/building-blocks-section.module";
import { QuickstartIosComponent } from './quickstart-ios/quickstart-ios.component';
import { QuickstartReactnativeComponent } from './quickstart-reactnative/quickstart-reactnative.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    DocsPageRoutingModule,
    OnboardingModule,
    LiveOnboardingModule,
    SharedModule,
    RouterModule,
    BuildingBlocksSectionModule
  ],
  declarations: [
    DocsPageComponent,
    QuickstartAndroidComponent,
    QuickstartIosComponent,
    QuickstartReactnativeComponent
  ]
})
export class DocsPageModule { }
