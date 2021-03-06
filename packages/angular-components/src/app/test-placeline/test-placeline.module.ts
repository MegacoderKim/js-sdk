import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestPlacelineRoutingModule } from './test-placeline-routing.module';
import { TestPlacelineComponent } from './test-placeline.component';
import {PlacelineMapContainerModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    TestPlacelineRoutingModule,
    PlacelineMapContainerModule
  ],
  declarations: [TestPlacelineComponent]
})
export class TestPlacelineModule { }
