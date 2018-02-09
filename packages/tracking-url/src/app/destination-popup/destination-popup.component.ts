import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PopperContent} from "../popper/popper-content";
import {MapService} from "../core/map-service";
import {IAction, IPlace} from "ht-models";

@Component({
  selector: 'app-destination-popup',
  templateUrl: './destination-popup.component.html',
  styleUrls: ['./destination-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationPopupComponent implements OnInit, AfterViewInit {
  @ViewChild(PopperContent) popper: PopperContent;
  @Input() item: {
    data: any,
    elem: HTMLElement
  };
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

  getDestinationName(action: IAction): string {
    const place: IPlace = action.completed_place || action.expected_place;
    if(place) {
      return place.name;
    } else {
      return ""
    }
  }

}
