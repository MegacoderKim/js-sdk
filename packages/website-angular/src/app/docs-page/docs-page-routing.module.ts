import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {DocsPageComponent} from "./docs-page.component";
import {QuickstartAndroidComponent} from "./quickstart-android/quickstart-android.component";
import {QuickstartReactnativeComponent} from "./quickstart-reactnative/quickstart-reactnative.component";
import {QuickstartIosComponent} from "./quickstart-ios/quickstart-ios.component";

const routes: Routes = [
  {path: 'quickstart/android', component: QuickstartAndroidComponent},
  {path: 'quickstart/ios', component: QuickstartIosComponent},
  {path: 'quickstart/reactnative', component: QuickstartReactnativeComponent},
  {path: '', component: DocsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsPageRoutingModule { }
