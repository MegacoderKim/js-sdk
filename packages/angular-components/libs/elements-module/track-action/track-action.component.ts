import { Component, OnInit, Input } from '@angular/core';
import { HtClientService, HtMapService } from 'ht-angular';

@Component({
  selector: 'track-action',
  templateUrl: './track-action.component.html',
  styleUrls: ['./track-action.component.scss']
})
export class TrackActionComponent implements OnInit {
  @Input() shortCode: string;
  
  constructor(private clientService: HtClientService, private mapService: HtMapService) {}

  ngOnInit() {
    // console.log(this.userId);
    // console.log(this.clientService)
    // this.clientService.token = this.token;
    if(!this.shortCode || this.shortCode.length === 0) {
      console.error(`shortCode attribute must be provided!`);
    }
  }

}
