import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsGuideComponent } from './events-guide.component';
import {EventsGuideRoutingModule} from "./events-guide-routing.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    EventsGuideRoutingModule,
    SharedModule,
    RouterModule
  ],
  declarations: [EventsGuideComponent]
})
export class EventsGuideModule { }
