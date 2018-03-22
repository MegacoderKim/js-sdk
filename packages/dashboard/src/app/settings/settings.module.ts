import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { BillingComponent } from './billing/billing.component';
import { TeamComponent } from './team/team.component';
import { SettingsEditorComponent } from './settings-editor/settings-editor.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
// import {GraphsModule} from "../graphs/graphs.module";
import { WebhooksComponent } from './webhooks/webhooks.component';
import { WebhooksOptionsComponent } from './webhooks/webhooks-options/webhooks-options.component';
import {BillingFormModule} from "./billing-form/billing-form.module";
import { InvoicesComponent } from './invoices/invoices.component';
import {SdkControlModule} from "./sdk-control/sdk-control.module";
import { PlanOptionsComponent } from './plan-options/plan-options.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FormsModule,
    // GraphsModule,
    BillingFormModule,
    SdkControlModule
  ],
  declarations: [
    SettingsComponent,
    AccountProfileComponent,
    UserAccountComponent,
    BillingComponent,
    TeamComponent,
    SettingsEditorComponent,
    WebhooksComponent,
    WebhooksOptionsComponent,
    InvoicesComponent,
    PlanOptionsComponent
  ]
})
export class SettingsModule { }
