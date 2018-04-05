import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExpandedCodeBlockComponent} from "./shared/components/expanded-code-block/expanded-code-block.component";

const routes: Routes = [
  { path: 'live-onboarding', loadChildren: './live-onboarding/live-onboarding.module#LiveOnboardingModule'},
  { path: 'login', loadChildren: './redirect-component/redirect-component.module#RedirectComponentModule'},
  { path: 'signup', loadChildren: './signup-page/signup-page.module#SignupPageModule'},
  { path: 'testonboarding', loadChildren: './onboarding/onboarding.module#OnboardingModule'},
  {path: 'testcodeblock', component: ExpandedCodeBlockComponent},
  { path: '', loadChildren: './main/main.module#MainModule'},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
