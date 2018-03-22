import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from "./guards/auth-guard.service";

const routes: Routes = [
  { path: 'login', loadChildren: "./login/login.module#LoginModule"},
  { path: 'reset-password', loadChildren: "./reset-password/reset-password.module#ResetPasswordModule"},
  { path: 'demo', loadChildren: "./demo/demo.module#DemoModule"},
  // { path: 'signup', loadChildren: "./waitlist/waitlist.module#WaitlistModule"},
  { path: 'signup', loadChildren: "./signup/signup.module#SignupModule"},
  { path: 'signup/:accountId', loadChildren: "./signup/signup.module#SignupModule"},
  { path: 'widget', loadChildren: "./widget/widget.module#WidgetModule"},
  { path: 'verify/:userId/verify_email/:verificationCode', loadChildren: "./verification/verification.module#VerificationModule"},
  { path: 'onboarding', loadChildren: "./onboarding-setup/onboarding-setup.module#OnboardingSetupModule"},
  {path: 'saas-agreement', loadChildren: "./saas-agreement/saas-agreement.module#SaasAgreementModule"},
  { path: 'debug', loadChildren: "./staff/staff.module#StaffModule", canActivate: [AuthGuardService]},
  { path: '', loadChildren: "./main/main.module#MainModule", canActivate: [AuthGuardService]},
  { path: "", redirectTo: 'map/users', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
