import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-guide',
  templateUrl: './events-guide.component.html',
  styleUrls: ['./events-guide.component.less']
})
export class EventsGuideComponent implements OnInit {

  constructor() { }
  images = {
    hero: require('../../assets/images/guides/event-guide-hero.png'),
    slackHowTo : require('../../assets/images/guides/slack_how_to.gif')
  };
  ngOnInit() {
  }

}
