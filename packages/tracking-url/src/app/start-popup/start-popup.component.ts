import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PopperContent} from "../popper/popper-content";
import {MapService} from "../core/map-service";
import {IAction, IPlace} from "ht-models";

@Component({
  selector: 'app-start-popup',
  templateUrl: './start-popup.component.html',
  styleUrls: ['./start-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartPopupComponent implements OnInit {
  @Input() item: {
    data: any,
    elem: HTMLElement,
    id: string
  };
  @ViewChild(PopperContent) popper: PopperContent;
  constructor(private mapService: MapService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const mapUtils = this.mapService.mapInstance.mapUtils;
    const map = this.mapService.mapInstance.map;
    mapUtils.onEvent(map, 'move', () => {
      this.popper.scheduleUpdate();
    });
  };

  getStartName(action: IAction): string {
    const place: IPlace = action.started_place;
    if(place) {
      return place.name;
    } else {
      return ""
    }
  }

}
