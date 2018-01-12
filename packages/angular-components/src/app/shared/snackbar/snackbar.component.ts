import {Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import {SnackbarService} from "./snackbar.service";

@Component({
  selector: 'ht-snackbar',
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
  constructor(public snackbarService: SnackbarService) { }

  ngOnInit() {

  }

}
