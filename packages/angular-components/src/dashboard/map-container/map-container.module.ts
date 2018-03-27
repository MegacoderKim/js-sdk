import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MapContainerComponent} from "./map-container.component";
import {SharedModule} from "../shared/shared.module";
import {ReplayComponent} from './replay/replay.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MapSwitchModule} from "./map-switch/map-switch.module";
import {UserCardModule} from "../users/user-card/user-card.module";
import {MapContainerRoutingModule} from "./map-container-routing.module";
import {MapModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
      SharedModule,
      FormsModule,
      RouterModule,
      MapSwitchModule,
    UserCardModule,
    MapModule
    // MapContainerRoutingModule
    // PlacelineMobileModule
  ],
  declarations: [
      MapContainerComponent,
      ReplayComponent
  ],
  exports: [
      MapContainerComponent
  ]
})
export class MapContainerModule { }
