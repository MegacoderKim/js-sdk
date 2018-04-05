import { Component, OnInit } from '@angular/core';
import {ExternalAnalyticsService} from "../../../services/external-analytics.service";

@Component({
  selector: 'app-explainer-digram',
  templateUrl: './explainer-digram.component.html',
  styleUrls: ['./explainer-digram.component.less']
})
export class ExplainerDigramComponent implements OnInit {
  images= {
    explainerUpdated: require('../../../../assets/images/explainer/explainer_updated.png'),
    explainerImage: require('../../../../assets/images/hypertrack-explainer.svg'),
    app: require('../../../../assets/images/app.svg'),
    server: require('../../../../assets/images/server.svg'),
    arrow: require('../../../../assets/images/explainer-arrow.svg'),
    data: require('../../../../assets/images/data.svg'),
    api: require('../../../../assets/images/api.svg'),
    dashboard: require('../../../../assets/images/explainer-dashboard.svg'),
    track: require('../../../../assets/images/track.svg'),
    slack: require('../../../../assets/images/explainer-slack.svg'),
    webhooks: require('../../../../assets/images/webhooks.svg'),
  };
  constructor(
    private externalAnalyticsService: ExternalAnalyticsService
  ) { }


  ngOnInit() {
  }

  onExplainerComponentClick(component) {
    switch (component) {
      case 'sdks':
        this.openExplainerLink('https://docs.hypertrack.com/sdks/');
        break;
      case 'actions':
        this.openExplainerLink('https://www.hypertrack.com/actions');
        break;
      case 'hypertrack-cloud':
        this.openExplainerLink('https://www.hypertrack.com/blog/2016/09/11/our-framework-for-real-time-filtering-of-location-streams/');
        break;
      case 'events':
        this.openExplainerLink('https://docs.hypertrack.com/events/');
        break;
      case 'apis':
        this.openExplainerLink('https://docs.hypertrack.com/api/');
        break;
      case 'widgets':
        this.openExplainerLink('https://docs.hypertrack.com/dashboard/widgets.html');
        break;
      case 'tracking-experience':
        this.openExplainerLink('https://docs.hypertrack.com/usecases/livetracking/javascript/');
        break;
      case 'slack':
        this.openExplainerLink('https://docs.hypertrack.com/events/slack.html');
        break;
      case 'webhooks':
        this.openExplainerLink('https://docs.hypertrack.com/events/webhook.html');
        break;
    }
    this.externalAnalyticsService.logSegmentEvent( "Component clicked", "interaction", "hiw-diagram", {
      component: component || ''
    })
  }

  openExplainerLink(link) {
    window.location.href = link;
    // window.open(link);
  }

}
