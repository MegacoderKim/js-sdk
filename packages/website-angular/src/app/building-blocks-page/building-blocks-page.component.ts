import { Component, OnInit } from '@angular/core';
import {Meta} from "@angular/platform-browser";
require('../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-building-blocks-page',
  templateUrl: './building-blocks-page.component.html',
  styleUrls: ['./building-blocks-page.component.less']
})
export class BuildingBlocksPageComponent implements OnInit {
  images = {
    legoBlocks: require("../../assets/images/primitives/lego_blocks.png"),
    primitivesAP: require("../../assets/images/primitives/primitives_AP-3.png"),
    userAction: require("../../assets/images/primitives/user_action.png"),
    explainer: require("../../assets/images/primitives/explainer2.png"),
    activity: require("../../assets/images/primitives/activity.png"),
    location: require("../../assets/images/primitives/location.png"),
    health: require("../../assets/images/primitives/health.png"),
    eta: require("../../assets/images/primitives/ETA.png"),
    mileage: require("../../assets/images/primitives/mileage.png"),
    status: require("../../assets/images/primitives/status.png"),
    data: require("../../assets/images/primitives/data.png"),
    visuals: require("../../assets/images/primitives/visuals.png"),
    events: require("../../assets/images/primitives/events.png"),
    screenshot: require("../../assets/images/primitives/Screenshot-2017-09-15-16.45.48.png"),
  };
  constructor(
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.metaService.updateTag({
        content: 'HyperTrack offers primitives for your location features like Activity, Location, Health, ETA, Mileage and Status via channels like Data, Visuals and Events. Develop your use case with one or several of these primitives.'
      },
      "property='description'"
    );
    this.metaService.updateTag({
        content: 'HyperTrack offers primitives for your location features like Activity, Location, Health, ETA, Mileage and Status via channels like Data, Visuals and Events. Develop your use case with one or several of these primitives.'
      },
      "property='og:description'"
    );
    this.metaService.updateTag({
        content: 'HyperTrack Primitives'
      },
      "property='title'"
    );
    this.metaService.updateTag({
        content: 'HyperTrack Primitives'
      },
      "property='og:title'"
    );
    this.metaService.updateTag({
        content: 'http://uploads.webflow.com/59b78725a162df0001f04eb9/59b78d416cae6900015fa5a3_lego_blocks-p-500.png'
      },
      "property='og:image'"
    );
  }

}
