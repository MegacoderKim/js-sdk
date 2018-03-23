import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OldPlanRoutingModule } from './old-plan-routing.module';
import { OldPlanComponent } from './old-plan.component';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { PlanSuccessComponent } from './plan-success/plan-success.component';
import {FormsModule} from '@angular/forms';
import {CleaveModule} from '../directives/cleave/cleave.module';

@NgModule({
  imports: [
    CommonModule,
    OldPlanRoutingModule,
    CleaveModule,
    FormsModule,
  ],
  declarations: [OldPlanComponent, PlanFormComponent, PlanSuccessComponent]
})
export class OldPlanModule { }
