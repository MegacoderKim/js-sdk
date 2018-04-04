import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdkControlComponent } from './sdk-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SdkControlComponent],
  exports: [SdkControlComponent]
})
export class SdkControlModule { }
