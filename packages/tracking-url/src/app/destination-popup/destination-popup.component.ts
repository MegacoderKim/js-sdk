import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PopperContent} from "../popper/popper-content";
import {MapService} from "../core/map-service";

@Component({
  selector: 'app-destination-popup',
  templateUrl: './destination-popup.component.html',
  styleUrls: ['./destination-popup.component.scss']
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
    })
  }

}
