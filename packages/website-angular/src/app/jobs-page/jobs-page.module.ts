import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsPageRoutingModule } from './jobs-page-routing.module';
import { JobsPageComponent } from './jobs-page.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    JobsPageRoutingModule,
    SharedModule
  ],
  declarations: [JobsPageComponent]
})
export class JobsPageModule { }
