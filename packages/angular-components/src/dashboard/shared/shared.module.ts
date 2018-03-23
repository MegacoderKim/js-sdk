import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from "../modal/modal.module";
import {DropdownDirective} from './dropdown.directive';
import {CardComponent} from './card/card.component';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule} from "@angular/router";
import {BatteryIconComponent} from './battery-icon/battery-icon.component';
import {TimeStringPipe} from "../pipes/time-string.pipe";
import {DateStringPipe} from "../pipes/date-string.pipe";
import {NameCasePipe} from "../pipes/name-case.pipe";
import {DotPipe} from "../pipes/dot.pipe";
import {LoadingDotsComponent} from './loading-dots/loading-dots.component';
import {LoadingDataComponent} from './loading-data/loading-data.component';
import {StickyDirective} from './sticky.directive';
import {ListComponent} from "./list.component";
import {PaginationComponent} from './pagination/pagination.component';
import {ScrollEndDirective} from './scroll-end.directive';
import {DateHumanizePipe} from "../pipes/date-humanize.pipe";
import {AnalyticsCommon} from "./analytics";
import {TooltipContent} from "./tooltip/tooltip-content";
import {Tooltip} from "./tooltip/tooltip.directive";
import {DistanceLocalePipe} from './../pipes/distance-locale.pipe';
import {HmStringPipe} from './../pipes/hm-string.pipe';
import {TimelineComponent} from "../users/timeline/timeline.component";
import {SnackbarComponent} from './snackbar/snackbar.component';
import {UsersStatusStringPipe} from './../pipes/users-status-string.pipe';
import {ScrollTopDirective} from './scroll-top.directive';
import {ActionStatusStringPipe} from './../pipes/action-status-string.pipe';
import {SafeHtmlPipe} from "../pipes/safe-html.pipe";
import {SignupContainerComponent} from './signup-container/signup-container.component';
import {LoginContainerComponent} from './login-container/login-container.component';
import {UserSortingStringPipe} from '../pipes/user-sorting-string.pipe';
import {ActionSortingStringPipe} from '../pipes/action-sorting-string.pipe';
import {SafeUrlPipe} from "../pipes/safe-url.pipe";
import { CopyDirective } from './copy.directive';
import { PluralizePipe } from '../pipes/pluralize.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule
  ],
  declarations: [
    DropdownDirective,
    CardComponent,
    ProfileComponent,
    BatteryIconComponent,
    DateStringPipe,
    TimeStringPipe,
    DotPipe,
    NameCasePipe,
    LoadingDotsComponent,
    LoadingDataComponent,
    StickyDirective,
    ListComponent,
    PaginationComponent,
    ScrollEndDirective,
    DateHumanizePipe,
    AnalyticsCommon,
    Tooltip,
    TooltipContent,
    DistanceLocalePipe,
    HmStringPipe,
    TimelineComponent,
    SnackbarComponent,
    UsersStatusStringPipe,
    ScrollTopDirective,
    ActionStatusStringPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
    SignupContainerComponent,
    LoginContainerComponent,
    UserSortingStringPipe,
    ActionSortingStringPipe,
    CopyDirective,
    PluralizePipe
  ],
  exports: [
    DropdownDirective,
    CardComponent,
    ProfileComponent,
    BatteryIconComponent,
    DateStringPipe,
    TimeStringPipe,
    DotPipe,
    NameCasePipe,
    LoadingDotsComponent,
    LoadingDataComponent,
    StickyDirective,
    PaginationComponent,
    ScrollEndDirective,
    DateHumanizePipe,
    AnalyticsCommon,
    Tooltip,
    TooltipContent,
    DistanceLocalePipe,
    HmStringPipe,
    TimelineComponent,
    SnackbarComponent,
    UsersStatusStringPipe,
    ScrollTopDirective,
    ActionStatusStringPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
    SignupContainerComponent,
    LoginContainerComponent,
    UserSortingStringPipe,
    ActionSortingStringPipe,
    CopyDirective,
    PluralizePipe
  ],
  entryComponents: [
    TooltipContent
  ]
})
export class SharedModule { }
