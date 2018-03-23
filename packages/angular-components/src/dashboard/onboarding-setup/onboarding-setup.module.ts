import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingSetupRoutingModule } from './onboarding-setup-routing.module';
import { OnboardingSetupComponent } from './onboarding-setup.component';
import {IosSdkComponent} from "./ios-sdk/ios-sdk.component";
import {AndroidSdkComponent} from "./android-sdk/android-sdk.component";
import {ReactNativeSdkComponent} from "./react-native-sdk/react-native-sdk.component";
import {LiveOnboardingComponent} from "./live-onboarding/live-onboarding.component";
import {ExpandedCodeModalComponent} from "./expanded-code-modal/expanded-code-modal.component";
import {ExpandedCodeBlockComponent} from "./expanded-code-block/expanded-code-block.component";
import {CodeBlockComponent} from "./code-block/code-block.component";
import {IframeModalComponent} from "./iframe-modal/iframe-modal.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {ModalModule} from "../modal/modal.module";
import {MailDeveloperModalComponent} from "./mail-developer-modal/mail-developer-modal.component";
import {OnboardingModule} from '../onboarding/onboarding.module';

@NgModule({
  imports: [
    CommonModule,
    OnboardingSetupRoutingModule,
    SharedModule,
    ModalModule,
    FormsModule,
    OnboardingModule
  ],
  declarations: [
    OnboardingSetupComponent,
    IosSdkComponent,
    AndroidSdkComponent,
    ReactNativeSdkComponent,
    LiveOnboardingComponent,
    ExpandedCodeModalComponent,
    ExpandedCodeBlockComponent,
    CodeBlockComponent,
    IframeModalComponent,
    MailDeveloperModalComponent
  ],
  exports: [
    OnboardingSetupComponent
  ]
})
export class OnboardingSetupModule { }
