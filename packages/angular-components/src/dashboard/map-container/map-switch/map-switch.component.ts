import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';
import {InnerMapService} from "../map.service";
import * as fromRoot from "../../reducers"
import * as fromUi from "../../actions/ui"
import {Store} from "@ngrx/store";
import {anim} from "../../../utils/animations";

@Component({
  selector: 'app-map-switch',
  templateUrl: './map-switch.component.html',
  styleUrls: ['./map-switch.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    anim.flip
  ]
})
export class MapSwitchComponent implements OnInit {
  showMapSwitch$;
  // @Input() type: string = 'list';
  constructor(
      private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.showMapSwitch$ = this.store.select(fromRoot.getUiShowMapMobile)
  }

  showMap(show: boolean = true) {
    this.store.dispatch(new fromUi.UpdateMapMobileShowAction(show))
  }

}
