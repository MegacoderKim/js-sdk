import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-building-blocks-section',
  templateUrl: './building-blocks-section.component.html',
  styleUrls: ['./building-blocks-section.component.less']
})
export class BuildingBlocksSectionComponent implements OnInit {
  images = {
    playButton: require('../../assets/images/hyperstart/playButton.svg')
  };
  showVideoPopup: boolean = false;
  constructor() { }

  openHyperTrackVideo() {
    this.showVideoPopup = true;
  }

  closeVideoPopup() {
    this.showVideoPopup = false;
  }

  ngOnInit() {
  }

}
