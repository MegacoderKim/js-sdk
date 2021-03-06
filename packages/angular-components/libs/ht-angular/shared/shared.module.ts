import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule} from "@angular/router";
import {BatteryIconComponent} from './battery-icon/battery-icon.component';
import {TimeStringPipe} from "../pipes/time-string.pipe";
import {DateStringPipe} from "../pipes/date-string.pipe";
import {NameCasePipe} from "../pipes/name-case.pipe";
import {DotPipe} from "../pipes/dot.pipe";
import {LoadingDotsComponent} from './loading-dots/loading-dots.component';
import {LoadingDataComponent} from './loading-data/loading-data.component';
import {DateHumanizePipe} from "../pipes/date-humanize.pipe";
import {DistanceLocalePipe} from './../pipes/distance-locale.pipe';
import {HmStringPipe} from './../pipes/hm-string.pipe';
import {UsersStatusStringPipe} from './../pipes/users-status-string.pipe';
import {ActionStatusStringPipe} from './../pipes/action-status-string.pipe';
import {UserSortingStringPipe} from '../pipes/user-sorting-string.pipe';
import {ActionSortingStringPipe} from '../pipes/action-sorting-string.pipe';
import {SafeUrlPipe} from "../pipes/safe-url.pipe";
import { PluralizePipe } from '../pipes/pluralize.pipe';
import { ButtonComponent } from './button/button.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { TimeToComponent } from './time-to/time-to.component';
import { AutoHeightComponent } from './auto-height/auto-height.component';

@NgModule({
  imports: [
    CommonModule,
      RouterModule
  ],
  declarations: [
    ProfileComponent,
    BatteryIconComponent,
    DateStringPipe,
    TimeStringPipe,
    DotPipe,
    NameCasePipe,
    LoadingDotsComponent,
    LoadingDataComponent,
    DateHumanizePipe,
      DistanceLocalePipe,
      HmStringPipe,
    UsersStatusStringPipe,
    ActionStatusStringPipe,
    SafeUrlPipe,
    UserSortingStringPipe,
    ActionSortingStringPipe,
    PluralizePipe,
    ButtonComponent,
    LoadingBarComponent,
    DropdownDirective,
    TimeToComponent,
    AutoHeightComponent,
  ],
  exports: [
    ProfileComponent,
    BatteryIconComponent,
    DateStringPipe,
    TimeStringPipe,
    DotPipe,
    NameCasePipe,
    LoadingDotsComponent,
    LoadingDataComponent,
    DateHumanizePipe,
    DistanceLocalePipe,
    HmStringPipe,
    UsersStatusStringPipe,
    ActionStatusStringPipe,
    SafeUrlPipe,
    UserSortingStringPipe,
    ActionSortingStringPipe,
    PluralizePipe,
    LoadingBarComponent,
    DropdownDirective,
    TimeToComponent,
    AutoHeightComponent,
  ]
})
export class SharedModule { }
