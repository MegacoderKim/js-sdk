import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {MainRedirectComponent} from "./main-redirect/main-redirect.component";
import {ContainerGuardGuard} from "../guards/container-guard.guard";

export const mainRoutes: Routes = [
  { path: 'invite-users', loadChildren: "../ht-live/invite/invite.module#InviteModule"},
  { path: '23442xdv', loadChildren: "../old-plan/old-plan.module#OldPlanModule"},
  {path: 'payment', loadChildren: "../payment/payment.module#PaymentModule"},
  {path: 'setup', loadChildren: "../setup-guide/setup-guide.module#SetupGuideModule"},
  // {path: 'onboarding-setup', loadChildren: "../onboarding-setup/onboarding-setup.module#OnboardingSetupModule"},
  { path: 'blocked', loadChildren: "../block/block.module#BlockModule"},
  { path: 'analytics', loadChildren: "../analytics/analytics.module#AnalyticsModule"},
  { path: 'users', loadChildren: "../users-map/users-map.module#UsersMapModule"},
  { path: 'users', loadChildren: "../users-list/users-list.module#UsersListModule"},
  {path: '', loadChildren: "../settings/settings.module#SettingsModule"},
  {path: '', loadChildren: "../container/container.module#ContainerModule", canActivate: [ContainerGuardGuard]},
];

const routes: Routes = [
  {path: 'agreement', loadChildren: "../agreement/agreement.module#AgreementModule"},
  { path: 'roll-key', loadChildren: "../account/key-roll/key-roll.module#KeyRollModule"},
  { path: '', component: MainRedirectComponent },
  { path: '', component: MainComponent, children: mainRoutes }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MainRoutingModule { }
