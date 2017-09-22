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
import {SnackbarComponent} from './snackbar/snackbar.component';
import {UsersStatusStringPipe} from './../pipes/users-status-string.pipe';
import {ActionStatusStringPipe} from './../pipes/action-status-string.pipe';
import {SafeHtmlPipe} from "../pipes/safe-html.pipe";
import {UserSortingStringPipe} from '../pipes/user-sorting-string.pipe';
import {ActionSortingStringPipe} from '../pipes/action-sorting-string.pipe';
import {SafeUrlPipe} from "../pipes/safe-url.pipe";
import { PluralizePipe } from '../pipes/pluralize.pipe';
import { ButtonComponent } from './button/button.component';
import { DropdownOptionsComponent } from './dropdown-options/dropdown-options.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { DropdownDirective } from './dropdown/dropdown.directive';
import {DropdownService} from "./dropdown/dropdown.service";
import { DropdownMenuDirective } from './dropdown/dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown/dropdown-toggle.directive';

@NgModule({
  imports: [
    CommonModule,
      RouterModule
  ],
  providers: [
    DropdownService
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
    SnackbarComponent,
    UsersStatusStringPipe,
    ActionStatusStringPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
    UserSortingStringPipe,
    ActionSortingStringPipe,
    PluralizePipe,
    ButtonComponent,
    DropdownOptionsComponent,
    LoadingBarComponent,
    DropdownDirective,
    DropdownToggleDirective
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
    SnackbarComponent,
    UsersStatusStringPipe,
    ActionStatusStringPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
    UserSortingStringPipe,
    ActionSortingStringPipe,
    PluralizePipe,
    DropdownOptionsComponent,
    LoadingBarComponent,
    DropdownDirective,
    DropdownToggleDirective
  ]
})
export class SharedModule { }
