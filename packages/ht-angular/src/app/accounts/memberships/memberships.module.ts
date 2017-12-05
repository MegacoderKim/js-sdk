import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipsComponent } from './memberships.component';
import { MembershipsService } from '../memberships.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MembershipsComponent],
  exports: [MembershipsComponent],
})
export class MembershipsModule { }
