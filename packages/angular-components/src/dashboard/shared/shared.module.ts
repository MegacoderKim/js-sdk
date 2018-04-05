import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from "../modal/modal.module";
import {DropdownDirective} from './dropdown.directive';
import {CardComponent} from './card/card.component';
import {RouterModule} from "@angular/router";
import {LoadingDataComponent} from './loading-data/loading-data.component';
import {StickyDirective} from './sticky.directive';
import {ListComponent} from "./list.component";
import {PaginationComponent} from './pagination/pagination.component';
import {ScrollEndDirective} from './scroll-end.directive';
import {TooltipContent} from "./tooltip/tooltip-content";
import {Tooltip} from "./tooltip/tooltip.directive";
import {SnackbarComponent} from './snackbar/snackbar.component';
import {ScrollTopDirective} from './scroll-top.directive';
import {SafeHtmlPipe} from "../pipes/safe-html.pipe";
import {SignupContainerComponent} from './signup-container/signup-container.component';
import {LoginContainerComponent} from './login-container/login-container.component';
import { CopyDirective } from './copy.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule,
  ],
  declarations: [
    DropdownDirective,
    CardComponent,
    LoadingDataComponent,
    StickyDirective,
    ListComponent,
    PaginationComponent,
    ScrollEndDirective,
    Tooltip,
    TooltipContent,
    SnackbarComponent,
    ScrollTopDirective,
    SafeHtmlPipe,
    SignupContainerComponent,
    LoginContainerComponent,
    CopyDirective,
  ],
  exports: [
    DropdownDirective,
    CardComponent,
    LoadingDataComponent,
    StickyDirective,
    PaginationComponent,
    ScrollEndDirective,
    Tooltip,
    TooltipContent,
    SnackbarComponent,
    ScrollTopDirective,
    SafeHtmlPipe,
    SignupContainerComponent,
    LoginContainerComponent,
    CopyDirective,
  ],
  entryComponents: [
    TooltipContent
  ]
})
export class InnerSharedModule { }
