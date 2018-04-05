import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main.component";

const routes: Routes = [
  { path: '', component: MainComponent, children: [
      { path: 'pricing', loadChildren: '../pricing/pricing.module#PricingModule'},
      { path: 'tech', loadChildren: '../technology-page/technology-page.module#TechnologyPageModule'},
      { path: 'docs', children: [
          { path: 'guides', children: [
              {
                path: 'action', loadChildren: '../actions-guide/actions-guide.module#ActionsGuideModule'
              }, {
                path: 'events', loadChildren: '../events-guide/events-guide.module#EventsGuideModule'
              }
            ]
          },
          { path: '', loadChildren: '../docs-page/docs-page.module#DocsPageModule'}
        ]},
      { path: 'howitworks', loadChildren: '../how-it-works-page/how-it-works-page.module#HowItWorksPageModule'},
      { path: 'faq', loadChildren: '../faq-page/faq-page.module#FaqPageModule'},
      { path: 'team', loadChildren: '../team-page/team-page.module#TeamPageModule'},
      { path: 'jobs', loadChildren: '../jobs-page/jobs-page.module#JobsPageModule'},
      { path: 'terms', loadChildren: '../terms-page/terms-page.module#TermsPageModule'},
      { path: 'privacy', loadChildren: '../privacy-page/privacy-page.module#PrivacyPageModule'},
      { path: 'actions', loadChildren: '../actions-page/actions-page.module#ActionsPageModule'},
      { path: 'usecases', loadChildren: '../usecases/usecases.module#UsecasesModule'},
      { path: 'tutorials', loadChildren: '../tutorials/tutorials.module#TutorialsModule'},
      { path: 'agreement', loadChildren: '../agreement-page/agreement-page.module#AgreementPageModule'},
      { path: 'saas-agreement', loadChildren: '../agreement-page/agreement-page.module#AgreementPageModule'},
      { path: 'primitives', loadChildren: '../building-blocks-page/building-blocks-page.module#BuildingBlocksPageModule'},
      { path: '', loadChildren: '../home-page/home-page.module#HomePageModule'}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
