import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MapContainerComponent} from "./map-container.component";
import {InnerSharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MapSwitchModule} from "./map-switch/map-switch.module";
import {UserCardModule} from "../users/user-card/user-card.module";
import {MapContainerRoutingModule} from "./map-container-routing.module";
import {MapModule, SharedModule} from "ht-angular";
import {ReplayModule} from "./replay/replay.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InnerSharedModule,
      RouterModule,
      MapSwitchModule,
    UserCardModule,
    MapModule,
    ReplayModule,
    // MapContainerRoutingModule
    // PlacelineMobileModule
  ],
  declarations: [
      MapContainerComponent,
  ],
  exports: [
      MapContainerComponent
  ]
})
export class MapContainerModule { }
