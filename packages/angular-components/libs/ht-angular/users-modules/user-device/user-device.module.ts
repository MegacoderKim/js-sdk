import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDeviceComponent } from './user-device.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserDeviceComponent],
  exports: [UserDeviceComponent]
})
export class UserDeviceModule { }
