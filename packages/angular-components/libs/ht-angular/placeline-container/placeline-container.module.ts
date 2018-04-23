import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacelineContainerComponent } from './placeline-container.component';
import {PlacelineModule} from "../placeline/placeline.module";
import {UserCardModule} from "../user-card/user-card.module";
import {SharedModule} from "../shared/shared.module";
import {UserDeviceModule} from "../user-device/user-device.module";

@NgModule({
  imports: [
    CommonModule,
    PlacelineModule,
    UserCardModule,
    SharedModule,
    UserDeviceModule
  ],
  declarations: [PlacelineContainerComponent],
  exports: [PlacelineContainerComponent]
})
export class PlacelineContainerModule { }
