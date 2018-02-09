import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import { IAction } from "ht-models";
import {PopperContent} from "../popper/popper-content";
import {MapService} from "../core/map-service";

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPopupComponent implements OnInit {
  @Input() item: {
    data: IAction,
    elem: HTMLElement,
    id: string,
    onUpdate?: any;
  };
  @ViewChild(PopperContent) popper: PopperContent;
  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const mapUtils = this.mapService.mapInstance.mapUtils;
    const map = this.mapService.mapInstance.map;
    mapUtils.onEvent(map, 'move', () => {
      this.popper.scheduleUpdate();
    });

    if (this.item.onUpdate) this.item.onUpdate.subscribe((entity) => {
      this.popper.scheduleUpdate();
    })
  }

}
