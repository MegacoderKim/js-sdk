import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MapService} from "../core/map-service";
import {PopperContent} from "../popper/popper-content";

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.scss']
})
export class InfoboxComponent implements OnInit {
  @ViewChild(PopperContent) popper: PopperContent;
  @Input() item: {
    data: any,
    elem: HTMLElement,
    id: string,
    onUpdate?: any;
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
    if (this.item.onUpdate) this.item.onUpdate.subscribe((entity) => {
      this.popper.scheduleUpdate();
    })
  };

}
