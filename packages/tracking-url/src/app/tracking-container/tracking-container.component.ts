import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tracking-container',
  templateUrl: './tracking-container.component.html',
  styleUrls: ['./tracking-container.component.scss']
})
export class TrackingContainerComponent implements OnInit {
  shortCode;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.shortCode = this.route.snapshot.paramMap.get('shortCode');
  }

}
