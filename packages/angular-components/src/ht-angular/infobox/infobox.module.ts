import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoboxComponent } from './infobox.component';
import {PopperModule} from "../popper/popper.module";

@NgModule({
  imports: [
    CommonModule,
    PopperModule
  ],
  declarations: [InfoboxComponent],
  exports: [InfoboxComponent]
})
export class InfoboxModule { }
