import {Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import {SnackbarService} from "./snackbar.service";
import {config} from "../../config";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.less'],
  animations: [
    trigger('toast', [
      state('on', style({
        opacity: 1, bottom: '10%'
      })),
      state('off', style({
        opacity: 0, display: 'none'
      })),
      transition('on => off', [
        animate('100ms ease-out', style({bottom: '-3%'}))
      ]),
      transition('off => on', [
        style({bottom: '-3%'}),
        animate('100ms ease-out')
      ])
    ])
  ]
})
export class SnackbarComponent implements OnInit {
  isMobile: boolean;
  constructor(public snackbarService: SnackbarService) { }

  ngOnInit() {
    this.isMobile = config.isMobile;
  }

}
