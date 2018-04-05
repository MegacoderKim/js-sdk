import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import {LiveOnboardingModule} from "../live-onboarding/live-onboarding.module";
import {BuildingBlocksSectionModule} from "../building-blocks-section/building-blocks-section.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HomePageRoutingModule,
    LiveOnboardingModule,
    SharedModule,
    BuildingBlocksSectionModule
  ],
  declarations: [HomePageComponent]
})
export class HomePageModule { }
