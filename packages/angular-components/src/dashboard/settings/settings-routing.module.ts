import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from "./settings.component";
import {AccountProfileComponent} from "./account-profile/account-profile.component";
import {UserAccountComponent} from "./user-account/user-account.component";
import {BillingComponent} from "./billing/billing.component";
import {TeamComponent} from "./team/team.component";

const routes: Routes = [
  { path: 'settings', component: SettingsComponent, children: [
    { path: 'profile', component: AccountProfileComponent},
    { path: 'billing', component: BillingComponent},
    { path: 'team', component: TeamComponent},
    { path: '', component: UserAccountComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SettingsRoutingModule { }
