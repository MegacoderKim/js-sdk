import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SafeHtmlPipe} from "../pipes/safe-html.pipe";
import {SafeUrlPipe} from "../pipes/safe-url.pipe";
import { CustomerStoriesComponent } from './sections/customer-stories/customer-stories.component';
import { UsecaseTutorialsComponent } from './sections/usecase-tutorials/usecase-tutorials.component';
import { ReinventWheelComponent } from './sections/reinvent-wheel/reinvent-wheel.component';
import { ExplainerDigramComponent } from './sections/explainer-digram/explainer-digram.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignupComponent } from './components/signup/signup.component';
import { CommonCtaComponent } from './sections/common-cta/common-cta.component';
import { CodeBlockComponent } from './components/code-block/code-block.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import {ModalModule} from "../modal/modal.module";
import { IframeModalComponent } from './components/iframe-modal/iframe-modal.component';
import { VideoModalComponent } from './components/video-modal/video-modal.component';
import { ExpandedCodeBlockComponent } from './components/expanded-code-block/expanded-code-block.component';
import { ExpandedCodeModalComponent } from './components/expanded-code-modal/expanded-code-modal.component';
import { ScrollToDirective } from '../directives/scroll-to.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [
    SafeHtmlPipe,
    SafeUrlPipe,
    CustomerStoriesComponent,
    UsecaseTutorialsComponent,
    ReinventWheelComponent,
    ExplainerDigramComponent,
    SignupComponent,
    CommonCtaComponent,
    CodeBlockComponent,
    SignupModalComponent,
    IframeModalComponent,
    VideoModalComponent,
    ExpandedCodeBlockComponent,
    ExpandedCodeModalComponent,
    ScrollToDirective
  ],
  exports: [
    SafeHtmlPipe,
    SafeUrlPipe,
    CustomerStoriesComponent,
    UsecaseTutorialsComponent,
    ReinventWheelComponent,
    ExplainerDigramComponent,
    SignupComponent,
    CommonCtaComponent,
    CodeBlockComponent,
    SignupModalComponent,
    IframeModalComponent,
    VideoModalComponent,
    ExpandedCodeBlockComponent,
    ExpandedCodeModalComponent,
    ScrollToDirective
  ]
})
export class SharedModule { }
