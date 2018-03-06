import {Component, OnInit, Optional} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HtMapService} from "ht-angular";
import {environment} from "../../environments/environment";
import {HtRequestService} from "ht-angular";

@Component({
  selector: 'app-tracking-container',
  templateUrl: './tracking-container.component.html',
  styleUrls: ['./tracking-container.component.scss']
})
export class TrackingContainerComponent implements OnInit {
  shortCode;
  constructor(
    private route: ActivatedRoute,
    private mapService: HtMapService,
    requestService: HtRequestService
  ) {
    requestService.setClientType('hypertrack/trct.at');
    let add = window.devicePixelRatio > 1 ? '@2x' : '';
    const key = environment.mapKey;
    const tileUrl = environment.tileUrl;
    if (tileUrl) {
      const url = `${tileUrl}${add}.png?key=${key}`;
      this.mapService.mapInstance.mapUtils.setDefaultMapOptions({tileLayerUrl: url, tileLayerOptions: {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }});
    }

  }

  ngOnInit() {
    this.shortCode = this.route.snapshot.paramMap.get('shortCode');
  }

}
