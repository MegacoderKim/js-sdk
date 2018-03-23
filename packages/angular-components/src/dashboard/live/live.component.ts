import { Component, OnInit } from '@angular/core';
import {ContainerService} from "../container/container.service";

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.less']
})
export class LiveComponent implements OnInit {

  constructor(
      private containerService: ContainerService
  ) {

  }

  ngOnInit() {
    this.containerService.setView('map')
  }

}
