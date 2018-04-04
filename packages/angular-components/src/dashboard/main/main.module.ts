import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MainRoutingModule} from "./main-routing.module";
import {MainComponent} from "./main.component";
import {InnerSharedModule} from "../shared/shared.module";
import {SidenavComponent} from "../core/sidenav/sidenav.component";
import {SearchModule} from "../core/search/search.module";
import {HeaderModule} from "../core/header/header.module";
import {MainRedirectComponent} from './main-redirect/main-redirect.component';
import {SharedModule} from "ht-angular";

let _window: any = () => {
  // return the global native browser window object
  return window;
};
if(_window().Intercom) {
  _window().Intercom("boot", {
    app_id: "cz409na0"
  });
}



@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    InnerSharedModule,
    SharedModule,
    SearchModule,
    HeaderModule
  ],
  declarations: [
      MainComponent,
      SidenavComponent,
      MainRedirectComponent,
  ]
})
export class MainModule { }
