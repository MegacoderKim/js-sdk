import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TtdComponent } from './ttd.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  imports: [
    CommonModule,
    AmazingTimePickerModule
  ],
  declarations: [TtdComponent],
  exports: [TtdComponent]
})
export class TtdModule { }
